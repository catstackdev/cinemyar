# Agent Guidelines for React Movie App (Frontend)

## 🚀 Quick Commands
```bash
# Build & Quality
pnpm build                    # TypeScript + Vite production build
pnpm typecheck                # TypeScript type checking (no emit)
pnpm lint                     # ESLint (disabled: eslint.config.js.disable)
pnpm format                   # Prettier format (disabled: .prettierrc.disable)
pnpm format:check             # Check formatting without fixing

# Testing
pnpm test                     # Run all Jest tests
pnpm test Button.test.tsx     # Run single test file
pnpm test Button               # Run tests matching "Button" pattern
pnpm test:watch               # Jest in watch mode
pnpm test:coverage            # Coverage report

# Development
pnpm dev                      # Vite dev server (port 3000, NOT 5173!)
pnpm storybook                # Storybook UI dev (port 6006)
```

## 📝 Code Style Essentials

### Component Structure
```typescript
// ComponentName.tsx - Main component file (use forwardRef for UI components)
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, ...props }, ref) => { /* ... */ }
);

// ComponentName.types.ts - TypeScript interfaces
export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: 'primary' | 'secondary';
}

// constants.ts - Constants and mappings
export const BUTTON_VARIANTS: Record<string, string> = { ... };

// ComponentName.test.tsx - Jest + RTL tests
// ComponentName.stories.tsx - Storybook stories
// index.ts - Barrel export: export { Button } from './Button'
```

### Imports & Paths
```typescript
// ALWAYS use import type for types (tree-shaking + verbatimModuleSyntax)
import type { User } from '@/shared/types';
import { cn } from '@/utils/helpers/classNames';
import { authAPI } from '@/api/auth.api';

// @/ alias maps to src/ (configured in vite.config.ts & tsconfig)
// Import order: React → Third-party → @/ imports → Relative imports
```

### TypeScript Strict Mode
```typescript
// All strict options enabled (tsconfig.app.json)
// - noImplicitAny: true
// - strictNullChecks: true
// - noImplicitReturns: true
// - noUncheckedIndexedAccess: true

// Always handle undefined/null explicitly
const user = users[0]; // Type: User | undefined (array access)
if (user) { /* safe to use */ }
```

### Styling with TailwindCSS v4
```typescript
import { cn } from '@/utils/helpers/classNames';

// cn() merges class names with tailwind-merge
<button 
  className={cn(
    'base-classes',
    variant === 'primary' && 'variant-classes',
    size === 'lg' && 'size-classes',
    className  // User's className always last
  )}
/>
```

### Naming Conventions
- **Files**: `PascalCase.tsx` (components), `camelCase.ts` (utils), `kebab-case.css`
- **Variables**: `camelCase` (state, props, functions)
- **Components/Types**: `PascalCase`
- **Constants**: `UPPER_SNAKE_CASE` or `UPPER_CASE`

### Error Handling
```typescript
// Axios interceptor handles API errors automatically (src/lib/axios.ts)
// Just catch errors - toasts are shown automatically!
try {
  const response = await apiClient.post('/auth/login', credentials);
  const user = response.data.data.user;
} catch (error) {
  // Error toast shown automatically by interceptor
  // Only add custom handling if needed
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message; // Backend always provides message
    const code = error.response?.data?.code;       // Optional - for programmatic checks
    
    // Example: Special handling for banned users
    if (code === 'AUTH_FORBIDDEN') {
      navigate('/banned');
    }
  }
}

// Always try-catch for risky operations
try {
  const data = JSON.parse(localStorage.getItem('key') || '{}');
} catch (error) {
  console.error('Error parsing localStorage "key":', error);
  return fallbackValue;
}

// Use ErrorBoundary for component errors
import { ErrorBoundary } from 'react-error-boundary';
```

## 🔐 API Integration

### Cookie-Based Authentication
```typescript
// CRITICAL: Backend (port 3001) uses HTTP-only cookies (no localStorage!)
// apiClient configured with withCredentials: true in src/lib/axios.ts

import { authAPI } from '@/api/auth.api';

// Login - sets cookies automatically
const response = await authAPI.login({ 
  identifier: 'user@email.com',  // Email OR username
  password: 'password' 
});

// Store ONLY accessTokenExpiresAt (not tokens!)
localStorage.setItem('accessTokenExpiresAt', response.accessTokenExpiresAt);
```

### Auto Token Refresh
```typescript
// Axios interceptor handles 401 errors (src/lib/axios.ts)
// Automatically refreshes using refresh_token cookie
// Retries failed request with new access_token

// Setup in main.tsx or App.tsx
setupAxiosInterceptors(showToast, dispatch);
```

### API Response Format
```typescript
// All backend responses follow this structure
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: {  // For paginated responses
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Error responses (also flat structure)
interface ApiError {
  success: false;
  message: string;           // ALWAYS present - show this to users!
  code?: string;             // Optional - e.g., 'AUTH_FORBIDDEN', 'USER_NOT_FOUND'
  details?: string[];        // Optional - for validation errors
  timestamp: string;
}
```

### Key API Endpoints (Backend: localhost:3001)
```typescript
// Auth
POST /auth/login      { identifier, password }     // Sets cookies
POST /auth/register   { username, email?, password }
POST /auth/refresh                                 // Uses cookie
POST /auth/logout                                  // Clears cookies

// Movies
GET  /movies?page=1&limit=20&search=action&genreId=uuid
GET  /movies/:id
POST /admin/movies    { title, description, ... }  // ADMIN only

// Genres
GET  /genres                              // Hierarchical with children
GET  /genres/:idOrSlug
GET  /genres/:idOrSlug/movies?page=1
POST /admin/genres/:id/media             // FormData { type, file }

// Users
GET  /users/profile
PUT  /users/profile
POST /admin/users/:id/ban { reason }     // ADMIN only

// See API_GUIDE.md for full API docs
```

### RBAC & Permissions
```typescript
// User roles: USER, PREMIUM, ADMIN, SUPER_ADMIN
// Dynamic roles: Translator, Reviewer, Publisher, Content Manager, Moderator, Support Admin
// Permission format: entity.action (e.g., 'movie.approve', 'user.ban')

function hasPermission(user: User, permission: string) {
  if (user.role === 'SUPER_ADMIN') return true;
  return user.dynamicRoles?.some(role => 
    role.permissions.includes(permission) || 
    role.permissions.includes(permission.split('.')[0] + '.*')
  );
}

// See API_GUIDE.md for complete RBAC system details
```

## 🎭 State Management

### Redux Toolkit Setup
```typescript
// Store configured in src/store/index.ts
import { useAppDispatch, useAppSelector } from '@/store/hooks';

// Typed hooks (don't use raw useDispatch/useSelector)
const dispatch = useAppDispatch();
const user = useAppSelector(state => state.auth.user);

// Auth slice: src/state/auth/auth.slice.ts
// - Handles login/logout/refresh
// - Stores user & accessTokenExpiresAt
```

### React Query (TanStack Query)
```typescript
// For server state management
import { useQuery, useMutation } from '@tanstack/react-query';

const { data, isLoading } = useQuery({
  queryKey: ['movies', { page, genre }],
  queryFn: () => moviesAPI.getMovies({ page, genre })
});
```

## 🧪 Testing with Jest + RTL

```typescript
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });
});

// Prefer semantic queries
// ✅ getByRole, getByLabelText, getByText
// ❌ getByTestId (use only when semantic queries fail)
```

## 📂 Project Structure

```
src/
├── api/                    # API client functions (auth.api.ts, movies.api.ts)
├── components/             # Reusable UI components
├── contexts/               # React Context providers
├── features/               # Feature-based modules
├── hooks/                  # Custom React hooks
├── layouts/                # Layout components (AppLayout)
├── lib/                    # Third-party lib configs (axios.ts)
├── routes/                 # Route definitions
├── schemas/                # Zod validation schemas
├── shared/                 # Shared types, constants, validation
│   ├── types/             # TypeScript types/interfaces
│   └── validation/        # Zod schemas for API validation
├── state/                  # Redux slices (auth, etc.)
├── store/                  # Redux store config
├── utils/                  # Utility functions
└── main.tsx               # App entry point
```

## 🔒 Security Best Practices

1. **Never store tokens in localStorage** - Use HTTP-only cookies
2. **Always use `withCredentials: true`** - For cookie-based auth
3. **Validate inputs** - Use Zod schemas in `src/shared/validation/`
4. **Handle 403 (ban) errors** - Show reason and logout user
5. **XSS protection** - React escapes by default, avoid `dangerouslySetInnerHTML`

## 💡 Best Practices

1. **Use `import type`** - For all type-only imports
2. **Use `@/` path alias** - For cleaner imports
3. **Prefer composition** - Over prop drilling (use Context)
4. **Memoize expensive computations** - `useMemo`, `useCallback`
5. **Handle loading/error states** - Always show feedback
6. **Use TypeScript strictly** - No `any` types
7. **Test user interactions** - Not implementation details
8. **Semantic HTML** - Use proper elements (`<button>`, `<nav>`)

## 🔗 Key Files

- **API Guide**: `API_GUIDE.md` - Complete backend API documentation
- **Error Handling**: `ERROR_HANDLING.md` - Error handling patterns & error codes
- **Axios Config**: `src/lib/axios.ts` - API client with auto-refresh interceptor
- **Auth API**: `src/api/auth.api.ts` - Authentication functions
- **Auth State**: `src/state/auth/auth.slice.ts` - Redux auth slice
- **App Entry**: `src/main.tsx` - App initialization
- **Env Config**: `.env.example` - Environment variables

## 📌 Quick Reference

- **Package Manager**: pnpm only (not npm/yarn)
- **Dev Port**: 3000 (Vite), NOT default 5173!
- **Backend API**: http://localhost:3001
- **Backend Swagger**: http://localhost:3001/api/docs
- **Storybook**: http://localhost:6006
- **Path Alias**: `@/` → `src/`
- **Styling**: TailwindCSS v4 + `cn()` utility
- **State**: Redux Toolkit + React Query
- **Forms**: React Hook Form + Zod validation
- **Testing**: Jest + React Testing Library

## ⚠️ Common Pitfalls

1. **Type imports**: MUST use `import type` (verbatimModuleSyntax enforced)
2. **Array access**: Always returns `T | undefined` (noUncheckedIndexedAccess)
3. **Tokens**: NEVER store in localStorage - cookies only!
4. **Port**: Dev server is 3000, NOT Vite's default 5173
5. **forwardRef**: Required for reusable UI components
6. **cn()**: Always use for conditional classes (don't manually concatenate)
7. **Error handling**: Axios interceptor shows toasts automatically - don't duplicate!
8. **API errors**: Use `error.response?.data?.message` (always present) not error codes
