import type { RouteObject } from "react-router-dom";
import HomePage from "./landing/pages/HomePage";
import PricingPage from "./landing/pages/PricingPage";
import ContactPage from "./landing/pages/ContactPage";

export const PublicRoutesConfig: RouteObject[] = [
  {
    index: true,
    Component: HomePage,
  },
  {
    path: "pricing",
    Component: PricingPage,
  },
  {
    path: "contact", 
    Component: ContactPage,
  },
];