import React from "react";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/helpers";

const CTASection: React.FC = () => {
  const handleGetStarted = () => {
    window.location.href = "/auth/signup";
  };

  const handleLearnMore = () => {
    window.location.href = "/pricing";
  };

  return (
    <section id="cta" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "relative overflow-hidden rounded-3xl p-12 lg:p-16",
          "bg-gradient-to-br from-primary via-info to-primary",
          "text-white text-center"
        )}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full blur-2xl" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Ready to Start Your Entertainment Journey?
            </h2>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto text-balance">
              Join millions of viewers who've already discovered their next favorite story. 
              Start your free trial today and explore unlimited entertainment.
            </p>

            {/* Features List */}
            <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm">
              {[
                "No contracts",
                "Cancel anytime", 
                "Watch offline",
                "4K quality",
                "All devices"
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={handleGetStarted}
                className={cn(
                  "px-8 py-4 text-lg font-semibold bg-white text-primary",
                  "hover:bg-white/90 shadow-lg hover:shadow-xl",
                  "transition-all duration-300 hover:scale-105",
                  "min-w-[200px]"
                )}
              >
                Start Free Trial
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleLearnMore}
                className={cn(
                  "px-8 py-4 text-lg font-semibold",
                  "border-2 border-white/50 text-white hover:border-white",
                  "hover:bg-white/10 backdrop-blur-sm",
                  "transition-all duration-300",
                  "min-w-[200px]"
                )}
              >
                View Plans
              </Button>
            </div>

            {/* Trust Indicator */}
            <div className="mt-8 text-sm text-white/80">
              <p>Trusted by over 10 million users worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;