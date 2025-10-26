import Loading from './Loading';

/**
 * Test component to verify all skeleton types are visible
 * 
 * Usage: Import this component and render it to see all skeleton variations
 */
export default function LoadingTest() {
  return (
    <div className="p-8 space-y-8 bg-background text-foreground">
      <div>
        <h2 className="text-xl font-bold mb-4">Skeleton Text</h2>
        <div className="border border-border p-4 rounded">
          <Loading 
            type="skeleton-text" 
            count={3} 
            textWidths={["100%", "80%", "60%"]}
            skeletonVariant="default"
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Skeleton Text (Muted)</h2>
        <div className="border border-border p-4 rounded">
          <Loading 
            type="skeleton-text" 
            count={3} 
            textWidths={["100%", "90%", "70%"]}
            skeletonVariant="muted"
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Skeleton Text (Subtle)</h2>
        <div className="border border-border p-4 rounded">
          <Loading 
            type="skeleton-text" 
            count={3} 
            textWidths={["100%", "85%", "65%"]}
            skeletonVariant="subtle"
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Skeleton Rectangle (Cards)</h2>
        <div className="border border-border p-4 rounded">
          <Loading 
            type="skeleton-rect" 
            count={2}
            skeletonVariant="default"
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Skeleton Circular (Avatars)</h2>
        <div className="border border-border p-4 rounded flex gap-4">
          <Loading 
            type="skeleton-circular" 
            size="xl" 
            count={3}
            skeletonVariant="default"
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Complete Example (User Profile)</h2>
        <div className="border border-border p-6 rounded space-y-4">
          {/* Avatar */}
          <div className="flex justify-center">
            <Loading 
              type="skeleton-circular" 
              size="xl" 
              count={1}
              skeletonVariant="default"
            />
          </div>
          
          {/* Name and bio */}
          <Loading 
            type="skeleton-text" 
            count={3} 
            textWidths={["60%", "100%", "80%"]}
            skeletonVariant="subtle"
          />
          
          {/* Stats cards */}
          <div className="grid grid-cols-2 gap-4">
            <Loading 
              type="skeleton-rect" 
              count={2}
              skeletonVariant="muted"
            />
          </div>
          
          {/* Activity */}
          <Loading 
            type="skeleton-text" 
            count={4}
            textWidths={["100%", "100%", "100%", "85%"]}
            skeletonVariant="default"
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Different Sizes</h2>
        <div className="border border-border p-4 rounded space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Extra Small (xs)</p>
            <Loading type="skeleton-text" size="xs" count={2} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Small (sm)</p>
            <Loading type="skeleton-text" size="sm" count={2} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Medium (md - default)</p>
            <Loading type="skeleton-text" size="md" count={2} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Large (lg)</p>
            <Loading type="skeleton-text" size="lg" count={2} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Extra Large (xl)</p>
            <Loading type="skeleton-text" size="xl" count={2} />
          </div>
        </div>
      </div>
    </div>
  );
}
