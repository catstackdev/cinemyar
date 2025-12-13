import { type ReactNode, useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeContextProvider } from "./ThemeContext";
import { NotificationProvider } from "./NotificationContext";
import { AppWrapper } from "@/components/common/AppWrapper";
import { store } from "@/store";
import { setupAxiosInterceptors } from "@/lib/axios";
import { useNotification } from "./NotificationContext";
import { NotificationCenter } from "@/components/common";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuth, setInitialized } from "@/state/auth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

interface AppProvidersProps {
  children: ReactNode;
}

function AxiosInterceptorSetup() {
  const { addNotification } = useNotification();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setupAxiosInterceptors(
      (message, type) => {
        addNotification({
          type: type === "error" ? "error" : "success",
          message,
        });
      },
      dispatch,
    );
  }, [addNotification, dispatch]);

  return null;
}

function AuthInitializer() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading, hasInitialized } = useAppSelector(
    (state) => state.auth,
  );
  const initAttempted = useRef(false);

  useEffect(() => {
    // Prevent double execution (React StrictMode + effect re-runs)
    if (initAttempted.current) {
      console.log("🔐 AuthInitializer: Already attempted initialization, skipping");
      return;
    }

    console.log("🔄 AuthInitializer: Checking auth state (cookie-based)", {
      isAuthenticated,
      isLoading,
      hasInitialized,
    });

    // Check if Redux state already initialized
    if (hasInitialized) {
      console.log("🔐 AuthInitializer: Auth already initialized in Redux");
      initAttempted.current = true;
      return;
    }

    // Mark as attempted to prevent double calls
    initAttempted.current = true;

    const localStorageAccessTokenExpiresAt = localStorage.getItem(
      "accessTokenExpiresAt",
    );
    if (!localStorageAccessTokenExpiresAt) {
      console.log("🔐 AuthInitializer: Cookie-based session not exists");
      dispatch(setInitialized());
      return;
    }
    // Cookie-based auth: check on mount if cookies might exist
    if (!isAuthenticated) {
      console.log("🔐 AuthInitializer: Checking for cookie-based session");
      dispatch(checkAuth());
    } else {
      console.log("🔐 AuthInitializer: User already authenticated");
    }
  }, [dispatch, hasInitialized, isAuthenticated]); // Include deps for correctness

  return null;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeContextProvider>
          <NotificationProvider>
            <AxiosInterceptorSetup />
            <AuthInitializer />
            <AppWrapper>
              {children}
              <NotificationCenter position="top-right" maxNotifications={5} />
            </AppWrapper>
          </NotificationProvider>
        </ThemeContextProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export { queryClient };
