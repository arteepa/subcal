### Tech Migration Plan

## Tech Stack
- **Nuxt 3** with Vue 3 Composition API and TypeScript (strict mode with type checking enabled)
- **Pinia** for state management with composable-style stores
- **TailwindCSS** for styling with extensive custom configuration
- **@headlessui/vue** and **@heroicons/vue** for accessible UI components

## Project Structure
```
/components/common/     # Reusable UI (Modal, Toast, LoadingSpinner, etc.)
/components/[feature]/  # Feature-specific components
/composables/           # Composition API logic (use[Feature].ts pattern)
/stores/               # Pinia stores (ui.ts, etc.)
/utils/                # Pure functions (formatters, validators, errors)
/types/                # TypeScript type definitions
/constants/            # Configuration constants
/assets/css/           # Global styles (main.css with @layer base/components)
/assets/fonts/         # Local font files (woff2/woff)
/pages/                # File-based routing
/layouts/              # Layout components (default.vue)
```

## Code Style
- **Composition API** with `<script setup>` syntax
- **Composable pattern**: Shared reactive state with `const state = ref()` at module level
- **Pinia stores**: Setup function style with explicit return object
- **TypeScript**: Strict mode, explicit interfaces/types in separate `/types` directory
- **Naming**: camelCase for variables/functions, PascalCase for components, UPPERCASE for constants
- **State helpers**: Dedicated methods like `showSuccess()`, `showError()`, etc. in UI store

## Build & Deploy
- **Runtime config**: Environment variables via `runtimeConfig.public` in `nuxt.config.ts`
- **Nitro**: Memory cache driver, optimized public assets (7-day cache)
- **Docker**: Containerized deployment ready
- **Scripts**: Deploy scripts for staging/production environments

## Key Features to Include
- Toast notification system with auto-dismiss
- Modal management through UI store
- Responsive mobile-first design with desktop breakpoints at 768px
- Loading states with spinner components
- Error handling with user-friendly messages