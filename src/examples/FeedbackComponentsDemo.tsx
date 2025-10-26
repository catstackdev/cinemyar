import { useState } from "react";
import { useNotification } from "@/contexts/NotificationContext";
import {
  ErrorBoundary,
  LoadingScreen,
  ThemeToggle,
} from "@/components/common";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Stack from "@/components/ui/Stack";

function BuggyComponent({ shouldError }: { shouldError: boolean }) {
  if (shouldError) {
    throw new Error("This is a test error from BuggyComponent!");
  }
  return <p className="text-green-600">Component is working fine! ✓</p>;
}

export const FeedbackComponentsDemo = () => {
  const { addNotification, clearAll } = useNotification();
  const [showLoading, setShowLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [shouldError, setShouldError] = useState(false);
  const [errorKey, setErrorKey] = useState(0);

  const showSuccessNotification = () => {
    addNotification({
      type: "success",
      title: "Success!",
      message: "Your operation completed successfully.",
      duration: 3000,
    });
  };

  const showErrorNotification = () => {
    addNotification({
      type: "error",
      title: "Error Occurred",
      message: "Failed to complete the operation.",
      duration: 5000,
      action: {
        label: "Retry",
        onClick: () => console.log("Retry clicked"),
      },
    });
  };

  const showWarningNotification = () => {
    addNotification({
      type: "warning",
      title: "Warning",
      message: "You have unsaved changes. Please save before leaving.",
      duration: 4000,
    });
  };

  const showInfoNotification = () => {
    addNotification({
      type: "info",
      message: "New features are available. Check them out!",
      duration: 3000,
    });
  };

  const showPersistentNotification = () => {
    addNotification({
      type: "info",
      title: "Persistent Toast",
      message: "This notification won't auto-dismiss (duration: 0)",
      duration: 0,
    });
  };

  const simulateLoading = () => {
    setShowLoading(true);
    setTimeout(() => setShowLoading(false), 3000);
  };

  const simulateOverlay = () => {
    setShowOverlay(true);
    setTimeout(() => setShowOverlay(false), 2000);
  };

  const triggerError = () => {
    setShouldError(true);
  };

  const resetError = () => {
    setShouldError(false);
    setErrorKey((prev) => prev + 1);
  };

  return (
    <Container className="py-8">
      <Stack spacing="lg">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Feedback Components Demo
          </h1>
          <p className="text-muted-foreground">
            Interactive examples of NotificationCenter, ErrorBoundary,
            LoadingScreen, and ThemeToggle
          </p>
        </div>

        <div className="space-y-6">
          {/* Theme Toggle Section */}
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">Theme Toggle</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 flex-wrap">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Default (md)
                  </p>
                  <ThemeToggle />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Small (sm)
                  </p>
                  <ThemeToggle size="sm" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Large (lg)
                  </p>
                  <ThemeToggle size="lg" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    With Labels
                  </p>
                  <ThemeToggle showLabels />
                </div>
              </div>
            </div>
          </section>

          {/* Notification Center Section */}
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">
              Notification Center (Toasts)
            </h2>
            <div className="flex flex-wrap gap-3">
              <Button onClick={showSuccessNotification} color="success">
                Show Success
              </Button>
              <Button onClick={showErrorNotification} color="danger">
                Show Error
              </Button>
              <Button onClick={showWarningNotification} color="warning">
                Show Warning
              </Button>
              <Button onClick={showInfoNotification} color="info">
                Show Info
              </Button>
              <Button onClick={showPersistentNotification} variant="outline">
                Persistent Toast
              </Button>
              <Button onClick={clearAll} variant="outline" color="danger">
                Clear All
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Notifications appear in the top-right corner with auto-dismiss
              (except persistent). Try clicking multiple buttons!
            </p>
          </section>

          {/* Loading Screen Section */}
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">Loading Screen</h2>
            <div className="flex flex-wrap gap-3 mb-4">
              <Button onClick={simulateLoading}>
                Show Full-Screen Loading (3s)
              </Button>
              <Button onClick={simulateOverlay} variant="outline">
                Show Overlay Loading (2s)
              </Button>
            </div>

            <div className="rounded-lg border border-border bg-background p-4 h-40 relative">
              <p className="text-sm text-muted-foreground mb-2">
                Inline Loading Example:
              </p>
              <LoadingScreen
                fullScreen={false}
                message="Loading data..."
                size="sm"
              />
            </div>

            {showLoading && <LoadingScreen message="Loading your content..." />}
            {showOverlay && (
              <LoadingScreen overlay message="Saving changes..." size="md" />
            )}
          </section>

          {/* Error Boundary Section */}
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">Error Boundary</h2>

            <div className="space-y-4">
              <div className="flex gap-3">
                <Button onClick={triggerError} color="danger">
                  Trigger Error
                </Button>
                <Button onClick={resetError} variant="outline">
                  Reset Component
                </Button>
              </div>

              <div className="rounded-lg border border-border bg-background p-4">
                <ErrorBoundary
                  key={errorKey}
                  resetKeys={[errorKey]}
                  onError={(error, errorInfo) => {
                    console.error("Error caught by boundary:", error);
                    console.error("Error info:", errorInfo);
                  }}
                >
                  <BuggyComponent shouldError={shouldError} />
                </ErrorBoundary>
              </div>

              <p className="text-sm text-muted-foreground">
                Click "Trigger Error" to throw an error. The ErrorBoundary will
                catch it and display a fallback UI with retry functionality.
              </p>
            </div>
          </section>

          {/* Code Examples */}
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Usage</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-2">
                  Show Notification:
                </h3>
                <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
                  <code>{`const { addNotification } = useNotification();

addNotification({
  type: "success",
  title: "Success!",
  message: "Operation completed",
  duration: 3000,
});`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Wrap with ErrorBoundary:</h3>
                <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
                  <code>{`<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Show Loading:</h3>
                <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
                  <code>{`{isLoading && (
  <LoadingScreen message="Loading..." />
)}`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Theme Toggle:</h3>
                <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
                  <code>{`<ThemeToggle size="md" showLabels />`}</code>
                </pre>
              </div>
            </div>
          </section>
        </div>
      </Stack>
    </Container>
  );
};
