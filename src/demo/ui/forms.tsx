import { Checkbox, Radio, Switch } from "@/components/ui";
import { useState } from "react";

export const FormsDemo = () => {
  const [agreed, setAgreed] = useState(false);
  const [plan, setPlan] = useState("free");
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-8 max-w-4xl p-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">Form Controls</h2>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">Checkboxes</h3>
        
        <div className="space-y-3">
          <Checkbox label="I agree to the terms and conditions" />
          <Checkbox label="Subscribe to newsletter" defaultChecked />
          <Checkbox label="Disabled checkbox" disabled />
          <Checkbox label="Disabled and checked" disabled defaultChecked />
          <Checkbox 
            label="With error" 
            error="You must agree to continue" 
          />
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Sizes</h4>
          <div className="flex items-center gap-4">
            <Checkbox label="Small" size="sm" />
            <Checkbox label="Medium" size="md" />
            <Checkbox label="Large" size="lg" />
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Controlled</h4>
          <Checkbox 
            label="I agree to the terms and conditions"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <p className="text-sm text-muted-foreground">
            Status: {agreed ? "Agreed" : "Not agreed"}
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">Radio Buttons</h3>
        
        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold mb-2">Choose a plan</legend>
          <Radio 
            name="plan"
            label="Free"
            description="Basic features only"
            value="free"
            checked={plan === "free"}
            onChange={(e) => setPlan(e.target.value)}
          />
          <Radio 
            name="plan"
            label="Pro"
            description="All features plus priority support"
            value="pro"
            checked={plan === "pro"}
            onChange={(e) => setPlan(e.target.value)}
          />
          <Radio 
            name="plan"
            label="Enterprise"
            description="Custom solutions for your business"
            value="enterprise"
            checked={plan === "enterprise"}
            onChange={(e) => setPlan(e.target.value)}
          />
        </fieldset>

        <p className="text-sm text-muted-foreground">
          Selected plan: <strong className="capitalize">{plan}</strong>
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">Switches</h3>
        
        <div className="space-y-3">
          <Switch label="Email notifications" />
          <Switch label="Push notifications" defaultChecked />
          <Switch label="Disabled switch" disabled />
          <Switch label="Disabled and on" disabled defaultChecked />
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Sizes</h4>
          <div className="space-y-2">
            <Switch label="Small switch" size="sm" />
            <Switch label="Medium switch" size="md" />
            <Switch label="Large switch" size="lg" />
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Controlled</h4>
          <Switch 
            label="Enable notifications"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
          />
          <p className="text-sm text-muted-foreground">
            Notifications are: {notifications ? "ON" : "OFF"}
          </p>
        </div>
      </section>
    </div>
  );
};
