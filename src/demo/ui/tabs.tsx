import { Tabs, Card, Badge } from "@/components/ui";

export const TabsDemo = () => {
  const basicTabs = [
    {
      id: "tab1",
      label: "Profile",
      content: (
        <Card>
          <h3 className="text-lg font-semibold mb-2">Profile Information</h3>
          <p className="text-muted-foreground">
            View and manage your profile details here.
          </p>
        </Card>
      ),
    },
    {
      id: "tab2",
      label: "Settings",
      content: (
        <Card>
          <h3 className="text-lg font-semibold mb-2">Settings</h3>
          <p className="text-muted-foreground">
            Configure your account preferences and privacy settings.
          </p>
        </Card>
      ),
    },
    {
      id: "tab3",
      label: "About",
      content: (
        <Card>
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p className="text-muted-foreground">
            Learn more about this application and its features.
          </p>
        </Card>
      ),
    },
  ];

  const messageTabs = [
    {
      id: "inbox",
      label: "Inbox (3)",
      content: (
        <Card>
          <h3 className="text-lg font-semibold mb-4">Inbox Messages</h3>
          <div className="space-y-2">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
              <div className="font-medium">New message from Alice</div>
              <div className="text-sm text-muted-foreground">2 minutes ago</div>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
              <div className="font-medium">Project update</div>
              <div className="text-sm text-muted-foreground">1 hour ago</div>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
              <div className="font-medium">Meeting reminder</div>
              <div className="text-sm text-muted-foreground">3 hours ago</div>
            </div>
          </div>
        </Card>
      ),
    },
    {
      id: "sent",
      label: "Sent",
      content: (
        <Card>
          <h3 className="text-lg font-semibold mb-4">Sent Messages</h3>
          <p className="text-muted-foreground">No sent messages yet.</p>
        </Card>
      ),
    },
    {
      id: "drafts",
      label: "Drafts (1)",
      content: (
        <Card>
          <h3 className="text-lg font-semibold mb-4">Draft Messages</h3>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
            <div className="font-medium">Untitled draft</div>
            <div className="text-sm text-muted-foreground">Last edited yesterday</div>
          </div>
        </Card>
      ),
    },
  ];

  const docTabs = [
    {
      id: "overview",
      label: "Overview",
      content: (
        <Card>
          <h3 className="text-lg font-semibold mb-2">Overview</h3>
          <p className="text-muted-foreground mb-4">
            The Tabs component allows you to organize content into separate views where only one view is visible at a time.
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Badge variant="success">✓</Badge>
              <span>Keyboard navigation support</span>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="success">✓</Badge>
              <span>Accessible by default</span>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="success">✓</Badge>
              <span>Fully customizable styling</span>
            </div>
          </div>
        </Card>
      ),
    },
    {
      id: "installation",
      label: "Installation",
      content: (
        <Card>
          <h3 className="text-lg font-semibold mb-2">Installation</h3>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm overflow-x-auto">
            <code>{`import { Tabs } from "@/components/ui";`}</code>
          </pre>
        </Card>
      ),
    },
    {
      id: "usage",
      label: "Usage",
      content: (
        <Card>
          <h3 className="text-lg font-semibold mb-2">Usage Example</h3>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm overflow-x-auto">
{`<Tabs 
  items={[
    { id: "tab1", label: "Tab 1", content: "Content 1" },
    { id: "tab2", label: "Tab 2", content: "Content 2" }
  ]} 
/>`}
          </pre>
        </Card>
      ),
    },
    {
      id: "api",
      label: "API",
      content: (
        <Card>
          <h3 className="text-lg font-semibold mb-2">API Reference</h3>
          <div className="space-y-3">
            <div>
              <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">items</code>
              <p className="text-sm text-muted-foreground mt-1">Array of tab items with id, label, and content</p>
            </div>
            <div>
              <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">defaultTab</code>
              <p className="text-sm text-muted-foreground mt-1">The ID of the tab that should be active by default</p>
            </div>
            <div>
              <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">onChange</code>
              <p className="text-sm text-muted-foreground mt-1">Callback when the active tab changes</p>
            </div>
          </div>
        </Card>
      ),
    },
  ];

  return (
    <div className="space-y-8 max-w-4xl p-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">Tabs Component</h2>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">Basic Tabs</h3>
        <Tabs items={basicTabs} defaultTab="tab1" />
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">With Badges</h3>
        <Tabs items={messageTabs} defaultTab="inbox" />
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">Documentation Tabs</h3>
        <Tabs items={docTabs} defaultTab="overview" />
      </section>
    </div>
  );
};
