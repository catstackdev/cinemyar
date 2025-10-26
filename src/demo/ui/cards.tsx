import { Card, Badge, Button } from "@/components/ui";

export const CardDemo = () => {
  return (
    <div className="space-y-8 max-w-4xl p-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">Card Component</h2>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">Basic Cards</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <h3 className="text-lg font-semibold mb-2">Simple Card</h3>
            <p className="text-muted-foreground">
              This is a basic card with some content.
            </p>
          </Card>

          <Card className="border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-2">Bordered Card</h3>
            <p className="text-muted-foreground">
              This card has a visible border.
            </p>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">Interactive Cards</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="transition-shadow hover:shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Hoverable</h3>
            <p className="text-sm text-muted-foreground">
              Hover over this card to see the effect.
            </p>
          </Card>

          <Card className="cursor-pointer" onClick={() => alert('Card clicked!')}>
            <h3 className="text-lg font-semibold mb-2">Clickable</h3>
            <p className="text-sm text-muted-foreground">
              Click this card to trigger an action.
            </p>
          </Card>

          <Card className="transition-shadow hover:shadow-lg cursor-pointer" onClick={() => alert('Both!')}>
            <h3 className="text-lg font-semibold mb-2">Both</h3>
            <p className="text-sm text-muted-foreground">
              Hover and click effects combined.
            </p>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">Product Cards</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="transition-shadow hover:shadow-lg">
            <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-md mb-4 flex items-center justify-center">
              <span className="text-muted-foreground">Image</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Product Name</h3>
                <Badge variant="success">New</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Brief product description goes here.
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-lg font-bold">$99.99</span>
                <Button size="sm">Add to Cart</Button>
              </div>
            </div>
          </Card>

          <Card className="transition-shadow hover:shadow-lg">
            <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-md mb-4 flex items-center justify-center">
              <span className="text-muted-foreground">Image</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Another Product</h3>
                <Badge variant="danger">Sale</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Brief product description goes here.
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-lg font-bold">$79.99</span>
                <Button size="sm">Add to Cart</Button>
              </div>
            </div>
          </Card>

          <Card className="transition-shadow hover:shadow-lg">
            <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-md mb-4 flex items-center justify-center">
              <span className="text-muted-foreground">Image</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Third Product</h3>
                <Badge variant="warning">Limited</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Brief product description goes here.
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-lg font-bold">$129.99</span>
                <Button size="sm">Add to Cart</Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">Profile Card</h3>
        
        <Card className="max-w-sm">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-2xl">👤</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">John Doe</h3>
              <p className="text-sm text-muted-foreground mb-2">Software Engineer</p>
              <div className="flex gap-2">
                <Badge variant="primary" size="sm">React</Badge>
                <Badge variant="primary" size="sm">TypeScript</Badge>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-around text-center">
              <div>
                <div className="text-xl font-bold">128</div>
                <div className="text-xs text-muted-foreground">Posts</div>
              </div>
              <div>
                <div className="text-xl font-bold">1.2k</div>
                <div className="text-xs text-muted-foreground">Followers</div>
              </div>
              <div>
                <div className="text-xl font-bold">342</div>
                <div className="text-xs text-muted-foreground">Following</div>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};
