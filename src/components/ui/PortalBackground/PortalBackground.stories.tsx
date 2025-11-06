import type { StoryObj } from "@storybook/react-vite";
import PortalBackground from "./PortalBackground";
import Card from "../Card";

const meta = {
  title: "UI/PortalBackground",
  component: PortalBackground,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "🌀 Authentic Doctor Strange sling ring portal! Features: INNER window showing another dimension, OUTER rotating geometric mandala patterns (not circles), and electric crackling sparks around the edge. Just like the movie portals!",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["mystic", "cosmic", "fire", "ice"],
      description: "Portal color scheme - Mystic (orange/yellow sparks like Doctor Strange), Cosmic (blue), Fire (red), Ice (cyan)",
      table: {
        defaultValue: { summary: "mystic" },
      },
    },
    intensity: {
      control: "select",
      options: ["low", "medium", "high"],
      description: "Animation speed - Low (calm portal), Medium (balanced), High (dramatic energy)",
      table: {
        defaultValue: { summary: "medium" },
      },
    },
    animated: {
      control: "boolean",
      description: "Enable/disable all animations (sparks, crackling, ripples)",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    portalPosition: {
      control: "select",
      options: ["left", "center", "right", "top-left", "top-right", "bottom-left", "bottom-right"],
      description: "Portal position on screen - Control where the portal appears",
      table: {
        defaultValue: { summary: "center" },
      },
    },
    portalSize: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Portal size - sm (350px), md (500px), lg (650px), xl (800px)",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - True Doctor Strange Portal
export const Default: Story = {
  args: {
    variant: "mystic",
    intensity: "medium",
    animated: true,
    portalPosition: "center",
    portalSize: "md",
  },
  render: (args) => (
    <PortalBackground {...args}>
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-md p-8 shadow-2xl backdrop-blur-lg bg-card/80 border-2 border-warning/30">
          <h2 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-warning-400 to-danger-400 bg-clip-text text-transparent">
            ⚡ Sling Ring Portal
          </h2>
          <p className="text-center text-muted-foreground mb-3">
            Authentic Doctor Strange portal - see through to another dimension!
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>Inner: Another dimensional view</li>
            <li>Outer: Rotating geometric mandalas</li>
            <li>Edge: Electric crackling sparks</li>
            <li>Glowing rim effect</li>
          </ul>
        </Card>
      </div>
    </PortalBackground>
  ),
};

// Cosmic Portal - Blue/Purple
export const Cosmic: Story = {
  args: {
    variant: "cosmic",
    intensity: "medium",
    animated: true,
  },
  render: (args) => (
    <PortalBackground {...args}>
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-md p-8 shadow-2xl backdrop-blur-lg bg-card/80 border-2 border-info/30">
          <h2 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
            🌌 Cosmic Gateway
          </h2>
          <p className="text-center text-muted-foreground">
            Portal to the cosmos with blue electric edges and starlight sparks. Perfect for space-themed experiences or interdimensional travel.
          </p>
        </Card>
      </div>
    </PortalBackground>
  ),
};

// Fire Portal - Red/Orange Inferno
export const Fire: Story = {
  args: {
    variant: "fire",
    intensity: "medium",
    animated: true,
  },
  render: (args) => (
    <PortalBackground {...args}>
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-md p-8 shadow-2xl backdrop-blur-lg bg-card/80 border-2 border-danger/30">
          <h2 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-danger-400 to-warning-400 bg-clip-text text-transparent">
            🔥 Hell Portal
          </h2>
          <p className="text-center text-muted-foreground">
            Blazing gateway with red-hot crackling edges. Looks like a portal to the Dark Dimension or a fiery realm.
          </p>
        </Card>
      </div>
    </PortalBackground>
  ),
};

// Ice Portal - Frozen Gateway
export const Ice: Story = {
  args: {
    variant: "ice",
    intensity: "medium",
    animated: true,
  },
  render: (args) => (
    <PortalBackground {...args}>
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-md p-8 shadow-2xl backdrop-blur-lg bg-card/80 border-2 border-info/30">
          <h2 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-info-300 to-info-600 bg-clip-text text-transparent">
            ❄️ Frozen Portal
          </h2>
          <p className="text-center text-muted-foreground">
            Icy dimensional gateway with cool cyan sparks. Gateway to frozen realms or winter dimensions.
          </p>
        </Card>
      </div>
    </PortalBackground>
  ),
};

// Low Intensity - Calm Portal
export const LowIntensity: Story = {
  args: {
    variant: "mystic",
    intensity: "low",
    animated: true,
  },
  render: (args) => (
    <PortalBackground {...args}>
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-md p-8 shadow-2xl backdrop-blur-lg bg-card/80 border-2 border-warning/20">
          <h2 className="text-2xl font-bold text-center mb-4">🌙 Calm Portal</h2>
          <p className="text-center text-muted-foreground">
            Slower, subtler animations. The portal is stable and calm - perfect for meditation or peaceful background ambiance. Slower sparks and gentle crackling.
          </p>
        </Card>
      </div>
    </PortalBackground>
  ),
};

// High Intensity - Unstable Portal
export const HighIntensity: Story = {
  args: {
    variant: "mystic",
    intensity: "high",
    animated: true,
  },
  render: (args) => (
    <PortalBackground {...args}>
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-md p-8 shadow-2xl backdrop-blur-lg bg-card/80 border-2 border-warning/40">
          <h2 className="text-2xl font-bold text-center mb-4">⚡ Unstable Portal</h2>
          <p className="text-center text-muted-foreground">
            Fast, intense animations! The portal is crackling with energy - sparks flying rapidly, aggressive ripples. Perfect for dramatic moments or loading screens.
          </p>
        </Card>
      </div>
    </PortalBackground>
  ),
};

// Static Portal - No Animation
export const StaticPortal: Story = {
  args: {
    variant: "mystic",
    intensity: "medium",
    animated: false,
  },
  render: (args) => (
    <PortalBackground {...args}>
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-md p-8 shadow-2xl backdrop-blur-lg bg-card/80 border-2 border-warning/20">
          <h2 className="text-2xl font-bold text-center mb-4">🚫 Frozen in Time</h2>
          <p className="text-center text-muted-foreground">
            All animations disabled. The portal appears frozen - no sparks, no crackling, no movement. Useful for static backgrounds or performance optimization.
          </p>
        </Card>
      </div>
    </PortalBackground>
  ),
};

// Login Page - Authentic Use Case
export const LoginPageExample: Story = {
  args: {
    variant: "mystic",
    intensity: "medium",
    animated: true,
  },
  render: (args) => (
    <PortalBackground {...args}>
      <div className="flex items-center justify-center h-screen px-4">
        <Card className="w-full max-w-md p-8 shadow-2xl backdrop-blur-lg bg-card/80 border-2 border-warning/20">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              🔮 Step Through
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign in to access the mystical realm
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Sorcerer Name
              </label>
              <input
                type="email"
                placeholder="strange@kamar-taj.org"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background/50 backdrop-blur text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-warning"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Mystical Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background/50 backdrop-blur text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-warning"
              />
            </div>

            <button className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-warning-500 to-danger-500 text-white font-semibold hover:opacity-90 transition-opacity shadow-lg">
              ⚡ Enter Portal
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            New to the Mystic Arts?{" "}
            <a href="#" className="text-warning-500 font-medium hover:underline">
              Begin Training
            </a>
          </div>
        </Card>
      </div>
    </PortalBackground>
  ),
};

// Loading Screen - Dimensional Travel
export const LoadingScreen: Story = {
  args: {
    variant: "cosmic",
    intensity: "high",
    animated: true,
  },
  render: (args) => (
    <PortalBackground {...args}>
      <div className="flex flex-col items-center justify-center h-screen gap-6">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            🌀 Traversing Dimensions
          </h2>
          <p className="text-muted-foreground">
            Portal stabilizing... Please wait
          </p>
        </div>
      </div>
    </PortalBackground>
  ),
};

// Comparison Grid - All 4 Variants
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-0">
      <PortalBackground variant="mystic" intensity="medium" animated className="h-[50vh]">
        <div className="flex items-center justify-center h-full">
          <div className="text-center p-6 bg-card/80 backdrop-blur-lg rounded-lg border border-warning/30 shadow-xl">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="text-lg font-bold text-warning-500">Mystic</h3>
            <p className="text-sm text-muted-foreground">Orange Doctor Strange</p>
          </div>
        </div>
      </PortalBackground>

      <PortalBackground variant="cosmic" intensity="medium" animated className="h-[50vh]">
        <div className="flex items-center justify-center h-full">
          <div className="text-center p-6 bg-card/80 backdrop-blur-lg rounded-lg border border-primary/30 shadow-xl">
            <div className="text-3xl mb-2">🌌</div>
            <h3 className="text-lg font-bold text-primary">Cosmic</h3>
            <p className="text-sm text-muted-foreground">Blue Space Portal</p>
          </div>
        </div>
      </PortalBackground>

      <PortalBackground variant="fire" intensity="medium" animated className="h-[50vh]">
        <div className="flex items-center justify-center h-full">
          <div className="text-center p-6 bg-card/80 backdrop-blur-lg rounded-lg border border-danger/30 shadow-xl">
            <div className="text-3xl mb-2">🔥</div>
            <h3 className="text-lg font-bold text-danger-500">Fire</h3>
            <p className="text-sm text-muted-foreground">Red Hell Portal</p>
          </div>
        </div>
      </PortalBackground>

      <PortalBackground variant="ice" intensity="medium" animated className="h-[50vh]">
        <div className="flex items-center justify-center h-full">
          <div className="text-center p-6 bg-card/80 backdrop-blur-lg rounded-lg border border-info/30 shadow-xl">
            <div className="text-3xl mb-2">❄️</div>
            <h3 className="text-lg font-bold text-info-500">Ice</h3>
            <p className="text-sm text-muted-foreground">Cyan Frozen Portal</p>
          </div>
        </div>
      </PortalBackground>
    </div>
  ),
};

// Portal Positioning Demo
export const PortalPositions: Story = {
  args: {
    variant: "mystic",
    intensity: "medium",
    animated: true,
    portalPosition: "left",
    portalSize: "lg",
  },
  render: (args) => (
    <PortalBackground {...args}>
      <div className="min-h-screen w-full grid lg:grid-cols-2 gap-8 items-center px-4 py-8 lg:px-8">
        {/* Left side - Portal visible area */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="text-center text-white/80 max-w-md">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-warning via-warning-foreground to-danger bg-clip-text text-transparent">
              Portal on Left
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Use <code className="bg-muted px-2 py-1 rounded">portalPosition="left"</code> to position portal on left side
            </p>
            <p className="text-sm text-muted-foreground">
              Perfect for login pages, landing pages, or split-screen layouts!
            </p>
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md p-8 shadow-2xl backdrop-blur-lg bg-card/80 border-2 border-warning/30">
            <h3 className="text-2xl font-bold text-center mb-4">
              Your Content Here
            </h3>
            <p className="text-muted-foreground mb-4">
              The portal is positioned on the left, and your content (forms, cards, etc) can be on the right.
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Available positions:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>left / center / right</li>
                <li>top-left / top-right</li>
                <li>bottom-left / bottom-right</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </PortalBackground>
  ),
};

// Portal Sizes Demo
export const PortalSizes: Story = {
  args: {
    variant: "mystic",
    intensity: "medium",
    animated: true,
    portalPosition: "center",
    portalSize: "lg",
  },
  render: (args) => (
    <PortalBackground {...args}>
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-xl p-8 shadow-2xl backdrop-blur-lg bg-card/80 border-2 border-warning/30">
          <h2 className="text-2xl font-bold text-center mb-6">
            🎯 Portal Size Control
          </h2>
          
          <div className="space-y-4 text-sm">
            <div className="p-4 bg-muted/20 rounded-lg">
              <h3 className="font-semibold mb-2">📏 Available Sizes:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <code className="bg-muted px-2 py-1 rounded">sm</code> - Small (350px) - Subtle background effect</li>
                <li>• <code className="bg-muted px-2 py-1 rounded">md</code> - Medium (500px) - Default balanced size</li>
                <li>• <code className="bg-muted px-2 py-1 rounded">lg</code> - Large (650px) - Prominent portal</li>
                <li>• <code className="bg-muted px-2 py-1 rounded">xl</code> - Extra Large (800px) - Dramatic effect</li>
              </ul>
            </div>

            <div className="p-4 bg-warning/10 border border-warning/30 rounded-lg">
              <p className="text-xs text-center text-muted-foreground">
                💡 <strong>Current size:</strong> <code className="text-foreground">{args.portalSize}</code> - Try changing it in the controls!
              </p>
            </div>
          </div>
        </Card>
      </div>
    </PortalBackground>
  ),
};

// Interactive Playground - Full Control
export const Playground: Story = {
  args: {
    variant: "mystic",
    intensity: "medium",
    animated: true,
    portalPosition: "center",
    portalSize: "md",
  },
  render: (args) => (
    <PortalBackground {...args}>
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-xl p-8 shadow-2xl backdrop-blur-lg bg-card/80 border-2 border-primary/20">
          <h2 className="text-2xl font-bold text-center mb-6">
            🎮 Portal Playground
          </h2>
          
          <div className="space-y-4 text-sm">
            <div className="p-4 bg-muted/20 rounded-lg">
              <h3 className="font-semibold mb-2">✨ Current Settings:</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Variant: <span className="text-foreground font-mono">{args.variant}</span></li>
                <li>• Intensity: <span className="text-foreground font-mono">{args.intensity}</span></li>
                <li>• Position: <span className="text-foreground font-mono">{args.portalPosition}</span></li>
                <li>• Size: <span className="text-foreground font-mono">{args.portalSize}</span></li>
                <li>• Animated: <span className="text-foreground font-mono">{args.animated ? 'Yes' : 'No'}</span></li>
              </ul>
            </div>

            <div className="p-4 bg-muted/20 rounded-lg">
              <h3 className="font-semibold mb-2">🎛️ Try These:</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>→ Change portal position (left, center, right, etc)</li>
                <li>→ Adjust portal size (sm, md, lg, xl)</li>
                <li>→ Switch between color variants</li>
                <li>→ Adjust animation intensity</li>
                <li>→ Toggle animations on/off</li>
              </ul>
            </div>

            <div className="p-4 bg-warning/10 border border-warning/30 rounded-lg">
              <p className="text-xs text-center text-muted-foreground">
                💡 <strong>Tip:</strong> Use portalPosition="left" + portalSize="lg" for amazing split-screen layouts!
              </p>
            </div>
          </div>
        </Card>
      </div>
    </PortalBackground>
  ),
};
