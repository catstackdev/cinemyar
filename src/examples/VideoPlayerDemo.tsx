import { useState } from "react";
import { VideoPlayer } from "@/components/common";
import type { VideoSource, VideoTrack } from "@/components/common/VideoPlayer";
import Button from "@/components/ui/Button";
import { Container } from "@/components/ui";
import { Play, Pause, Volume2, Film, Settings, Subtitles } from "lucide-react";

export const VideoPlayerDemo = () => {
  const [currentDemo, setCurrentDemo] = useState<"basic" | "quality" | "subtitles">("basic");

  // Multiple quality sources (same file for demo, in production use different resolutions)
  const multiQualitySources: VideoSource[] = [
    {
      src: "/videos/sample-video.mp4",
      type: "video/mp4",
      label: "1080p",
      res: "1920x1080",
    },
    {
      src: "/videos/sample-720p.mp4",
      type: "video/mp4",
      label: "720p",
      res: "1280x720",
    },
    {
      src: "/videos/sample-480p.mp4",
      type: "video/mp4",
      label: "480p",
      res: "854x480",
    },
  ];

  // Subtitle tracks
  const subtitleTracks: VideoTrack[] = [
    {
      kind: "subtitles",
      src: "/videos/subtitles/english.vtt",
      srclang: "en",
      label: "English",
      default: true,
    },
    {
      kind: "subtitles",
      src: "/videos/subtitles/spanish.vtt",
      srclang: "es",
      label: "Español",
    },
  ];

  const handlePlay = () => {
    console.log("Video started playing");
  };

  const handlePause = () => {
    console.log("Video paused");
  };

  const handleEnded = () => {
    console.log("Video ended");
  };

  return (
    <Container className="py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">VideoPlayer Demo</h1>
          <p className="text-muted-foreground">
            Powered by Video.js - Professional HTML5 video player
          </p>
        </div>

        {/* Demo Selector */}
        <section className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Select Demo</h2>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => setCurrentDemo("basic")}
              variant={currentDemo === "basic" ? "default" : "outline"}
              size="sm"
            >
              <Film className="mr-2 h-4 w-4" />
              Basic Player
            </Button>
            <Button
              onClick={() => setCurrentDemo("quality")}
              variant={currentDemo === "quality" ? "default" : "outline"}
              size="sm"
            >
              <Settings className="mr-2 h-4 w-4" />
              Quality Switching
            </Button>
            <Button
              onClick={() => setCurrentDemo("subtitles")}
              variant={currentDemo === "subtitles" ? "default" : "outline"}
              size="sm"
            >
              <Subtitles className="mr-2 h-4 w-4" />
              Subtitles Demo
            </Button>
          </div>
        </section>

        {/* Basic Video Player */}
        {currentDemo === "basic" && (
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">Basic Video Player</h2>
            <VideoPlayer
              sources={[
                {
                  src: "/videos/sample-video.mp4",
                  type: "video/mp4",
                },
              ]}
              options={{
                controls: true,
                responsive: true,
                fluid: true,
                playbackRates: [0.5, 1, 1.5, 2],
              }}
              onPlay={handlePlay}
              onPause={handlePause}
              onEnded={handleEnded}
            />
            <div className="mt-4 text-sm text-muted-foreground">
              <p>
                <strong>Features:</strong> Play/Pause, Volume Control, Fullscreen,
                Picture-in-Picture, Playback Speed (0.5x - 2x)
              </p>
            </div>
          </section>
        )}

        {/* Quality Switching Demo */}
        {currentDemo === "quality" && (
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">
              Multi-Quality Sources
            </h2>
            <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <strong>💡 Note:</strong> This demo uses the same video file for all
                qualities. In production, provide actual different resolution files
                (e.g., 1080p.mp4, 720p.mp4, 480p.mp4).
              </p>
            </div>
            <VideoPlayer
              sources={multiQualitySources}
              options={{
                controls: true,
                responsive: true,
                fluid: true,
                playbackRates: [0.5, 1, 1.5, 2],
              }}
            />
            <div className="mt-4 text-sm text-muted-foreground">
              <p>
                <strong>How to use:</strong> Click the settings gear icon in the player
                to see quality options (1080p, 720p, 480p).
              </p>
            </div>
          </section>
        )}

        {/* Subtitles Demo */}
        {currentDemo === "subtitles" && (
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">
              Subtitles & Captions
            </h2>
            <div className="mb-4 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <p className="text-sm text-green-900 dark:text-green-100">
                <strong>✓ Subtitles Available:</strong> English (default) and
                Spanish. Click the "CC" button in the player to enable/switch.
              </p>
            </div>
            <VideoPlayer
              sources={[
                {
                  src: "/videos/sample-video.mp4",
                  type: "video/mp4",
                },
              ]}
              tracks={subtitleTracks}
              options={{
                controls: true,
                responsive: true,
                fluid: true,
              }}
            />
            <div className="mt-4 space-y-2 text-sm">
              <p className="text-muted-foreground">
                <strong>How to use:</strong> Click the "CC" (Closed Captions) button
                in the player controls.
              </p>
              <p className="text-muted-foreground">
                <strong>Available subtitles:</strong> English (default), Español
              </p>
              <details className="mt-4">
                <summary className="cursor-pointer font-semibold text-sm">
                  View Subtitle Files
                </summary>
                <div className="mt-2 space-y-2">
                  <div className="bg-muted p-3 rounded">
                    <code className="text-xs">
                      /videos/subtitles/english.vtt
                    </code>
                  </div>
                  <div className="bg-muted p-3 rounded">
                    <code className="text-xs">
                      /videos/subtitles/spanish.vtt
                    </code>
                  </div>
                </div>
              </details>
            </div>
          </section>
        )}

        {/* Custom Options Example */}
        <section className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">
            Autoplay & Loop Example
          </h2>
          <VideoPlayer
            sources={[
              {
                src: "/videos/sample-video.mp4",
                type: "video/mp4",
              },
            ]}
            options={{
              autoplay: true,
              muted: true,
              controls: true,
              fluid: true,
              loop: true,
            }}
          />
          <p className="mt-4 text-sm text-muted-foreground">
            This video autoplays (muted) and loops. Useful for background videos
            or trailers.
          </p>
        </section>

        {/* Features List */}
        <section className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Play className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold">Playback Controls</h3>
                  <p className="text-sm text-muted-foreground">
                    Play, pause, seek, and scrub through video timeline
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Volume2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold">Volume Control</h3>
                  <p className="text-sm text-muted-foreground">
                    Adjustable volume with mute/unmute toggle
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Film className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold">Quality & Speed</h3>
                  <p className="text-sm text-muted-foreground">
                    Multiple playback rates (0.5x - 2x)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Pause className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold">Modern Features</h3>
                  <p className="text-sm text-muted-foreground">
                    Picture-in-Picture, fullscreen, keyboard shortcuts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Code Example */}
        <section className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Usage Example</h2>
          <pre className="bg-muted p-4 rounded text-xs overflow-x-auto">
            <code>{`import { VideoPlayer } from "@/components/common";

<VideoPlayer
  sources={[
    {
      src: "https://example.com/movie-trailer.mp4",
      type: "video/mp4",
      label: "Movie Trailer",
    },
  ]}
  poster="https://example.com/poster.jpg"
  options={{
    controls: true,
    responsive: true,
    fluid: true,
    playbackRates: [0.5, 1, 1.5, 2],
  }}
  onPlay={() => console.log("Playing")}
  onPause={() => console.log("Paused")}
  onEnded={() => console.log("Ended")}
/>`}</code>
          </pre>
        </section>

        {/* Keyboard Shortcuts */}
        <section className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Keyboard Shortcuts</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center justify-between bg-muted p-2 rounded">
              <span className="text-muted-foreground">Play/Pause</span>
              <kbd className="px-2 py-1 bg-background border rounded">
                Space
              </kbd>
            </div>
            <div className="flex items-center justify-between bg-muted p-2 rounded">
              <span className="text-muted-foreground">Mute</span>
              <kbd className="px-2 py-1 bg-background border rounded">M</kbd>
            </div>
            <div className="flex items-center justify-between bg-muted p-2 rounded">
              <span className="text-muted-foreground">Fullscreen</span>
              <kbd className="px-2 py-1 bg-background border rounded">F</kbd>
            </div>
            <div className="flex items-center justify-between bg-muted p-2 rounded">
              <span className="text-muted-foreground">Seek Forward</span>
              <kbd className="px-2 py-1 bg-background border rounded">→</kbd>
            </div>
            <div className="flex items-center justify-between bg-muted p-2 rounded">
              <span className="text-muted-foreground">Seek Backward</span>
              <kbd className="px-2 py-1 bg-background border rounded">←</kbd>
            </div>
            <div className="flex items-center justify-between bg-muted p-2 rounded">
              <span className="text-muted-foreground">Volume Up/Down</span>
              <kbd className="px-2 py-1 bg-background border rounded">↑↓</kbd>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
};
