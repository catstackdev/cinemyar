import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Checkbox,
  Container,
  FormField,
  JumpingDots,
  Stack,
} from "@/components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginFormData, loginSchema } from "./schemas/auth.schema";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login as loginAction } from "@/state/auth";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);
  const [rememberMe, setRememberMe] = useState(() => {
    return localStorage.getItem("rememberMe") === "true";
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (rememberMe) {
      const savedEmail = localStorage.getItem("email");
      if (savedEmail) {
        setValue("email", savedEmail);
      }
    }
  }, [rememberMe, setValue]);

  useEffect(() => {
    console.log("isAuthenticated", isAuthenticated);
    if (isAuthenticated) {
      navigate("/authenticated");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: LoginFormData) => {
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
    <Container className="min-h-screen flex items-center justify-center ">
      <Card className="w-full max-w-md p-8 shadow-lg bg-gradient-to-br from-primary/10 via-transparent to-info/10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="lg">
            <FormField.Root
              name="email"
              layout="floating"
              error={errors.email?.message}
            >
              <FormField.Input type="email" {...register("email")} />
              <FormField.Label>Email Address</FormField.Label>
              {errors.email && (
                <FormField.Error icon>{errors.email.message}</FormField.Error>
              )}
            </FormField.Root>

            <FormField.Root
              name="password"
              layout="floating"
              error={errors.password?.message}
            >
              <FormField.Input type="password" {...register("password")} />
              <FormField.Label>Password</FormField.Label>
              {errors.password && (
                <FormField.Error icon>
                  {errors.password.message}
                </FormField.Error>
              )}
            </FormField.Root>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="text-sm text-foreground">Remember me</span>
              </label>
              <Button
                variant="link"
                color="primary"
                size="sm"
                as={Link}
                to="/forgot-password"
              >
                Forgot password?
              </Button>
            </div>

            {!!isValid}
            <Button
              withPulse={isValid}
              variant="glass"
              type="submit"
              className="w-full"
              size="md"
              disabled={isLoading}
              rightIcon={isLoading ? <JumpingDots /> : null}
            >
              {/* leftIcon={ */}
              {/*   isLoading ? ( */}
              {/*     <Loading type="spinner" size="sm" inline inheritColor /> */}
              {/*   ) : null */}
              {/* } */}
              {isLoading ? "Signing in" : "Sign in"}
            </Button>
          </Stack>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Button
            color="primary"
            variant="link"
            size="sm"
            className="mt-2 ml-2"
            as={Link}
            to="/register"
          >
            Sign up
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default Login;
