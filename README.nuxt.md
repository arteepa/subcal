# subcal - Nuxt 3 Calendar Sharing App

Modern calendar sharing application built with Nuxt 3, Vue 3, TypeScript, and TailwindCSS.

## 🚀 Features

- **Modern Tech Stack**: Built with Nuxt 3, Vue 3 Composition API, TypeScript (strict mode), and TailwindCSS
- **Calendar Integration**: Support for Google Calendar, Apple Calendar, and Outlook
- **ICS Format**: Uses the universal .ICS format for maximum compatibility
- **Responsive Design**: Mobile-first design with beautiful dark mode UI
- **Smart Subscription**: Automatic platform detection for optimal subscription experience
- **State Management**: Pinia stores with composable-style architecture
- **Type Safety**: Full TypeScript support with strict mode enabled

## 📋 Tech Stack

- **Framework**: Nuxt 3
- **UI Library**: Vue 3 with Composition API
- **Language**: TypeScript (strict mode)
- **Styling**: TailwindCSS with custom configuration
- **State Management**: Pinia
- **Components**: HeadlessUI for accessible components
- **Icons**: Heroicons

## 🛠️ Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Development Mode

By default, the app runs in development mode and loads from a local `example.ics` file. To switch to production mode (loading from remote URLs), set the environment variable:

```bash
NODE_ENV=production npm run dev
```

## 📁 Project Structure

```
/assets/
  /css/           # Global styles with TailwindCSS
  /fonts/         # Custom fonts (InstrumentSans)
  /icons/         # SVG icons
/components/
  /common/        # Reusable UI components (Button, Modal, Toast, etc.)
  /calendar/      # Calendar-specific components
  /landing/       # Landing page components
/composables/     # Composition API logic
  useCalendar.ts  # Calendar data management
  useSubscription.ts # Subscription handling
/constants/       # Configuration constants
/layouts/         # Layout components
/pages/           # File-based routing
  index.vue       # Landing page
  panorama.vue    # Calendar view
/stores/          # Pinia stores
  ui.ts           # UI state (modals, toasts, loading)
/types/           # TypeScript type definitions
/utils/           # Pure utility functions
```

## 🎨 Design System

The application follows a minimalist dark mode design with:

- **Primary Accent**: `#FFAB3D` (warm orange/amber)
- **Background**: Pure black `#000` with secondary `#1a1a1a`
- **Typography**: InstrumentSans custom font
- **Components**: Glassmorphism effects with backdrop blur
- **Animations**: Smooth transitions (300ms standard, 200ms quick)

See `visual-styles.md` for complete design specifications.

## 🔧 Configuration

Calendar configuration is managed in `/constants/config.ts`:

```typescript
export const DEFAULT_USER_CONFIG: UserConfig = {
  username: 'Your Name',
  calendar: {
    webCalUrl: 'webcal://...',
    httpUrl: 'https://...',
    name: 'Calendar Name',
    description: 'Calendar Description'
  },
  settings: {
    developmentMode: true // Set to false for production
  }
}
```

## 📦 Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Generate static site
npm run generate
```

## 🚢 Deployment

The application includes a Dockerfile for containerized deployment:

```bash
# Build Docker image
docker build -t subcal .

# Run container
docker run -p 3000:3000 subcal
```

For Fly.io deployment:

```bash
# Deploy to staging
npm run deploy:staging

# Deploy to production
npm run deploy:production
```

## 🧪 Type Checking

```bash
# Run TypeScript type checking
npm run typecheck
```

## 📝 Code Style

- **Composition API**: Use `<script setup>` syntax
- **Composables**: Shared reactive state at module level
- **Naming**: camelCase for variables/functions, PascalCase for components
- **TypeScript**: Explicit interfaces/types in `/types` directory
- **Stores**: Setup function style with explicit return object

## 🔌 API Integration

The app uses the AllOrigins CORS proxy for production calendar fetching:

```typescript
// Production mode (remote calendar)
const response = await fetch(
  `https://api.allorigins.win/get?url=${encodeURIComponent(calendarUrl)}`
)

// Development mode (local file)
const response = await fetch('/example.ics')
```

## 🎯 Key Features to Implement

- [ ] User authentication
- [ ] Custom calendar themes
- [ ] Event filtering and search
- [ ] Multiple calendar support
- [ ] Analytics integration
- [ ] SEO optimization

## 📄 License

MIT

## 👨‍💻 Author

Pablo Rodriguez
- Website: [artee.xyz](https://artee.xyz)

