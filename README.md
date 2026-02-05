# subcal

A web app for sharing iCalendar feeds with beautiful subscription pages.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Headless UI
- **State Management**: Zustand
- **Calendar Parsing**: ical.js

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
subcal/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   ├── globals.css         # Global styles & Tailwind config
│   └── [slug]/             # Dynamic calendar pages
├── components/
│   ├── ui/                 # Shared UI components
│   ├── landing/            # Landing page components
│   └── calendar/           # Calendar page components
├── lib/                    # Utility functions
│   ├── config.ts           # Calendar configurations
│   ├── ics-parser.ts       # ICS file parsing
│   ├── platform.ts         # Platform detection
│   ├── types.ts            # TypeScript types
│   └── utils.ts            # Helper functions
├── stores/                 # Zustand state stores
├── public/assets/          # Static assets
└── types/                  # Additional type declarations
```

## Adding a Calendar

Edit `lib/config.ts` to add new calendar configurations:

```typescript
const calendars: Record<string, CalendarConfig> = {
  'your-slug': {
    username: 'Your Name',
    calendar: {
      webCalUrl: 'webcal://...',
      httpUrl: 'https://...',
      name: 'Calendar Name',
      description: 'Calendar description',
      // ...
    },
    // ...
  },
}
```

The calendar will be available at `/your-slug`.

## Deployment

### Fly.io

```bash
fly deploy
```

### Docker

```bash
docker build -t subcal .
docker run -p 3000:3000 subcal
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_FORMSPREE_ID` | Formspree form ID for interest form |

## License

MIT
