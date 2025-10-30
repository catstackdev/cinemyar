import { Logo } from "@/components/ui";

export default function LogoDemo() {
  return (
    <div className="p-8 space-y-12">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">Logo Component Demo</h2>
        <p className="text-muted-foreground">
          Animated film strip logo with spotlight star for CINEMYAR
        </p>
      </div>

      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-primary">Animated Variants</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 border rounded-lg space-y-4 bg-card">
            <h4 className="font-medium text-sm text-muted-foreground">Full Logo - Animated</h4>
            <div className="flex justify-center items-center min-h-[100px]">
              <Logo animated size="lg" />
            </div>
            <code className="text-xs bg-muted p-2 rounded block">
              {`<Logo animated size="lg" />`}
            </code>
          </div>

          <div className="p-6 border rounded-lg space-y-4 bg-card">
            <h4 className="font-medium text-sm text-muted-foreground">Icon Only - Animated</h4>
            <div className="flex justify-center items-center min-h-[100px]">
              <Logo variant="icon" animated size="xl" />
            </div>
            <code className="text-xs bg-muted p-2 rounded block">
              {`<Logo variant="icon" animated size="xl" />`}
            </code>
          </div>

          <div className="p-6 border rounded-lg space-y-4 bg-card">
            <h4 className="font-medium text-sm text-muted-foreground">Text Only - Animated</h4>
            <div className="flex justify-center items-center min-h-[100px]">
              <Logo variant="text" animated size="lg" />
            </div>
            <code className="text-xs bg-muted p-2 rounded block">
              {`<Logo variant="text" animated size="lg" />`}
            </code>
          </div>

          <div className="p-6 border rounded-lg space-y-4 bg-card">
            <h4 className="font-medium text-sm text-muted-foreground">Custom Timing</h4>
            <div className="flex justify-center items-center min-h-[100px]">
              <Logo 
                animated 
                size="lg"
                iconDelay="0.2s"
                textDelay="1s"
                subtitleDelay="1.5s"
              />
            </div>
            <code className="text-xs bg-muted p-2 rounded block">
              {`<Logo animated iconDelay="0.2s" textDelay="1s" />`}
            </code>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-primary">Sizes (Static)</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 border rounded-lg space-y-4 bg-card">
            <h4 className="font-medium text-sm text-muted-foreground">Small</h4>
            <div className="flex justify-center items-center">
              <Logo size="sm" />
            </div>
            <code className="text-xs bg-muted p-2 rounded block">
              {`<Logo size="sm" />`}
            </code>
          </div>

          <div className="p-6 border rounded-lg space-y-4 bg-card">
            <h4 className="font-medium text-sm text-muted-foreground">Medium (Default)</h4>
            <div className="flex justify-center items-center">
              <Logo size="md" />
            </div>
            <code className="text-xs bg-muted p-2 rounded block">
              {`<Logo size="md" />`}
            </code>
          </div>

          <div className="p-6 border rounded-lg space-y-4 bg-card">
            <h4 className="font-medium text-sm text-muted-foreground">Large</h4>
            <div className="flex justify-center items-center">
              <Logo size="lg" />
            </div>
            <code className="text-xs bg-muted p-2 rounded block">
              {`<Logo size="lg" />`}
            </code>
          </div>

          <div className="p-6 border rounded-lg space-y-4 bg-card">
            <h4 className="font-medium text-sm text-muted-foreground">Extra Large</h4>
            <div className="flex justify-center items-center">
              <Logo size="xl" />
            </div>
            <code className="text-xs bg-muted p-2 rounded block">
              {`<Logo size="xl" />`}
            </code>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-primary">Icon Variants</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
            <div key={size} className="p-6 border rounded-lg space-y-4 bg-card">
              <h4 className="font-medium text-sm text-muted-foreground capitalize">{size}</h4>
              <div className="flex justify-center items-center">
                <Logo variant="icon" size={size} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-primary">Hover Effects</h3>
        <p className="text-sm text-muted-foreground">
          Hover over the logo to see interactive animations
        </p>
        
        <div className="p-12 border rounded-lg bg-card flex justify-center">
          <Logo size="xl" animated />
        </div>
      </section>

      <section className="space-y-6 border-t pt-8">
        <h3 className="text-xl font-semibold text-primary">Animation Features</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-warning">★</span>
            <span><strong>Icon Entrance:</strong> Scale + rotation with elastic bounce effect</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warning">★</span>
            <span><strong>Film Strip:</strong> Subtle pulsing animation (3s loop)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warning">★</span>
            <span><strong>Sprocket Holes:</strong> Alternating blink creating "film rolling" effect</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warning">★</span>
            <span><strong>Spotlight Glow:</strong> Radial pulse from center (2.5s smooth loop)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warning">★</span>
            <span><strong>Center Star:</strong> 360° rotation entrance with continuous twinkle</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warning">★</span>
            <span><strong>Text Slide:</strong> Smooth slide-in from right with deceleration</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warning">★</span>
            <span><strong>Subtitle Fade:</strong> Fade-in from bottom with delay</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warning">★</span>
            <span><strong>Hover Effects:</strong> Speeds up all animations for interaction</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
