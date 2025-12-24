// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/types/movie/movie.types.ts
// Generated: 2025-12-23T11:53:07.631Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

import type {
  FormatKey,
  ContentTypeKey,
  GenreKey,
  MoodKey,
  ThemeKey,
  TagKey,
  CountryCode,
  LanguageCode,
} from '@/shared/constants';
import type { BasePaginationParams } from '../params';

export interface Movie {
  id: string;
  slug: string;
  title: string;
  originalTitle?: string;
  description: string;
  tagline?: string;
  releaseYear: number;
  releaseDate?: string;
  posterUrl: string;
  thumbnailUrl: string;
  backdropUrl?: string;
  videoUrl: string;
  trailerUrl?: string;
  formats: FormatKey[];
  contentTypes: ContentTypeKey[];
  moods: MoodKey[];
  themes: ThemeKey[];
  tags: TagKey[];
  languages: LanguageCode[];
  countries: CountryCode[];
  duration: number;
  rating: number;
  contentRating?: string;
  isPremiumOnly: boolean;
  isFeatured: boolean;
  views: number;
  avgRating: number;
}

export interface Genre {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
}

export interface GenreWithChildren extends Genre {
  children?: Genre[];
  movieCount?: number;
}

export interface MovieListItem {
  id: string;
  slug: string;
  title: string;
  posterUrl: string;
  thumbnailUrl: string;
  rating: number;
  avgRating: number;
  views: number;
  releaseYear: number;
  duration: number;
  isPremiumOnly: boolean;
  isFeatured: boolean;
  formats: FormatKey[];
  moods: MoodKey[];
  genres: Genre[];
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  videoSources: VideoSource[];
  director?: string;
  cast?: CastMember[];
  crew?: CrewMember[];
}

export interface VideoSource {
  id: string;
  quality: 'SD_480P' | 'HD_720P' | 'HD_1080P' | 'UHD_4K' | 'UHD_8K';
  url: string;
  format: string;
  sizeInMB?: number;
  isDefault: boolean;
}

export interface CastMember {
  actor: string;
  character: string;
  role: 'lead' | 'supporting' | 'guest';
  photoUrl?: string;
}

export interface CrewMember {
  name: string;
  role: string;
}

export interface MovieQueryParams extends BasePaginationParams {
  genres?: GenreKey[];
  moods?: MoodKey[];
  formats?: FormatKey[];
  themes?: ThemeKey[];
  countries?: CountryCode[];
  isPremiumOnly?: boolean;
  minRating?: number;
  releaseYear?: number;
  sortBy?: 'views' | 'rating' | 'releaseYear' | 'createdAt';
}

export interface WatchProgress {
  id: string;
  userId: string;
  movieId: string;
  currentPosition: number;
  duration: number;
  percentage: number;
  lastWatchedAt: string;
}

export interface UserRating {
  id: string;
  userId: string;
  movieId: string;
  score: number;
  review?: string;
  createdAt: string;
  user?: {
    id: string;
    username: string;
  };
}
