import { createBrowserRouter, RouterProvider, Outlet, useRouteError, Link } from "react-router-dom";
import { ErrorBoundary } from "@/components/common";
import Button from "@/components/ui/Button";
import { Home, AlertTriangle } from "lucide-react";

function RootLayout() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card p-4">
        <div className="container mx-auto flex gap-4">
          <Link to="/" className="text-primary hover:underline">
            Home
          </Link>
          <Link to="/about" className="text-primary hover:underline">
            About
          </Link>
          <Link to="/buggy" className="text-primary hover:underline">
            Buggy Page (will error)
          </Link>
        </div>
      </nav>
      <main className="container mx-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}

function HomePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Home Page</h1>
      <p>This page works fine. Navigate to the buggy page to see error handling.</p>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">About Page</h1>
      <p>Another working page. All good here!</p>
    </div>
  );
}

function BuggyPage(): never {
  throw new Error("This page intentionally crashes!");
}

function RouteErrorFallback() {
  const error = useRouteError() as Error;
  
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-red-100 dark:bg-red-950 p-4">
            <AlertTriangle className="h-12 w-12 text-red-600 dark:text-red-400" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            Route Error
          </h1>
          <p className="text-muted-foreground">
            This error was caught by React Router's errorElement
          </p>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/50 p-4">
            <p className="text-left text-sm font-mono text-red-900 dark:text-red-100 break-all">
              {error?.message || "Unknown error"}
            </p>
          </div>
        )}

        <Button onClick={() => window.location.href = "/"} color="primary">
          <Home className="mr-2 h-4 w-4" />
          Go Home
        </Button>
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RouteErrorFallback />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "buggy",
        element: <BuggyPage />,
        errorElement: <RouteErrorFallback />,
      },
    ],
  },
]);

export const RouterWithErrorBoundaryDemo = () => {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};
