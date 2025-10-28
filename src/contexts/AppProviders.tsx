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

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeContextProvider>
          <NotificationProvider>
            <AxiosInterceptorSetup />
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
