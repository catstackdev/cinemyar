import { useEffect, useState } from "react";
import { AppProviders } from "./contexts/AppProviders";
import SplashScreen from "./components/ui/SplashScreen";
import { AppRoute } from "./routes/appRoute";
// import { NotificationCenter } from "./components/common";

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem("cinemyarSplashShown");
  });
  const [isAppReady, setIsAppReady] = useState(false);

  // Simulate app loading - replace with real loading logic
  useEffect(() => {
    const loadApp = async () => {
      // Simulate loading resources, API calls, etc.
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsAppReady(true);
    };

    loadApp();
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem("cinemyarSplashShown", "true");
    setShowSplash(false);
  };

  if (showSplash) {
    return (
      <SplashScreen onComplete={handleSplashComplete} isAppReady={isAppReady} />
    );
  }

  return (
    <AppProviders>
      <AppRoute />
    </AppProviders>
  );
}

export default App;
