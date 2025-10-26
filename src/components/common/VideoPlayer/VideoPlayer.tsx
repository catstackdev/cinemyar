import { useEffect, useRef } from "react";
import videojs from "video.js";
import type Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";
import { cn } from "@/utils/helpers/classNames";
import type { VideoPlayerProps } from "./VideoPlayer.types";
// import { KEYBOARD_SHORTCUTS } from "./constants";

const VideoPlayer = ({
  sources,
  poster,
  tracks = [],
  options = {},
  className,
  onReady,
  onPlay,
  onPause,
  onEnded,
  onError,
  onTimeUpdate,
  onLoadedMetadata,
  onVolumeChange,
  children,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      const videoElement = document.createElement("video");
      videoElement.classList.add("video-js", "vjs-big-play-centered");
      // videoElement.setAttribute("tabindex", "0");
      // videoElement.setAttribute("controls", "true");
      // videoElement.setAttribute("playsinline", "true");
      tracks.forEach((track) => {
        const trackElement = document.createElement("track");
        trackElement.kind = track.kind;
        trackElement.src = track.src;
        trackElement.srclang = track.srclang;
        trackElement.label = track.label;
        if (track.default) trackElement.default = true;
        videoElement.appendChild(trackElement);
      });

      videoRef.current.appendChild(videoElement);

      const defaultOptions = {
        controls: true,
        responsive: true,
        fluid: true,
        playbackRates: [0.5, 1, 1.5, 2],
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
        userActions: {
          hotkeys: true, // ✅ enables keyboard controls globally
        },
        ...options,
      };

      const player = (playerRef.current = videojs(
        videoElement,
        defaultOptions,
        () => {
          onReady?.();
        },
      ));

      if (poster) {
        player.poster(poster);
      }

      if (sources && sources.length > 0) {
        player.src(sources);
      }

      if (onPlay) {
        player.on("play", onPlay);
      }

      if (onPause) {
        player.on("pause", onPause);
      }

      if (onEnded) {
        player.on("ended", onEnded);
      }

      if (onError) {
        player.on("error", () => {
          const error = player.error();
          if (error) {
            onError(new Error(error.message || "Video player error"));
          }
        });
      }

      if (onTimeUpdate) {
        player.on("timeupdate", () => {
          const currentTime = player.currentTime();
          if (currentTime !== undefined) {
            onTimeUpdate(currentTime);
          }
        });
      }

      if (onLoadedMetadata) {
        player.on("loadedmetadata", onLoadedMetadata);
      }

      if (onVolumeChange) {
        player.on("volumechange", () => {
          const volume = player.volume();
          if (volume !== undefined) {
            onVolumeChange(volume);
          }
        });
      }
    }

    return () => {
      const player = playerRef.current;
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     const player = playerRef.current as Player;
  //     if (!player) return;
  //
  //     switch (e.key) {
  //       case KEYBOARD_SHORTCUTS.SEEK_FORWARD:
  //         player.currentTime(player.currentTime() + 5);
  //         break;
  //       case KEYBOARD_SHORTCUTS.SEEK_BACKWARD:
  //         player.currentTime(player.currentTime() - 5);
  //         break;
  //       case KEYBOARD_SHORTCUTS.PLAY_PAUSE:
  //         player.paused() ? player.play() : player.pause();
  //         break;
  //       case KEYBOARD_SHORTCUTS.MUTE:
  //         player.muted(!player.muted());
  //         break;
  //       case KEYBOARD_SHORTCUTS.FULLSCREEN:
  //         player.isFullscreen()
  //           ? player.exitFullscreen()
  //           : player.requestFullscreen();
  //         break;
  //       case KEYBOARD_SHORTCUTS.VOLUME_UP:
  //         player.volume(Math.min(player.volume() + 0.1, 1));
  //         break;
  //       case KEYBOARD_SHORTCUTS.VOLUME_DOWN:
  //         player.volume(Math.max(player.volume() - 0.1, 0));
  //         break;
  //     }
  //   };
  //
  //   document.addEventListener("keydown", handleKeyDown);
  //   return () => document.removeEventListener("keydown", handleKeyDown);
  // }, []);

  useEffect(() => {
    const player = playerRef.current;
    if (player && sources && sources.length > 0) {
      player.src(sources);
    }
  }, [sources]);

  useEffect(() => {
    const player = playerRef.current;
    if (player && poster) {
      player.poster(poster);
    }
  }, [poster]);

  return (
    <div className={cn("video-player-wrapper", className)} data-vjs-player>
      <div ref={videoRef} />
      {children}
    </div>
  );
};

export default VideoPlayer;
