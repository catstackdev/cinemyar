import type { VideoPlayerOptions } from "./VideoPlayer.types";

export const DEFAULT_VIDEO_OPTIONS: VideoPlayerOptions = {
  controls: true,
  responsive: true,
  fluid: true,
  playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 2],
  preload: "auto",
  aspectRatio: "16:9",
  controlBar: {
    pictureInPictureToggle: true,
    fullscreenToggle: true,
    playbackRateMenuButton: true,
    volumePanel: true,
    currentTimeDisplay: true,
    timeDivider: true,
    durationDisplay: true,
    progressControl: true,
  },
};

export const COMMON_VIDEO_FORMATS = {
  mp4: "video/mp4",
  webm: "video/webm",
  ogg: "video/ogg",
  hls: "application/x-mpegURL",
  dash: "application/dash+xml",
} as const;

export const VIDEO_QUALITY_LABELS = {
  "4k": "2160p",
  "1080p": "1080p",
  "720p": "720p",
  "480p": "480p",
  "360p": "360p",
  "240p": "240p",
} as const;

export const KEYBOARD_SHORTCUTS = {
  PLAY_PAUSE: " ",
  MUTE: "m",
  FULLSCREEN: "f",
  VOLUME_UP: "ArrowUp",
  VOLUME_DOWN: "ArrowDown",
  SEEK_FORWARD: "ArrowRight",
  SEEK_BACKWARD: "ArrowLeft",
} as const;
