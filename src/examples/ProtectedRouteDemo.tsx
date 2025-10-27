import { useState } from "react";
import { createBrowserRouter, RouterProvider, Link, Outlet } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ConfirmDialog } from "@/components/common";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui";
import { LogIn, LogOut, Home, Lock, User } from "lucide-react";

function Navigation() {
  const { isAuthenticated, user, logout } = useAuth();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    logout();
    setShowLogoutDialog(false);
  };

  return (
    <>
      <nav className="border-b border-border bg-card p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex gap-4">
            <Link to="/" className="flex items-center gap-2 text-primary hover:underline">
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link to="/dashboard" className="flex items-center gap-2 text-primary hover:underline">
              <Lock className="h-4 w-4" />
              Dashboard (Protected)
            </Link>
            <Link to="/profile" className="flex items-center gap-2 text-primary hover:underline">
              <User className="h-4 w-4" />
              Profile (Protected)
            </Link>
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground">
                  Welcome, {user?.name}!
                </span>
                <Button
                  onClick={() => setShowLogoutDialog(true)}
                  size="sm"
                  variant="outline"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button size="sm">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      <ConfirmDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={handleLogout}
        title="Logout Confirmation"
        description="Are you sure you want to logout?"
        confirmText="Yes, Logout"
        variant="warning"
      />
    </>
  );
}

function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}

function HomePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Home Page (Public)</h1>
      <p className="text-muted-foreground">
        This page is accessible to everyone. Try navigating to Dashboard or Profile
        without logging in - you'll be redirected to the login page.
      </p>
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-xl font-semibold mb-2">Demo Instructions:</h2>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li>Try clicking "Dashboard" or "Profile" - you'll be redirected to login</li>
          <li>Login with any email/password (it's a mock auth system)</li>
          <li>After login, you can access protected routes</li>
          <li>Click logout to see the ConfirmDialog in action</li>
        </ol>
      </div>
    </div>
  );
}

function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await login(email, password);
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="rounded-lg border border-border bg-card p-8">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input.Field
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <Input.Field
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" fullWidth isLoading={isLoading}>
            Login
          </Button>
        </form>
        <p className="mt-4 text-sm text-muted-foreground text-center">
          Hint: Use any email/password (mock auth)
        </p>
      </div>
    </div>
  );
}

function DashboardPage() {
  const { user } = useAuth();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Item deleted!");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard (Protected)</h1>
      <p className="text-muted-foreground">
        Welcome, {user?.name}! This page is protected by ProtectedRoute.
      </p>

      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">ConfirmDialog Demo</h2>
        <p className="text-muted-foreground mb-4">
          Click the button below to test the ConfirmDialog component with danger variant:
        </p>
        <Button onClick={() => setShowDeleteDialog(true)} color="danger">
          Delete Item
        </Button>
      </div>

      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        title="Delete Confirmation"
        description="This action cannot be undone. Are you sure you want to delete this item?"
        confirmText="Yes, Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
}

function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Profile (Protected)</h1>
      <div className="rounded-lg border border-border bg-card p-6 space-y-4">
        <div className="flex items-center gap-4">
          {user?.avatar && (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-16 w-16 rounded-full"
            />
          )}
          <div>
            <h2 className="text-xl font-semibold">{user?.name}</h2>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            User ID: {user?.id}
          </p>
        </div>
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

export const ProtectedRouteDemo = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};
