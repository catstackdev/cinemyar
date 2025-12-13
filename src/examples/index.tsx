import { NotificationProvider } from "@/contexts/NotificationContext";
import { NotificationCenter } from "@/components/common";
import { FeedbackComponentsDemo } from "./FeedbackComponentsDemo";

export const FeedbackExamplesPage = () => {
  return (
    <NotificationProvider>
      <FeedbackComponentsDemo />
      <NotificationCenter position="top-right" maxNotifications={5} />
    </NotificationProvider>
  );
};

// export { ProtectedRouteDemo } from "./ProtectedRouteDemo"; // Disabled - requires AuthContext
export { VideoPlayerDemo } from "./VideoPlayerDemo";
