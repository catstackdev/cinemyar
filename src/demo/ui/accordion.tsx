import { Accordion } from "@/components/ui";

export const AccordionDemo = () => {
  const basicItems = [
    {
      id: "item-1",
      title: "What is React?",
      content:
        'React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".',
    },
    {
      id: "item-2",
      title: "What is TypeScript?",
      content:
        "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. It adds optional static typing to JavaScript.",
    },
    {
      id: "item-3",
      title: "What is Vite?",
      content:
        "Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects. It consists of a dev server and a build command.",
    },
  ];

  const featureItems = [
    {
      id: "feature-1",
      title: "Component Library",
      content:
        "This template includes a comprehensive component library with 23+ production-ready components including buttons, forms, modals, tabs, accordions, and more.",
    },
    {
      id: "feature-2",
      title: "Dark Mode Support",
      content:
        "Full dark mode support is built-in with a theme toggle. All components automatically adapt to light and dark themes using Tailwind's dark mode utilities.",
    },
    {
      id: "feature-3",
      title: "TypeScript",
      content:
        "Written in TypeScript with strict type checking enabled. All components are fully typed with comprehensive interfaces and type definitions.",
    },
    {
      id: "feature-4",
      title: "Accessibility",
      content:
        "Components follow WAI-ARIA patterns and best practices. Includes proper ARIA attributes, keyboard navigation, and screen reader support.",
    },
  ];

  const faqItems = [
    {
      id: "faq-1",
      title: "How do I install this template?",
      content: (
        <div className="space-y-2">
          <p>Clone the repository and install dependencies:</p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
            <code>git clone [repo-url]</code>
            <br />
            <code>cd react-base-template</code>
            <br />
            <code>pnpm install</code>
          </pre>
        </div>
      ),
    },
    {
      id: "faq-2",
      title: "What scripts are available?",
      content: (
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">pnpm dev</code> - Start development server
          </li>
          <li>
            <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">pnpm build</code> - Build for production
          </li>
          <li>
            <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">pnpm lint</code> - Run ESLint
          </li>
          <li>
            <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">pnpm test</code> - Run tests
          </li>
          <li>
            <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">pnpm storybook</code> - Launch Storybook
          </li>
        </ul>
      ),
    },
    {
      id: "faq-3",
      title: "Can I customize the components?",
      content: (
        <div>
          <p className="mb-2">Yes! All components are designed to be easily customizable. You can:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Pass custom className props to override styles</li>
            <li>Modify the component source files directly</li>
            <li>Update the Tailwind configuration</li>
            <li>Extend components with additional features</li>
          </ul>
        </div>
      ),
    },
    {
      id: "faq-4",
      title: "Is this template production-ready?",
      content: (
        <div>
          <p className="mb-2">Yes! This template is production-ready and includes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Full TypeScript support with strict mode</li>
            <li>Comprehensive testing setup</li>
            <li>ESLint and Prettier configuration</li>
            <li>Optimized build configuration</li>
            <li>Accessibility best practices</li>
            <li>Dark mode support</li>
          </ul>
        </div>
      ),
    },
  ];

  const stepItems = [
    {
      id: "step-1",
      title: "Step 1: Create Account",
      content: "Fill out the registration form with your email and password to create a new account.",
    },
    {
      id: "step-2",
      title: "Step 2: Verify Email",
      content: "Check your inbox for a verification email and click the confirmation link.",
    },
    {
      id: "step-3",
      title: "Step 3: Complete Profile",
      content: "Add your personal information and preferences to complete your profile setup.",
    },
  ];

  return (
    <div className="space-y-8 max-w-4xl p-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">Accordion Component</h2>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">Single Mode (Default)</h3>
        <p className="text-sm text-muted-foreground mb-4">Only one item can be open at a time</p>
        <Accordion items={basicItems} />
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">Multiple Mode</h3>
        <p className="text-sm text-muted-foreground mb-4">Multiple items can be open simultaneously</p>
        <Accordion items={featureItems} allowMultiple />
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">FAQ Example</h3>
        <Accordion items={faqItems} />
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">With Default Open Item</h3>
        <Accordion items={stepItems} defaultOpen={["step-1"]} />
      </section>
    </div>
  );
};
