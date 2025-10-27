import { type ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { ThemeContextProvider } from "./ThemeContext";
import { NotificationProvider } from "./NotificationContext";
import { AppWrapper } from "@/components/common/AppWrapper";
import { store } from "@/store";
import { setupAxiosInterceptors } from "@/lib/axios";
import { useNotification } from "./NotificationContext";

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
      <ThemeContextProvider>
        <NotificationProvider>
          <AxiosInterceptorSetup />
          <AppWrapper>{children}</AppWrapper>
        </NotificationProvider>
      </ThemeContextProvider>
    </Provider>
  );
}
