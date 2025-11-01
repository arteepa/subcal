# Migration from Vanilla JS to Nuxt 3

This document outlines the migration from the original vanilla JavaScript application to a modern Nuxt 3 application.

## 🔄 What Changed

### Architecture

**Before (Vanilla JS):**
- Plain HTML, CSS, and JavaScript
- Class-based components
- Manual DOM manipulation
- Global state via class instances

**After (Nuxt 3):**
- Vue 3 with Composition API
- TypeScript with strict mode
- Reactive state management with Pinia
- Component-based architecture with `<script setup>`

### File Structure Mapping

| Old Path | New Path | Notes |
|----------|----------|-------|
| `index.html` | `pages/index.vue` | Landing page as Vue component |
| `panorama.html` | `pages/panorama.vue` | Calendar view as Vue component |
| `js/main.js` | `components/landing/*` | Split into Hero, Features, HowItWorks |
| `js/calendar.js` | `composables/useCalendar.ts` | Composable with reactive state |
| `js/config.js` | `constants/config.ts` | Type-safe configuration |
| `css/styles.css` | `assets/css/main.css` + `tailwind.config.ts` | TailwindCSS with custom theme |

### Key Improvements

1. **Type Safety**: Full TypeScript coverage with strict mode
2. **State Management**: Pinia store for UI state (toasts, modals)
3. **Composables**: Reusable logic with `useCalendar()` and `useSubscription()`
4. **Component Library**: HeadlessUI for accessible modals and transitions
5. **Build Optimization**: Nitro server with automatic code splitting
6. **Developer Experience**: Hot module replacement, TypeScript checking, better error handling

## 📦 Installation

```bash
# Install all dependencies
npm install
```

This will install:
- Nuxt 3 core framework
- Vue 3 and Vue Router
- Pinia for state management
- TailwindCSS for styling
- HeadlessUI for accessible components
- TypeScript support

## 🚀 Running the App

### Development Mode

```bash
npm run dev
```

By default, this runs in development mode and loads calendar data from the local `example.ics` file.

### Production Mode

To test with remote calendar URLs:

```bash
NODE_ENV=production npm run dev
```

Or create a `.env` file:

```bash
NUXT_PUBLIC_DEVELOPMENT_MODE=false
```

## 🏗️ Building for Production

```bash
# Build the application
npm run build

# Preview the build
npm run preview
```

## 🔧 Configuration

### Calendar Settings

Edit `/constants/config.ts`:

```typescript
export const DEFAULT_USER_CONFIG: UserConfig = {
  username: 'Your Name',
  calendar: {
    webCalUrl: 'webcal://your-calendar-url.ics',
    httpUrl: 'https://your-calendar-url.ics',
    name: 'Calendar Name',
    description: 'Calendar Description'
  },
  settings: {
    developmentMode: true
  }
}
```

### Environment Variables

Create a `.env` file (see `.env.example`):

```bash
NODE_ENV=development
NUXT_PUBLIC_DEVELOPMENT_MODE=true
```

## 🎨 Styling

The design system is preserved from the original app:

- **Colors**: Same accent color (`#FFAB3D`), black backgrounds
- **Typography**: InstrumentSans font maintained
- **Layout**: Identical spacing and component styles
- **Animations**: All transitions preserved

TailwindCSS configuration in `tailwind.config.ts` includes all custom colors and utilities.

## 📱 Components

### Common Components

- `Button.vue` - Reusable button with variants (primary, secondary, outline)
- `Modal.vue` - Accessible modal using HeadlessUI
- `Toast.vue` - Toast notifications with auto-dismiss
- `LoadingSpinner.vue` - Loading indicator

### Feature Components

- `landing/Hero.vue` - Hero section
- `landing/Features.vue` - Features grid
- `landing/HowItWorks.vue` - Steps section
- `calendar/EventCard.vue` - Individual event display
- `calendar/SubscriptionModal.vue` - Calendar subscription flow

## 🔌 Composables

### `useCalendar()`

Manages calendar data and event loading:

```typescript
const { 
  events,           // All events
  upcomingEvents,   // Filtered upcoming events
  metadata,         // Calendar metadata
  isLoading,        // Loading state
  loadCalendarFromUrl 
} = useCalendar()
```

### `useSubscription()`

Handles calendar subscription flows:

```typescript
const {
  handleSubscription,  // Subscribe to specific service
  smartSubscribe,      // Auto-detect platform
  copyToClipboard      // Copy URL helper
} = useSubscription(webCalUrl, httpUrl)
```

## 🗄️ State Management

### UI Store (`stores/ui.ts`)

Manages global UI state:

```typescript
const uiStore = useUiStore()

// Toast notifications
uiStore.showSuccess('Message')
uiStore.showError('Error message')

// Modal management
uiStore.openModal({ id: 'modal-id', title: 'Title' })
uiStore.closeModal('modal-id')

// Loading state
uiStore.setLoading(true)
```

## 🚢 Deployment

### Docker

```bash
# Build Docker image
docker build -f Dockerfile.nuxt -t subcal .

# Run container
docker run -p 3000:3000 subcal
```

### Fly.io

The original `fly.toml` will need updating for Nuxt 3:

```toml
[build]
  dockerfile = "Dockerfile.nuxt"

[env]
  NODE_ENV = "production"
```

## 🧪 Type Checking

```bash
npm run typecheck
```

This runs Vue's type checker to ensure all components and TypeScript code is valid.

## 📝 Code Style Guidelines

1. **Use Composition API**: Always use `<script setup>` syntax
2. **Type Everything**: Explicit types for all props, emits, and functions
3. **Composables for Logic**: Extract reusable logic into composables
4. **Component Naming**: PascalCase for components, camelCase for functions
5. **Store Methods**: Descriptive action names like `showSuccess()`, `openModal()`

## 🐛 Known Issues & Solutions

### CORS Issues in Production

The app uses AllOrigins proxy to bypass CORS. If you encounter issues:

1. Ensure calendar is publicly accessible
2. Check the calendar URL is correct
3. Try alternative CORS proxy if needed

### Font Loading

Ensure `InstrumentSans.woff2` is in `/assets/fonts/` directory and the font-face declaration in `main.css` is correct.

### TypeScript Errors

Run `npm run typecheck` to identify type issues. Most common fixes:
- Add explicit types to props
- Import types from `~/types`
- Use `as const` for readonly values

## 📚 Resources

- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [HeadlessUI Vue](https://headlessui.com/)

## ✅ Migration Checklist

- [x] Set up Nuxt 3 project structure
- [x] Configure TypeScript with strict mode
- [x] Set up TailwindCSS with custom theme
- [x] Create type definitions
- [x] Implement Pinia stores
- [x] Convert components to Vue SFC
- [x] Implement composables
- [x] Set up layouts and pages
- [x] Configure build and deployment
- [ ] Test all functionality
- [ ] Update environment variables
- [ ] Deploy to production

## 🆘 Need Help?

If you encounter issues during migration:

1. Check the console for TypeScript errors
2. Verify all dependencies are installed
3. Ensure `.env` file is configured correctly
4. Check that all assets are in `/public` directory
5. Review the Nuxt 3 documentation for specific features

