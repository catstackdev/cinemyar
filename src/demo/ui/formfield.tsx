import { FormField } from "@/components/ui";

export const FormFieldDemo = () => {
  return (
    <div className="space-y-12 max-w-4xl p-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">
          FormField - Reusable Layout System
        </h2>

        {/* NEW API: FormField.Root with FormField.Input */}
        <section className="space-y-6 mb-12">
          <h3 className="text-xl font-semibold text-foreground border-b pb-2">
            New Clean API - FormField.Input & FormField.Textarea
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stacked Input */}
            <FormField.Root
              name="new-email"
              layout="stacked"
              error="Description is required"
            >
              <FormField.Label>Email (Stacked)</FormField.Label>
              <FormField.Input type="email" placeholder="you@example.com" />
              <FormField.Error icon />
            </FormField.Root>

            {/* Floating Input */}
            <FormField.Root name="new-floating" layout="floating">
              <FormField.Input type="text" />
              <FormField.Label>Name (Floating)</FormField.Label>
            </FormField.Root>

            {/* Horizontal Input */}
            <FormField.Root
              name="new-horizontal"
              layout="horizontal"
              error="Description is required"
            >
              <FormField.Label>Username</FormField.Label>
              <div>
                <FormField.Input type="text" placeholder="johndoe" />
                <FormField.Error icon />
              </div>
            </FormField.Root>

            {/* Input with Error */}
            <FormField.Root
              name="new-error"
              layout="floating"
              error="Invalid email format"
            >
              <FormField.Input type="email" />
              <FormField.Label required>Email</FormField.Label>
              <FormField.Error icon />
            </FormField.Root>

            {/* Stacked Textarea */}
            <FormField.Root name="bio-stacked">
              <FormField.Label>Bio (Stacked)</FormField.Label>
              <FormField.Textarea
                rows={4}
                placeholder="Tell us about yourself..."
              />
            </FormField.Root>

            {/* Horizontal Textarea */}
            <FormField.Root
              name="bio-horizontal"
              layout="horizontal"
              labelWidth="100px"
            >
              <FormField.Label>Notes</FormField.Label>
              <FormField.Textarea rows={3} placeholder="Add notes..." />
            </FormField.Root>

            {/* Textarea with Error */}
            <FormField.Root name="bio-error" error="Description is required">
              <FormField.Label required>Description</FormField.Label>
              <FormField.Textarea rows={3} />
              <FormField.Error />
            </FormField.Root>

            {/* Disabled Input */}
            <FormField.Root name="disabled-input" disabled>
              <FormField.Label>Read Only</FormField.Label>
              <FormField.Input value="Cannot edit" readOnly />
            </FormField.Root>
          </div>
        </section>

        {/* Input Component (backward compatible) */}
        {/* <section className="space-y-6 mb-12"> */}
        {/*   <h3 className="text-xl font-semibold text-foreground border-b pb-2"> */}
        {/*     Input Component (Uses FormField Internally - Backward Compatible) */}
        {/*   </h3> */}
        {/**/}
        {/*   <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
        {/*     <Input.Root name="input-stacked"> */}
        {/*       <Input.Label>Stacked Layout</Input.Label> */}
        {/*       <Input.Field placeholder="Default stacked" /> */}
        {/*     </Input.Root> */}
        {/**/}
        {/*     <Input.Root name="input-floating" layout="floating"> */}
        {/*       <Input.Label>Floating Label</Input.Label> */}
        {/*       <Input.Field /> */}
        {/*     </Input.Root> */}
        {/**/}
        {/*     <Input.Root name="input-horizontal" layout="horizontal"> */}
        {/*       <Input.Label>Horizontal</Input.Label> */}
        {/*       <Input.Field placeholder="Side by side" /> */}
        {/*     </Input.Root> */}
        {/**/}
        {/*     <Input.Root */}
        {/*       name="input-error" */}
        {/*       layout="floating" */}
        {/*       error="Invalid input" */}
        {/*     > */}
        {/*       <Input.Label required>With Error</Input.Label> */}
        {/*       <Input.Field /> */}
        {/*       <Input.Error /> */}
        {/*     </Input.Root> */}
        {/*   </div> */}
        {/* </section> */}

        {/* FormField.Control for custom elements */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-foreground border-b pb-2">
            FormField.Control (Custom Elements)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Custom select with FormField.Control */}
            <FormField.Root name="custom-select" layout="stacked">
              <FormField.Label required>
                Country (Custom Select)
              </FormField.Label>
              <FormField.Control>
                <select
                  name="custom-select"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">Select country...</option>
                  <option value="us">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="ca">Canada</option>
                </select>
              </FormField.Control>
            </FormField.Root>

            {/* Custom control with error */}
            <FormField.Root
              name="custom-error"
              layout="stacked"
              error="This field is required"
            >
              <FormField.Label required>Custom Input</FormField.Label>
              <FormField.Control>
                <input
                  type="text"
                  name="custom-error"
                  className="w-full px-3 py-2 border border-danger rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-danger/20 focus:border-danger"
                />
              </FormField.Control>
              <FormField.Error icon />
            </FormField.Root>
          </div>
        </section>
      </div>
    </div>
  );
};
