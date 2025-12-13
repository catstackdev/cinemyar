import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Checkbox,
  FormField,
  JumpingDots,
  Stack,
  PortalBackground,
} from "@/components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login as loginAction } from "@/state/auth";
import { cn } from "@/utils/helpers/classNames";
import { loginSchema, type LoginDto } from "@/shared/types/validation";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);
  const [rememberMe, setRememberMe] = useState(() => {
    return localStorage.getItem("rememberMe") === "true";
  });
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  useEffect(() => {
    if (rememberMe) {
      const savedEmail = localStorage.getItem("identifier");
      if (savedEmail) {
        setValue("identifier", savedEmail);
      }
    }
  }, [rememberMe, setValue]);

  useEffect(() => {
    console.log("isAuthenticated", isAuthenticated);
    if (isAuthenticated) {
      navigate("/authenticated");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: LoginDto) => {
    dispatch(loginAction({ ...data, rememberMe }));
  };

  // const onSubmit = async (data: LoginFormData) => {
  //   const resultAction = await dispatch(loginAction({ ...data, rememberMe }));
  //
  //   if (loginAction.fulfilled.match(resultAction)) {
  //     reset({
  //       email: rememberMe ? data.email : "",
  //       password: "",
  //     });
  //   }
  // };

  return (
    <PortalBackground
      variant={isLoading ? "mystic" : "mystic"}
      intensity={isLoading ? "high" : "medium"}
      animated
      portalPosition="left"
      portalSize="md"
    >
      <div className="min-h-screen w-full grid lg:grid-cols-2 gap-8 items-center px-4 py-8 lg:px-8">
        {/* Left side - Portal text positioned at portal center */}
        <div className="hidden lg:block relative">
          {/* Text positioned at 30% from left (matching portal position) */}
          <div className="absolute w-full top-1/2 left-[27vw] -translate-x-1/2 -translate-y-1/2 text-center text-white/80 z-10 pointer-events-none">
            {isLoading ? (
              <>
                <div className="mb-4 flex justify-center">
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                  </div>
                </div>
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-info to-primary bg-clip-text text-transparent animate-pulse">
                  🌀 Traversing Dimensions
                </h2>
                <p className="text-lg text-muted-foreground animate-pulse">
                  Portal stabilizing... Please wait
                </p>
                <div className="mt-6 flex justify-center gap-2">
                  <div
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "0s" }}
                  />
                  <div
                    className="w-2 h-2 bg-info rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <div
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              </>
            ) : (
              <>
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-warning via-warning-foreground to-danger bg-clip-text text-transparent">
                  Step Through The Portal
                </h2>
                <p className="text-lg text-muted-foreground">
                  Enter the mystical realm and access your dashboard
                </p>
              </>
            )}
          </div>
        </div>

        {/* Right side - Login Card */}
        <div className="flex items-center justify-center">
          <Card
            className={cn(
              "w-full max-w-md p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden transition-all duration-500",
              isLoading
                ? "bg-card/85 border-2 border-primary/40 shadow-primary/20"
                : "bg-card/85 border-2 border-warning/40",
            )}
          >
            {/* Mystical glow effect on card */}
            <div
              className={cn(
                "absolute inset-0 pointer-events-none transition-all duration-500",
                isLoading
                  ? "bg-gradient-to-br from-primary/10 via-info/5 to-primary/10"
                  : "bg-gradient-to-br from-warning/5 via-transparent to-danger/5",
              )}
            />

            {/* Loading overlay - shimmer effect */}
            {isLoading && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.15), transparent)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                }}
              />
            )}

            <div className="mb-6 sm:mb-8 text-center relative z-10">
              <div className="mb-3 sm:mb-4 flex justify-center">
                <div className="relative">
                  {isLoading ? (
                    <>
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-primary/20 to-info/20 flex items-center justify-center backdrop-blur-sm border border-primary/30">
                        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                      </div>
                      <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping" />
                    </>
                  ) : (
                    <>
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-warning/20 to-danger/20 flex items-center justify-center backdrop-blur-sm border border-warning/30">
                        <span className="text-2xl sm:text-3xl">✦</span>
                      </div>
                      <div className="absolute inset-0 rounded-full bg-warning/10 animate-ping" />
                    </>
                  )}
                </div>
              </div>
              {isLoading ? (
                <>
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary via-info to-primary bg-clip-text text-transparent mb-2 animate-pulse">
                    Stepping Through...
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground animate-pulse">
                    Traversing dimensions
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-warning via-warning-foreground to-danger bg-clip-text text-transparent mb-2">
                    Welcome Back
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Step through the portal to continue
                  </p>
                </>
              )}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="relative z-10">
              <Stack spacing="md" className="sm:space-y-5">
                <FormField.Root
                  name="email"
                  layout="floating"
                  error={errors.identifier?.message}
                >
                  <div className="relative">
                    <FormField.Input
                      type="text"
                      {...register("identifier")}
                      disabled={isLoading}
                      className={cn(
                        "h-12 bg-card/80 backdrop-blur-md border-2 rounded-lg text-sm sm:text-base transition-all duration-200",
                        "focus:ring-2 focus:ring-offset-0",
                        isLoading
                          ? "border-primary/30 focus:border-primary/50 focus:ring-primary/20 opacity-60 cursor-not-allowed"
                          : "border-border hover:border-warning/40 focus:border-warning focus:ring-warning/20 focus:shadow-lg focus:shadow-warning/10",
                      )}
                    />
                    <FormField.Label
                      className={cn(isLoading && "peer-focus:text-primary/70")}
                    >
                      Email Address
                    </FormField.Label>
                  </div>
                  {errors.identifier && (
                    <FormField.Error icon>
                      {errors.identifier.message}
                    </FormField.Error>
                  )}
                </FormField.Root>

                <FormField.Root
                  name="password"
                  layout="floating"
                  error={errors.password?.message}
                >
                  <div className="relative">
                    <FormField.Input
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      disabled={isLoading}
                      className={cn(
                        "h-12 bg-card/80 backdrop-blur-md border-2 rounded-lg text-sm sm:text-base transition-all duration-200 pr-12",
                        "focus:ring-2 focus:ring-offset-0",
                        isLoading
                          ? "border-primary/30 focus:border-primary/50 focus:ring-primary/20 opacity-60 cursor-not-allowed"
                          : "border-border hover:border-warning/40 focus:border-warning focus:ring-warning/20 focus:shadow-lg focus:shadow-warning/10",
                      )}
                    />
                    <FormField.Label
                      className={cn(isLoading && "peer-focus:text-primary/70")}
                    >
                      Password
                    </FormField.Label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                      tabIndex={0}
                      className={cn(
                        "absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md transition-all duration-200 z-10",
                        "focus:outline-none focus:ring-2 focus:ring-offset-1",
                        isLoading
                          ? "text-muted-foreground/50 cursor-not-allowed focus:ring-primary/30"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/30 focus:ring-warning/40 active:scale-95",
                        "group",
                      )}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      <div className="relative w-5 h-5">
                        {/* Eye Icon - Show Password */}
                        <svg
                          className={cn(
                            "absolute inset-0 w-5 h-5 transition-all duration-300 ease-out",
                            showPassword
                              ? "opacity-0 scale-50 rotate-90"
                              : "opacity-100 scale-100 rotate-0",
                          )}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>

                        {/* Eye Slash Icon - Hide Password */}
                        <svg
                          className={cn(
                            "absolute inset-0 w-5 h-5 transition-all duration-300 ease-out",
                            !showPassword
                              ? "opacity-0 scale-50 -rotate-90"
                              : "opacity-100 scale-100 rotate-0",
                          )}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      </div>

                      {/* Tooltip */}
                      <span
                        className={cn(
                          "absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap",
                          "bg-popover text-popover-foreground border shadow-md",
                          "opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus:opacity-100 group-focus:visible",
                          "transition-all duration-200 pointer-events-none z-50",
                        )}
                      >
                        {showPassword ? "Hide" : "Show"}
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-popover border-r border-b rotate-45 -z-10" />
                      </span>
                    </button>
                  </div>
                  {errors.password && (
                    <FormField.Error icon>
                      {errors.password.message}
                    </FormField.Error>
                  )}
                </FormField.Root>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                  <label
                    className={cn(
                      "flex items-center gap-2 group",
                      isLoading
                        ? "cursor-not-allowed opacity-60"
                        : "cursor-pointer",
                    )}
                  >
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      disabled={isLoading}
                    />
                    <span
                      className={cn(
                        "text-xs sm:text-sm text-foreground transition-colors",
                        !isLoading && "group-hover:text-warning",
                      )}
                    >
                      Remember me
                    </span>
                  </label>
                  <Button
                    variant="link"
                    color={isLoading ? "primary" : "warning"}
                    size="sm"
                    as={Link}
                    to="/forgot-password"
                    className={cn(
                      "text-xs sm:text-sm self-start sm:self-auto transition-colors",
                      isLoading
                        ? "pointer-events-none opacity-60"
                        : "hover:text-warning-foreground",
                    )}
                    disabled={isLoading}
                  >
                    Forgot password?
                  </Button>
                </div>

                {!!isValid}
                <Button
                  withPulse={isValid && !isLoading}
                  variant="gradient"
                  type="submit"
                  className={cn(
                    "w-full shadow-lg text-sm sm:text-base transition-all duration-300",
                    isLoading
                      ? "bg-gradient-to-r from-primary to-info hover:from-primary-600 hover:to-info-600 shadow-primary/20"
                      : "bg-gradient-to-r from-warning to-danger hover:from-warning-600 hover:to-danger-600 shadow-warning/20",
                  )}
                  size="md"
                  disabled={isLoading}
                  rightIcon={isLoading ? <JumpingDots /> : null}
                >
                  {isLoading ? "🌀 Stepping Through" : "Enter Portal ✦"}
                </Button>
              </Stack>
            </form>

            <div className="mt-5 sm:mt-6 text-center text-xs sm:text-sm text-muted-foreground relative z-10">
              <span className="block sm:inline">Don't have an account?</span>{" "}
              <Button
                color="warning"
                variant="link"
                size="sm"
                className="mt-1 sm:mt-2 sm:ml-2 hover:text-warning-foreground text-xs sm:text-sm"
                as={Link}
                to="/register"
              >
                Begin Your Journey
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </PortalBackground>
  );
};

export default Login;
