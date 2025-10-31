import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/helpers";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/auth/signup");
  };

  const handleBrowseContent = () => {
    // Scroll to trending section
    const trendingSection = document.getElementById("trending");
    if (trendingSection) {
      trendingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-info/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-from)_0%,transparent_50%)] from-primary/20 to-transparent" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-info/20 rounded-full blur-2xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-warning/20 rounded-full blur-lg animate-pulse delay-500" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-6xl mx-auto">
          {/* Main Headline */}
          <h1
            className={cn(
              "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight",
              "gradient-text",
            )}
          >
            Stream Movies, Series & More
          </h1>

          {/* Subtitle */}
          <p
            className={cn(
              "text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto",
              "text-balance leading-relaxed",
            )}
          >
            Unlimited entertainment at your fingertips. Watch anywhere, anytime
            on all your devices. Join millions of viewers discovering their next
            favorite story.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              "4K Ultra HD",
              "No Ads",
              "Download & Watch Offline",
              "Multiple Devices",
              "Cancel Anytime",
            ].map((feature) => (
              <div
                key={feature}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium",
                  "bg-muted/80 text-muted-foreground",
                  "border border-border/50",
                  "backdrop-blur-sm",
                )}
              >
                {feature}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              size="lg"
              onClick={handleGetStarted}
              className={cn(
                "px-8 py-4 text-lg font-semibold",
                "bg-gradient-to-r from-primary/30 to-info/30",
                "hover:from-primary-600/30 hover:to-info-600/30",
                "shadow-lg hover:shadow-xl",
                "transition-all duration-300 hover:scale-105",
                "min-w-[200px]",
              )}
            >
              Get Started Free
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleBrowseContent}
              className={cn(
                "px-8 py-4 text-lg font-semibold",
                "border-2 border-primary/50 hover:border-primary",
                "hover:bg-primary/10",
                "transition-all duration-300",
                "min-w-[200px]",
              )}
            >
              Browse Content
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span>10M+ Active Users</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span>50K+ Hours of Content</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span>99.9% Uptime</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center text-muted-foreground">
          <span className="text-xs mb-2">Scroll to explore</span>
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
