import PageNotFound from "@/components/common/PageNotFound";
import { createElement, lazy } from "react";
import { type RouteObject, Navigate } from "react-router-dom";

const LoginPage = lazy(() => import("@/modules/auth/Login"));
const RegisterPage = lazy(() => import("@/modules/auth/Register"));

export const AuthRoutesConfig: RouteObject[] = [
  {
    index: true,
    Component: () => createElement(Navigate, { to: "login", replace: true }),
  },
  {
    path: "login",
    Component: LoginPage,
  },
  {
    path: "register",
    Component: RegisterPage,
  },
  {
    path: "*",
    Component: PageNotFound,
  },
];
