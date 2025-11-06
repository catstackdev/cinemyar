import React, { useState } from "react";
import {
  Button,
  Card,
  FormField,
  JumpingDots,
  Stack,
  PortalBackground,
} from "@/components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type RegisterFormData,
  registerSchema,
} from "./schemas/auth.schema";
import { Link } from "react-router-dom";
import { cn } from "@/utils/helpers/classNames";

const Register: React.FC = () => {
  const isLoading = false;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    console.log("Register data:", data);
  };

  return (
    <PortalBackground
      variant={isLoading ? "cosmic" : "fire"}
      intensity={isLoading ? "high" : "medium"}
      animated
      portalPosition="left"
      portalSize="md"
    >
      <div className="min-h-screen w-full grid lg:grid-cols-2 gap-8 items-center px-4 py-8 lg:px-8">
        {/* Left side - Portal text positioned at portal center */}
        <div className="hidden lg:block relative">
          <div className="absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 text-center text-white/80 max-w-md z-10 pointer-events-none">
            {isLoading ? (
              <>
                <div className="mb-4 flex justify-center">
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                  </div>
                </div>
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-info to-primary bg-clip-text text-transparent animate-pulse">
                  🌀 Creating Your Portal
                </h2>
                <p className="text-lg text-muted-foreground animate-pulse">
                  Establishing mystical connection...
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
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-danger via-warning to-danger bg-clip-text text-transparent">
                  Begin Your Journey
                </h2>
                <p className="text-lg text-muted-foreground">
                  Create your account and unlock the mystical realm
                </p>
              </>
            )}
          </div>
        </div>

        {/* Right side - Registration Card */}
        <div className="flex items-center justify-center">
          <Card
            className={cn(
              "w-full max-w-md p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden transition-all duration-500",
              isLoading
                ? "bg-card/85 border-2 border-primary/40 shadow-primary/20"
                : "bg-card/85 border-2 border-danger/40",
            )}
          >
            {/* Mystical glow effect on card */}
            <div
              className={cn(
                "absolute inset-0 pointer-events-none transition-all duration-500",
                isLoading
                  ? "bg-gradient-to-br from-primary/10 via-info/5 to-primary/10"
                  : "bg-gradient-to-br from-danger/5 via-warning/5 to-danger/5",
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
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-danger/20 to-warning/20 flex items-center justify-center backdrop-blur-sm border border-danger/30">
                        <span className="text-2xl sm:text-3xl">✨</span>
                      </div>
                      <div className="absolute inset-0 rounded-full bg-danger/10 animate-ping" />
                    </>
                  )}
                </div>
              </div>
              {isLoading ? (
                <>
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary via-info to-primary bg-clip-text text-transparent mb-2 animate-pulse">
                    Forging Connection...
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground animate-pulse">
                    Opening dimensional gateway
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-danger via-warning to-danger bg-clip-text text-transparent mb-2">
                    Create Account
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Join the mystical realm today
                  </p>
                </>
              )}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="relative z-10">
              <Stack spacing="md" className="sm:space-y-5">
                {/* Username Field */}
                <FormField.Root
                  name="username"
                  layout="floating"
                  error={errors.username?.message}
                >
                  <div className="relative">
                    <FormField.Input
                      type="text"
                      {...register("username")}
                      disabled={isLoading}
                      className={cn(
                        "h-12 bg-card/80 backdrop-blur-md border-2 rounded-lg text-sm sm:text-base transition-all duration-200",
                        "focus:ring-2 focus:ring-offset-0",
                        isLoading
                          ? "border-primary/30 focus:border-primary/50 focus:ring-primary/20 opacity-60 cursor-not-allowed"
                          : "border-border hover:border-danger/40 focus:border-danger focus:ring-danger/20 focus:shadow-lg focus:shadow-danger/10",
                      )}
                    />
                    <FormField.Label
                      className={cn(isLoading && "peer-focus:text-primary/70")}
                    >
                      Username
                    </FormField.Label>
                  </div>
                  {errors.username && (
                    <FormField.Error icon>
                      {errors.username.message}
                    </FormField.Error>
                  )}
                </FormField.Root>

                {/* Email Field */}
                <FormField.Root
                  name="email"
                  layout="floating"
                  error={errors.email?.message}
                >
                  <div className="relative">
                    <FormField.Input
                      type="email"
                      {...register("email")}
                      disabled={isLoading}
                      className={cn(
                        "h-12 bg-card/80 backdrop-blur-md border-2 rounded-lg text-sm sm:text-base transition-all duration-200",
                        "focus:ring-2 focus:ring-offset-0",
                        isLoading
                          ? "border-primary/30 focus:border-primary/50 focus:ring-primary/20 opacity-60 cursor-not-allowed"
                          : "border-border hover:border-danger/40 focus:border-danger focus:ring-danger/20 focus:shadow-lg focus:shadow-danger/10",
                      )}
                    />
                    <FormField.Label
                      className={cn(isLoading && "peer-focus:text-primary/70")}
                    >
                      Email Address
                    </FormField.Label>
                  </div>
                  {errors.email && (
                    <FormField.Error icon>
                      {errors.email.message}
                    </FormField.Error>
                  )}
                </FormField.Root>

                {/* Password Field */}
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
                          : "border-border hover:border-danger/40 focus:border-danger focus:ring-danger/20 focus:shadow-lg focus:shadow-danger/10",
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
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/30 focus:ring-danger/40 active:scale-95",
                        "group",
                      )}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      <div className="relative w-5 h-5">
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

                {/* Confirm Password Field */}
                <FormField.Root
                  name="confirmPassword"
                  layout="floating"
                  error={errors.confirmPassword?.message}
                >
                  <div className="relative">
                    <FormField.Input
                      type={showConfirmPassword ? "text" : "password"}
                      {...register("confirmPassword")}
                      disabled={isLoading}
                      className={cn(
                        "h-12 bg-card/80 backdrop-blur-md border-2 rounded-lg text-sm sm:text-base transition-all duration-200 pr-12",
                        "focus:ring-2 focus:ring-offset-0",
                        isLoading
                          ? "border-primary/30 focus:border-primary/50 focus:ring-primary/20 opacity-60 cursor-not-allowed"
                          : "border-border hover:border-danger/40 focus:border-danger focus:ring-danger/20 focus:shadow-lg focus:shadow-danger/10",
                      )}
                    />
                    <FormField.Label
                      className={cn(isLoading && "peer-focus:text-primary/70")}
                    >
                      Confirm Password
                    </FormField.Label>
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      disabled={isLoading}
                      tabIndex={0}
                      className={cn(
                        "absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md transition-all duration-200 z-10",
                        "focus:outline-none focus:ring-2 focus:ring-offset-1",
                        isLoading
                          ? "text-muted-foreground/50 cursor-not-allowed focus:ring-primary/30"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/30 focus:ring-danger/40 active:scale-95",
                        "group",
                      )}
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                    >
                      <div className="relative w-5 h-5">
                        <svg
                          className={cn(
                            "absolute inset-0 w-5 h-5 transition-all duration-300 ease-out",
                            showConfirmPassword
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
                        <svg
                          className={cn(
                            "absolute inset-0 w-5 h-5 transition-all duration-300 ease-out",
                            !showConfirmPassword
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
                      <span
                        className={cn(
                          "absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap",
                          "bg-popover text-popover-foreground border shadow-md",
                          "opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus:opacity-100 group-focus:visible",
                          "transition-all duration-200 pointer-events-none z-50",
                        )}
                      >
                        {showConfirmPassword ? "Hide" : "Show"}
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-popover border-r border-b rotate-45 -z-10" />
                      </span>
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <FormField.Error icon>
                      {errors.confirmPassword.message}
                    </FormField.Error>
                  )}
                </FormField.Root>

                {!!isValid}
                <Button
                  withPulse={isValid && !isLoading}
                  variant="gradient"
                  type="submit"
                  className={cn(
                    "w-full shadow-lg text-sm sm:text-base transition-all duration-300",
                    isLoading
                      ? "bg-gradient-to-r from-primary to-info hover:from-primary-600 hover:to-info-600 shadow-primary/20"
                      : "bg-gradient-to-r from-danger to-warning hover:from-danger-600 hover:to-warning-600 shadow-danger/20",
                  )}
                  size="md"
                  disabled={isLoading}
                  rightIcon={isLoading ? <JumpingDots /> : null}
                >
                  {isLoading ? "🌀 Creating Portal" : "Create Account ✨"}
                </Button>
              </Stack>
            </form>

            <div className="mt-5 sm:mt-6 text-center text-xs sm:text-sm text-muted-foreground relative z-10">
              <span className="block sm:inline">Already have an account?</span>{" "}
              <Button
                color="danger"
                variant="link"
                size="sm"
                className="mt-1 sm:mt-2 sm:ml-2 hover:text-danger-foreground text-xs sm:text-sm"
                as={Link}
                to="/login"
              >
                Sign In
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </PortalBackground>
  );
};

export default Register;
