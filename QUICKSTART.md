# 🚀 Quick Start Guide

Get your Nuxt 3 subcal app running in 5 minutes!

## Prerequisites

- Node.js 18 or higher
- npm or yarn

## Installation

### Option 1: Automated Setup (Recommended)

```bash
# Run the setup script
./setup.sh
```

This will:
- ✅ Check Node.js version
- ✅ Create necessary directories
- ✅ Copy assets to public folder
- ✅ Create .env file
- ✅ Install all dependencies

### Option 2: Manual Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy assets
mkdir -p public/assets/icons
cp -r assets/icons/* public/assets/icons/
cp assets/logo*.png public/assets/
cp example.ics public/

# 3. Copy fonts
mkdir -p assets/fonts
cp assets/InstrumentSans.woff2 assets/fonts/

# 4. Create .env file
cp .env.example .env
```

## Running the App

### Development Mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The app will load calendar data from the local `example.ics` file.

### Production Mode (Remote Calendar)

```bash
# Option 1: Using environment variable
NODE_ENV=production npm run dev

# Option 2: Update .env file
# Change NUXT_PUBLIC_DEVELOPMENT_MODE=false
npm run dev
```

## Configuration

Edit `constants/config.ts` to customize your calendar:

```typescript
export const DEFAULT_USER_CONFIG: UserConfig = {
  username: 'Your Name',
  calendar: {
    webCalUrl: 'webcal://your-calendar-url.ics',
    httpUrl: 'https://your-calendar-url.ics',
    name: 'Your Calendar Name',
    description: 'Your calendar description'
  }
}
```

## Routes

- **`/`** - Landing page with features and how-it-works
- **`/panorama`** - Calendar view with events and subscription options

## Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview

# The build output will be in .output/ directory
```

## Common Issues

### Port 3000 already in use

```bash
# Use a different port
PORT=3001 npm run dev
```

### Missing dependencies

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Font not loading

Ensure `assets/fonts/InstrumentSans.woff2` exists and the path in `assets/css/main.css` is correct.

### TypeScript errors

```bash
# Check for type errors
npm run typecheck
```

## What's Next?

1. **Customize Design**: Edit `tailwind.config.ts` and `assets/css/main.css`
2. **Add Features**: Create new components in `components/`
3. **Update Config**: Modify `constants/config.ts` for your calendar
4. **Deploy**: Use `Dockerfile.nuxt` or `fly.nuxt.toml` for deployment

## Need Help?

- 📖 Read [README.nuxt.md](README.nuxt.md) for full documentation
- 🔄 Check [MIGRATION.md](MIGRATION.md) for migration details
- 🎨 See [visual-styles.md](visual-styles.md) for design system
- ⚙️ Review [tech-migration-plan.md](tech-migration-plan.md) for architecture

## Troubleshooting

### Calendar not loading

1. Check console for errors
2. Verify `example.ics` is in `public/` directory
3. Ensure CORS proxy is accessible (production mode)

### Styles not applied

1. Verify TailwindCSS is configured in `nuxt.config.ts`
2. Check `assets/css/main.css` has `@tailwind` directives
3. Restart dev server

### Components not found

1. Ensure component names match file names (PascalCase)
2. Check component is in correct directory
3. Restart dev server

## Success! 🎉

Your Nuxt 3 subcal app should now be running. Visit the pages:

- Landing: [http://localhost:3000](http://localhost:3000)
- Calendar: [http://localhost:3000/panorama](http://localhost:3000/panorama)

Enjoy building! 🚀

