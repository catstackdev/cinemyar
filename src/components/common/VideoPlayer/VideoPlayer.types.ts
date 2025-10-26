import type { ReactNode } from "react";

export interface VideoSource {
  src: string;
  type?: string;
  label?: string;
  res?: string;
}

export interface VideoTrack {
  kind: "subtitles" | "captions" | "descriptions" | "chapters" | "metadata";
  src: string;
  srclang: string;
  label: string;
  default?: boolean;
}

export interface VideoPlayerOptions {
  autoplay?: boolean;
  controls?: boolean;
  fluid?: boolean;
  responsive?: boolean;
  aspectRatio?: string;
  playbackRates?: number[];
  poster?: string;
  preload?: "auto" | "metadata" | "none";
  muted?: boolean;
  loop?: boolean;
  language?: string;
  languages?: Record<string, Record<string, string>>;
  controlBar?: {
    pictureInPictureToggle?: boolean;
    fullscreenToggle?: boolean;
    playbackRateMenuButton?: boolean;
    qualitySelector?: boolean;
    volumePanel?: boolean;
    currentTimeDisplay?: boolean;
    timeDivider?: boolean;
    durationDisplay?: boolean;
    remainingTimeDisplay?: boolean;
    progressControl?: boolean;
  };
}

export interface VideoPlayerProps {
  sources: VideoSource[];
  poster?: string;
  tracks?: VideoTrack[];
  options?: VideoPlayerOptions;
  className?: string;
  onReady?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onError?: (error: Error) => void;
  onTimeUpdate?: (currentTime: number) => void;
  onLoadedMetadata?: () => void;
  onVolumeChange?: (volume: number) => void;
  children?: ReactNode;
}
