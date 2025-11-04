import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/state/auth";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    logout: handleLogout,
    // Keep compatibility with existing code
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
  };
};
