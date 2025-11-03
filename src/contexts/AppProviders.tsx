import { type ReactNode, useEffect } from "react";
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

  useEffect(() => {
    setupAxiosInterceptors((message, type) => {
      addNotification({
        type: type === "error" ? "error" : "success",
        message,
      });
    });
  }, [addNotification]);

  return null;
}

function AuthInitializer() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading, accessToken, hasInitialized } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Only validate on initial app load if we have a token but haven't initialized
    const storedToken = localStorage.getItem("accessToken");
    
    console.log("🔄 AuthInitializer: Checking auth state", {
      hasStoredToken: !!storedToken,
      storedTokenValue: storedToken ? `${storedToken.substring(0, 20)}...` : null,
      hasReduxToken: !!accessToken,
      isAuthenticated,
      isLoading,
      hasInitialized
    });

    // Only call checkAuth if we have a token and haven't initialized yet
    if (storedToken && !hasInitialized && !isAuthenticated) {
      console.log("🔐 AuthInitializer: Starting token validation (initial load)");
      dispatch(checkAuth());
    } else if (!storedToken && !hasInitialized) {
      console.log("🔐 AuthInitializer: No token found, marking as initialized");
      // If no token, mark as initialized to stop loading state
      dispatch(setInitialized());
    } else if (isAuthenticated) {
      console.log("🔐 AuthInitializer: User already authenticated");
    } else if (hasInitialized) {
      console.log("🔐 AuthInitializer: Auth already initialized");
    }
  }, [dispatch]); // Only run once on mount

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
