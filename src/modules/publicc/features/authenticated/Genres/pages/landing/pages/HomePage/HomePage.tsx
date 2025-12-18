import React from 'react';
import { cn } from "@/utils/helpers";
import type { HomePageProps } from "./HomePage.types";
import { 
  HeroSection, 
  FeaturesSection, 
  TrendingContentSection, 
  CTASection 
} from "../../components";

const HomePage: React.FC<HomePageProps> = ({ children, className }) => {
  return (
    <div className={cn("min-h-screen", className)}>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* Trending Content Section */}
      <TrendingContentSection />
      
      {/* Final CTA Section */}
      <CTASection />
      
      {children}
    </div>
  );
};

export default HomePage;
