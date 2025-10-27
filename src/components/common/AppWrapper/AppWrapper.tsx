import { HelmetProvider, Helmet } from "react-helmet-async";
import type { AppMetaProps, AppWrapperProps } from "./AppWrapper.types";

const PageMeta = ({ title, description }: AppMetaProps) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
  </Helmet>
);

export const AppWrapper = ({ children }: AppWrapperProps) => (
  <HelmetProvider>{children}</HelmetProvider>
);

export default PageMeta;
