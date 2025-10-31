import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/helpers";
import ContentCard from "./ContentCard";

interface ContentItem {
  id: string;
  title: string;
  year: number;
  genre: string;
  rating: number;
  imageUrl: string;
  type: "movie" | "series" | "web";
  duration?: string;
  seasons?: number;
}

// Mock data - in real app, this would come from API
const mockContent: ContentItem[] = [
  {
    id: "1",
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi, Thriller",
    rating: 8.8,
    imageUrl: "https://images.unsplash.com/photo-1489599904821-93bd25c75b39?w=400&h=600&fit=crop",
    type: "movie",
    duration: "2h 28m"
  },
  {
    id: "2", 
    title: "Stranger Things",
    year: 2016,
    genre: "Drama, Fantasy, Horror",
    rating: 8.7,
    imageUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    type: "series",
    seasons: 4
  },
  {
    id: "3",
    title: "The Dark Knight",
    year: 2008,
    genre: "Action, Crime, Drama",
    rating: 9.0,
    imageUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
    type: "movie",
    duration: "2h 32m"
  },
  {
    id: "4",
    title: "Breaking Bad",
    year: 2008,
    genre: "Crime, Drama, Thriller",
    rating: 9.5,
    imageUrl: "https://images.unsplash.com/photo-1489599904821-93bd25c75b39?w=400&h=600&fit=crop",
    type: "series",
    seasons: 5
  },
  {
    id: "5",
    title: "The Queen's Gambit",
    year: 2020,
    genre: "Drama",
    rating: 8.5,
    imageUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    type: "series",
    seasons: 1
  },
  {
    id: "6",
    title: "Dune",
    year: 2021,
    genre: "Adventure, Drama, Sci-Fi",
    rating: 8.0,
    imageUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
    type: "movie",
    duration: "2h 35m"
  },
  {
    id: "7",
    title: "Money Heist",
    year: 2017,
    genre: "Action, Crime, Mystery",
    rating: 8.2,
    imageUrl: "https://images.unsplash.com/photo-1489599904821-93bd25c75b39?w=400&h=600&fit=crop",
    type: "series",
    seasons: 5
  },
  {
    id: "8",
    title: "Parasite",
    year: 2019,
    genre: "Comedy, Drama, Thriller",
    rating: 8.6,
    imageUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    type: "movie",
    duration: "2h 12m"
  },
  {
    id: "9",
    title: "The Mandalorian",
    year: 2019,
    genre: "Action, Adventure, Fantasy",
    rating: 8.8,
    imageUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
    type: "web",
    seasons: 3
  },
  {
    id: "10",
    title: "House of Cards",
    year: 2013,
    genre: "Drama",
    rating: 8.7,
    imageUrl: "https://images.unsplash.com/photo-1489599904821-93bd25c75b39?w=400&h=600&fit=crop",
    type: "web",
    seasons: 6
  }
];

type FilterType = "all" | "movie" | "series" | "web";

const TrendingContentSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: "all", label: "All Content", count: mockContent.length },
    { key: "movie", label: "Movies", count: mockContent.filter(item => item.type === "movie").length },
    { key: "series", label: "Series", count: mockContent.filter(item => item.type === "series").length },
    { key: "web", label: "Web Shows", count: mockContent.filter(item => item.type === "web").length },
  ];

  const filteredContent = activeFilter === "all" 
    ? mockContent 
    : mockContent.filter(item => item.type === activeFilter);

  const displayedContent = filteredContent.slice(0, 8); // Show first 8 items

  return (
    <section id="trending" className="py-24 lg:py-32 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Trending Now
          </div>
          
          <h2 className={cn(
            "text-3xl sm:text-4xl lg:text-5xl font-bold mb-6",
            "bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent"
          )}>
            Popular This Week
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Discover what millions are watching right now. From blockbuster movies to binge-worthy series.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.key}
              variant={activeFilter === filter.key ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter.key)}
              className={cn(
                "px-4 py-2 transition-all duration-200",
                activeFilter === filter.key 
                  ? "shadow-lg" 
                  : "hover:bg-muted/50"
              )}
            >
              {filter.label}
              <span className={cn(
                "ml-2 px-2 py-0.5 rounded-full text-xs",
                activeFilter === filter.key
                  ? "bg-primary-foreground/20"
                  : "bg-muted"
              )}>
                {filter.count}
              </span>
            </Button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {displayedContent.map((item) => (
            <ContentCard
              key={item.id}
              title={item.title}
              year={item.year}
              genre={item.genre}
              rating={item.rating}
              imageUrl={item.imageUrl}
              type={item.type}
              duration={item.duration}
              seasons={item.seasons}
            />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <div className="mb-6">
            <p className="text-muted-foreground mb-4">
              {filteredContent.length > 8 && (
                <span>Showing 8 of {filteredContent.length} {activeFilter === "all" ? "titles" : `${activeFilter}s`}</span>
              )}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="px-8 py-3"
              onClick={() => {
                // Navigate to signup
                window.location.href = "/auth/signup";
              }}
            >
              Sign Up to Watch All
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
            
            <Button
              variant="ghost"
              size="lg"
              className="px-8 py-3"
              onClick={() => {
                // Scroll to pricing
                const pricingSection = document.getElementById("pricing");
                if (pricingSection) {
                  pricingSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              View All Plans
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 pt-12 border-t border-border/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "50K+", label: "Movies & Shows" },
              { value: "180+", label: "Countries" },
              { value: "25+", label: "Languages" },
              { value: "10M+", label: "Happy Users" },
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingContentSection;