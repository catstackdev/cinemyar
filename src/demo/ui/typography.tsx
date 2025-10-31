export default function TypographyDemo() {
  return (
    <div className="p-8 space-y-12 max-w-6xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-poster text-primary">CINEMYAR Typography</h1>
        <p className="text-muted-foreground text-lg">
          Showcase of Outfit, Bebas Neue, and JetBrains Mono fonts
        </p>
      </div>

      {/* Display Font - Bebas Neue */}
      <section className="space-y-6 border-t pt-8">
        <h2 className="text-3xl font-display uppercase tracking-widest text-primary">
          Display Font - Bebas Neue
        </h2>
        <p className="text-muted-foreground">
          Perfect for movie titles, headers, and cinematic text
        </p>

        <div className="grid gap-6">
          {/* Movie Poster Style */}
          <div className="p-8 bg-gradient-to-r from-primary/10 to-warning/10 rounded-lg">
            <h3 className="text-sm font-semibold mb-4 text-muted-foreground">
              .text-poster - Hero Headers
            </h3>
            <h1 className="text-poster text-primary">FEATURED MOVIES</h1>
            <code className="text-xs bg-muted p-2 rounded block mt-4">
              {`<h1 className="text-poster">FEATURED MOVIES</h1>`}
            </code>
          </div>

          {/* Movie Title Style */}
          <div className="p-8 bg-card border rounded-lg">
            <h3 className="text-sm font-semibold mb-4 text-muted-foreground">
              .text-movie-title - Movie Cards
            </h3>
            <h2 className="text-movie-title text-4xl text-primary mb-2">
              INCEPTION
            </h2>
            <h2 className="text-movie-title text-3xl text-primary mb-2">
              The Dark Knight
            </h2>
            <h2 className="text-movie-title text-2xl text-primary">
              Interstellar
            </h2>
            <code className="text-xs bg-muted p-2 rounded block mt-4">
              {`<h2 className="text-movie-title text-4xl">INCEPTION</h2>`}
            </code>
          </div>

          {/* Cinematic Text */}
          <div className="p-8 bg-card border rounded-lg">
            <h3 className="text-sm font-semibold mb-4 text-muted-foreground">
              .text-cinematic - CTA Buttons & Headers
            </h3>
            <div className="space-y-4">
              <button className="px-8 py-3 bg-primary text-primary-foreground text-cinematic text-xl rounded-lg hover:bg-primary/90 transition-colors">
                Watch Now
              </button>
              <button className="px-8 py-3 bg-warning text-white text-cinematic text-lg rounded-lg hover:bg-warning/90 transition-colors">
                Get Tickets
              </button>
              <button className="px-6 py-2 border-2 border-primary text-primary text-cinematic rounded-lg hover:bg-primary/10 transition-colors">
                View Trailer
              </button>
            </div>
            <code className="text-xs bg-muted p-2 rounded block mt-4">
              {`<button className="text-cinematic text-xl">Watch Now</button>`}
            </code>
          </div>

          {/* Font Sizes */}
          <div className="p-8 bg-card border rounded-lg">
            <h3 className="text-sm font-semibold mb-4 text-muted-foreground">
              .font-display - Various Sizes
            </h3>
            <div className="space-y-2">
              <p className="font-display text-6xl uppercase tracking-widest text-primary">
                CINEMYAR
              </p>
              <p className="font-display text-5xl uppercase tracking-widest text-primary">
                NOW SHOWING
              </p>
              <p className="font-display text-4xl uppercase tracking-wider text-primary">
                Coming Soon
              </p>
              <p className="font-display text-3xl uppercase tracking-wide text-primary">
                Box Office
              </p>
              <p className="font-display text-2xl uppercase text-primary">
                New Releases
              </p>
            </div>
            <code className="text-xs bg-muted p-2 rounded block mt-4">
              {`<h1 className="font-display text-6xl uppercase tracking-widest">CINEMYAR</h1>`}
            </code>
          </div>
        </div>
      </section>

      {/* Body Font - Outfit */}
      <section className="space-y-6 border-t pt-8">
        <h2 className="text-3xl font-display uppercase tracking-widest text-primary">
          Body Font - Outfit
        </h2>
        <p className="text-muted-foreground">
          Clean, modern sans-serif for UI elements and body text
        </p>

        <div className="grid gap-6">
          {/* Headings */}
          <div className="p-8 bg-card border rounded-lg">
            <h3 className="text-sm font-semibold mb-4 text-muted-foreground">
              Headings - Default Font
            </h3>
            <h1 className="text-4xl font-bold mb-2">Heading 1 - 4xl Bold</h1>
            <h2 className="text-3xl font-semibold mb-2">
              Heading 2 - 3xl Semibold
            </h2>
            <h3 className="text-2xl font-semibold mb-2">
              Heading 3 - 2xl Semibold
            </h3>
            <h4 className="text-xl font-medium mb-2">Heading 4 - xl Medium</h4>
            <h5 className="text-lg font-medium mb-2">Heading 5 - lg Medium</h5>
            <h6 className="text-base font-medium">Heading 6 - base Medium</h6>
            <code className="text-xs bg-muted p-2 rounded block mt-4">
              {`<h1 className="text-4xl font-bold">Heading 1</h1>`}
            </code>
          </div>

          {/* Body Text */}
          <div className="p-8 bg-card border rounded-lg">
            <h3 className="text-sm font-semibold mb-4 text-muted-foreground">
              Body Text - Various Weights
            </h3>
            <div className="space-y-4">
              <p className="text-lg font-light">
                Font Weight 300 (Light) - A mind-bending thriller that explores
                the architecture of the subconscious mind.
              </p>
              <p className="text-base font-normal">
                Font Weight 400 (Regular) - A mind-bending thriller that
                explores the architecture of the subconscious mind.
              </p>
              <p className="text-base font-medium">
                Font Weight 500 (Medium) - A mind-bending thriller that explores
                the architecture of the subconscious mind.
              </p>
              <p className="text-base font-semibold">
                Font Weight 600 (Semibold) - A mind-bending thriller that
                explores the architecture of the subconscious mind.
              </p>
              <p className="text-base font-bold">
                Font Weight 700 (Bold) - A mind-bending thriller that explores
                the architecture of the subconscious mind.
              </p>
              <p className="text-base font-extrabold">
                Font Weight 800 (Extrabold) - A mind-bending thriller that
                explores the architecture of the subconscious mind.
              </p>
            </div>
            <code className="text-xs bg-muted p-2 rounded block mt-4">
              {`<p className="text-base font-medium">Body text...</p>`}
            </code>
          </div>

          {/* UI Components */}
          <div className="p-8 bg-card border rounded-lg">
            <h3 className="text-sm font-semibold mb-4 text-muted-foreground">
              UI Components
            </h3>
            <div className="space-y-4">
              <button className="px-6 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90">
                Primary Button
              </button>
              <button className="px-6 py-2 border border-primary text-primary font-medium rounded-lg hover:bg-primary/10">
                Secondary Button
              </button>
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                Badge
              </div>
              <div className="inline-block px-3 py-1 bg-warning/10 text-warning text-sm font-medium rounded ml-2">
                Label
              </div>
            </div>
            <code className="text-xs bg-muted p-2 rounded block mt-4">
              {`<button className="font-medium">Button</button>`}
            </code>
          </div>
        </div>
      </section>

      {/* Monospace Font - JetBrains Mono */}
      <section className="space-y-6 border-t pt-8">
        <h2 className="text-3xl font-display uppercase tracking-widest text-primary">
          Monospace Font - JetBrains Mono
        </h2>
        <p className="text-muted-foreground">
          Perfect for timestamps, ratings, metadata, and technical information
        </p>

        <div className="grid gap-6">
          {/* Movie Metadata */}
          <div className="p-8 bg-card border rounded-lg">
            <h3 className="text-sm font-semibold mb-4 text-muted-foreground">
              Movie Metadata
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-mono text-lg font-medium">2h 28m</span>
                <span className="text-muted-foreground">|</span>
                <span className="font-mono text-lg font-medium text-warning">
                  8.8/10
                </span>
                <span className="text-muted-foreground">|</span>
                <span className="font-mono text-sm">2010</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-base">1h 45m</span>
                <span className="text-muted-foreground">|</span>
                <span className="font-mono text-base text-success">
                  9.2/10
                </span>
                <span className="text-muted-foreground">|</span>
                <span className="font-mono text-sm">2023</span>
              </div>
            </div>
            <code className="text-xs bg-muted p-2 rounded block mt-4">
              {`<span className="font-mono text-lg">2h 28m</span>`}
            </code>
          </div>

          {/* Timestamps & Codes */}
          <div className="p-8 bg-card border rounded-lg">
            <h3 className="text-sm font-semibold mb-4 text-muted-foreground">
              Timestamps & Technical Data
            </h3>
            <div className="space-y-2">
              <p className="font-mono text-xs text-muted-foreground">
                Released: 2023-12-15
              </p>
              <p className="font-mono text-sm">Runtime: 02:28:00</p>
              <p className="font-mono text-base font-medium">ID: MV-2023-4892</p>
              <p className="font-mono text-xs">
                Showtimes: 10:30 | 13:45 | 16:30 | 19:15 | 22:00
              </p>
            </div>
            <code className="text-xs bg-muted p-2 rounded block mt-4">
              {`<span className="font-mono text-sm">Runtime: 02:28:00</span>`}
            </code>
          </div>
        </div>
      </section>

      {/* Real-World Example */}
      <section className="space-y-6 border-t pt-8">
        <h2 className="text-3xl font-display uppercase tracking-widest text-primary">
          Real-World Movie Card Example
        </h2>

        <div className="max-w-sm bg-card border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
          <div className="h-64 bg-gradient-to-br from-primary/20 to-warning/20 flex items-center justify-center">
            <span className="font-display text-6xl text-primary/20">POSTER</span>
          </div>
          <div className="p-6 space-y-4">
            <h3 className="text-movie-title text-3xl text-primary">
              INCEPTION
            </h3>
            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="font-mono text-sm">2h 28m</span>
              <span>|</span>
              <span className="font-mono text-sm text-warning">8.8/10</span>
              <span>|</span>
              <span className="font-mono text-xs">2010</span>
            </div>
            <p className="text-sm leading-relaxed">
              A thief who steals corporate secrets through the use of
              dream-sharing technology is given the inverse task of planting an
              idea into the mind of a C.E.O.
            </p>
            <div className="flex gap-2">
              <button className="flex-1 py-2 bg-primary text-primary-foreground text-cinematic rounded-lg hover:bg-primary/90 transition-colors">
                Watch Now
              </button>
              <button className="flex-1 py-2 border border-primary text-primary font-medium rounded-lg hover:bg-primary/10 transition-colors">
                More Info
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <code className="text-xs">
            {`<h3 className="text-movie-title text-3xl">INCEPTION</h3>
<span className="font-mono text-sm">2h 28m</span>
<p className="text-sm">Description...</p>
<button className="text-cinematic">Watch Now</button>`}
          </code>
        </div>
      </section>

      {/* Font Combination Guide */}
      <section className="space-y-6 border-t pt-8">
        <h2 className="text-3xl font-display uppercase tracking-widest text-primary">
          Font Usage Guide
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-card border rounded-lg">
            <h3 className="font-display text-2xl uppercase mb-3 text-primary">
              Bebas Neue
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Display & Cinematic
            </p>
            <ul className="text-sm space-y-2">
              <li>✓ Logo (CINEMYAR)</li>
              <li>✓ Movie titles</li>
              <li>✓ Hero headers</li>
              <li>✓ CTA buttons</li>
              <li>✓ Section titles</li>
            </ul>
          </div>

          <div className="p-6 bg-card border rounded-lg">
            <h3 className="text-2xl font-semibold mb-3 text-primary">Outfit</h3>
            <p className="text-sm text-muted-foreground mb-3">Body & UI</p>
            <ul className="text-sm space-y-2">
              <li>✓ Body text</li>
              <li>✓ Descriptions</li>
              <li>✓ UI elements</li>
              <li>✓ Navigation</li>
              <li>✓ Forms & labels</li>
            </ul>
          </div>

          <div className="p-6 bg-card border rounded-lg">
            <h3 className="font-mono text-xl mb-3 text-primary">
              JetBrains Mono
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Technical & Data
            </p>
            <ul className="text-sm space-y-2">
              <li>✓ Timestamps</li>
              <li>✓ Ratings (8.8/10)</li>
              <li>✓ Duration (2h 28m)</li>
              <li>✓ Dates & codes</li>
              <li>✓ Metadata</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
