# Agent Guidelines for React Movie App

## Build/Lint/Test Commands
- **Build**: `pnpm run build` (TypeScript compilation + Vite build)
- **Lint**: `pnpm run lint` (ESLint with React + TypeScript rules - currently disabled as eslint.config.js.disable)
- **Typecheck**: `pnpm run typecheck` (Run TypeScript compiler without emitting files)
- **Single Test**: `pnpm test Button.test.tsx` (Jest with React Testing Library)
- **Test Watch**: `pnpm run test:watch` (Jest in watch mode)
- **Test Coverage**: `pnpm run test:coverage` (Jest with coverage report)
- **Dev Server**: `pnpm run dev` (Vite dev server with HMR on port 5173)
- **Storybook**: `pnpm run storybook` (Component development environment on port 6006)

## Code Style Guidelines

### React Components
- **Structure**: Component in `ComponentName.tsx`, types in `.types.ts`, tests in `.test.tsx`, constants in `constants.ts`, stories in `.stories.tsx`
- **Props**: Use TypeScript interfaces extending `React.ComponentPropsWithoutRef<"element">` (e.g., `React.ComponentPropsWithoutRef<"span">`)
- **Exports**: Default export for components, named exports for types/utilities/constants
- **Polymorphic**: Support `as` prop for element customization when applicable (advanced components only)
- **No comments**: DO NOT add code comments unless explicitly requested

### TypeScript
- **Strict mode**: All strict options enabled (`noImplicitAny`, `strictNullChecks`, `strictFunctionTypes`, `noImplicitReturns`, `noUncheckedIndexedAccess`)
- **Imports**: Use `import type` for type-only imports to improve tree-shaking
- **Paths**: Use `@/` alias for absolute imports from src (e.g., `import { cn } from "@/utils/helpers/classNames"`)
- **Types**: Define in separate `.types.ts` files, use union types for variants/sizes/states
- **Generics**: Use descriptive names, prefer constraints for type safety (e.g., `<T extends string>`)

### Styling & Naming
- **CSS**: TailwindCSS v4 with `cn()` utility from `@/utils/helpers/classNames` (clsx + tailwind-merge)
- **Class organization**: Base classes → variant classes → size classes → custom className prop (always spread last)
- **Files**: PascalCase for components (`Button.tsx`), camelCase for utilities (`formatters.ts`), kebab-case for CSS
- **Variables**: camelCase for React state/props/functions, PascalCase for components/types, UPPER_CASE for constants
- **Constants**: Export as `Record<Type, string>` for variant/size mappings (see `Badge/constants.ts`)

### Error Handling
- **Try-catch**: Wrap localStorage, API calls, and risky operations in try-catch with console.error
- **Error messages**: Include context (e.g., `Error reading localStorage key "${key}"`)
- **Fallbacks**: Always provide fallback values for failed operations (e.g., return initialValue on localStorage error)
- **Boundary**: Use ErrorBoundary component from `@/components/common/ErrorBoundary` for component-level error handling

### Testing
- **Imports**: Import from `@testing-library/react` and `@testing-library/jest-dom`
- **Structure**: Use `describe` blocks, prefix tests with "it" (e.g., `it("renders children correctly")`)
- **Matchers**: Use jest-dom matchers (`toBeInTheDocument`, `toHaveClass`, `toHaveTextContent`)
- **Test IDs**: Use `data-testid` for complex queries, prefer semantic queries (`getByRole`, `getByLabelText`)
