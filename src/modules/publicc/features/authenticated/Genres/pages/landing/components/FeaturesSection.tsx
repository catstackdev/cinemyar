import React from "react";
import { cn } from "@/utils/helpers";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

const features: Feature[] = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v22a1 1 0 01-1 1H4a1 1 0 01-1-1V1a1 1 0 011-1h2a1 1 0 011 1v3m0 0h8m-8 0V4a1 1 0 00-1 1v14a1 1 0 001 1h8a1 1 0 001-1V5a1 1 0 00-1-1V4" />
      </svg>
    ),
    title: "4K Ultra HD Quality",
    description: "Experience cinema-quality streaming with crisp 4K Ultra HD resolution and immersive surround sound.",
    gradient: "from-primary to-info"
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Watch Anywhere",
    description: "Seamlessly switch between your phone, tablet, laptop, and TV. Your content follows you everywhere.",
    gradient: "from-info to-success"
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
    title: "Download & Go",
    description: "Download your favorite movies and shows to watch offline during flights, commutes, or anywhere without internet.",
    gradient: "from-success to-warning"
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Lightning Fast",
    description: "Advanced streaming technology ensures instant playback with minimal buffering, even on slower connections.",
    gradient: "from-warning to-danger"
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Family Safe",
    description: "Robust parental controls and family-friendly content filters ensure safe viewing for all ages.",
    gradient: "from-danger to-primary"
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "No Commitments",
    description: "Cancel anytime with no hidden fees or contracts. Pause your subscription and resume whenever you want.",
    gradient: "from-primary to-info"
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={cn(
            "text-3xl sm:text-4xl lg:text-5xl font-bold mb-6",
            "bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent"
          )}>
            Why Choose CINEMYAR?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-balance">
            Experience entertainment like never before with features designed to give you the ultimate streaming experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={cn(
                "group relative p-8 rounded-2xl transition-all duration-300",
                "bg-card/50 backdrop-blur-sm border border-border/50",
                "hover:bg-card/80 hover:border-border",
                "hover:shadow-lg hover:shadow-primary/10",
                "hover:-translate-y-1"
              )}
            >
              {/* Icon */}
              <div className={cn(
                "w-16 h-16 rounded-xl mb-6 flex items-center justify-center",
                "bg-gradient-to-br transition-all duration-300",
                feature.gradient,
                "group-hover:scale-110 group-hover:rotate-3"
              )}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className={cn(
                "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100",
                "bg-gradient-to-br transition-all duration-300",
                feature.gradient,
                "mix-blend-multiply dark:mix-blend-screen",
                "pointer-events-none"
              )} style={{ opacity: 0.02 }} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className={cn(
            "inline-flex items-center gap-3 px-6 py-3 rounded-full",
            "bg-muted/50 border border-border/50",
            "text-sm font-medium text-muted-foreground"
          )}>
            <div className="flex -space-x-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-8 h-8 rounded-full border-2 border-background",
                    "flex items-center justify-center text-xs font-semibold text-white",
                    i === 0 && "bg-primary",
                    i === 1 && "bg-info", 
                    i === 2 && "bg-success",
                    i === 3 && "bg-warning",
                    i === 4 && "bg-danger"
                  )}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span>Trusted by millions of users worldwide</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;