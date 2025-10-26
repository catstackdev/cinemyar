import { Badge } from "@/components/ui";

export const BadgeDemo = () => {
  return (
    <div className="space-y-8 max-w-4xl p-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">Badge Component</h2>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">Variants</h3>
        <div className="flex flex-wrap gap-3">
          <Badge variant="default">Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">Sizes</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">Use Cases</h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-foreground">Status:</span>
            <Badge variant="success">Active</Badge>
            <Badge variant="warning">Pending</Badge>
            <Badge variant="danger">Inactive</Badge>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-foreground">Categories:</span>
            <Badge variant="primary">React</Badge>
            <Badge variant="primary">TypeScript</Badge>
            <Badge variant="primary">Vite</Badge>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-foreground">Notifications:</span>
            <Badge variant="danger">3 new</Badge>
            <Badge variant="info">12 unread</Badge>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">With Numbers</h3>
        <div className="flex flex-wrap gap-3">
          <Badge variant="danger">99+</Badge>
          <Badge variant="info">42</Badge>
          <Badge variant="success">✓ 5</Badge>
        </div>
      </section>
    </div>
  );
};
