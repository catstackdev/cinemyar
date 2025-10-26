import { useState, useCallback } from "react";

export const useButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAsyncClick = useCallback(async (callback: () => Promise<void>) => {
    setIsLoading(true);
    try {
      await callback();
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
    setIsLoading(false);
  }, []);

  return { isLoading, handleAsyncClick };
};
