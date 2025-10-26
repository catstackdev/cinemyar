import { Input } from "@/components/ui";

export const InputDemo = () => {
  return (
    <div className="space-y-12 max-w-4xl p-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Input Components - All Layouts
        </h2>

        {/* Stacked Layout (Default) */}
        <section className="space-y-6 mb-12">
          <h3 className="text-xl font-semibold text-foreground border-b pb-2">
            Stacked Layout (Default)
          </h3>

          <Input.Root name="stacked-username">
            <Input.Label>Username</Input.Label>
            <Input.Field placeholder="Enter username" />
          </Input.Root>

          <Input.Root name="stacked-email" error="Invalid email format">
            <Input.Label required>Email</Input.Label>
            <Input.Field type="email" placeholder="you@example.com" />
            <Input.Error />
          </Input.Root>

          <Input.Root name="stacked-password">
            <Input.Label>Password</Input.Label>
            <Input.Field type="password" placeholder="••••••••" />
            <Input.Error icon>Must be at least 8 characters</Input.Error>
          </Input.Root>

          <Input.Root name="stacked-disabled" disabled>
            <Input.Label>Disabled Field</Input.Label>
            <Input.Field value="Cannot edit" readOnly />
          </Input.Root>
        </section>

        {/* Floating Layout */}
        <section className="space-y-6 mb-12">
          <h3 className="text-xl font-semibold text-foreground border-b pb-2">
            Floating Label Layout
          </h3>

          <Input.Root name="floating-name" layout="floating">
            <Input.Label>Full Name</Input.Label>
            <Input.Field />
          </Input.Root>

          <Input.Root name="floating-email" layout="floating" error="Invalid email">
            <Input.Label required>Email Address</Input.Label>
            <Input.Field type="email" />
            <Input.Error />
          </Input.Root>

          <Input.Root name="floating-phone" layout="floating">
            <Input.Label>Phone Number</Input.Label>
            <Input.Field type="tel" />
          </Input.Root>

          <Input.Root name="floating-disabled" layout="floating" disabled>
            <Input.Label>Disabled</Input.Label>
            <Input.Field value="Read only value" readOnly />
          </Input.Root>
        </section>

        {/* Horizontal Layout */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-foreground border-b pb-2">
            Horizontal Layout
          </h3>

          <Input.Root name="horizontal-username" layout="horizontal">
            <Input.Label>Username</Input.Label>
            <Input.Field placeholder="Enter username" />
          </Input.Root>

          <Input.Root name="horizontal-email" layout="horizontal" error="Required field">
            <Input.Label required>Email</Input.Label>
            <Input.Field type="email" placeholder="you@example.com" />
            <Input.Error />
          </Input.Root>

          <Input.Root name="horizontal-country" layout="horizontal" labelWidth="150px">
            <Input.Label>Country Code</Input.Label>
            <Input.Field placeholder="+1" />
          </Input.Root>

          <Input.Root name="horizontal-disabled" layout="horizontal" disabled>
            <Input.Label>Status</Input.Label>
            <Input.Field value="Inactive" readOnly />
          </Input.Root>
        </section>
      </div>
    </div>
  );
};
