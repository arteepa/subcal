# Visual Style Guide

## Overall Design Philosophy
Modern, minimalist dark mode design with a focus on readability and clean information hierarchy.

## Color Palette

### Primary Colors
- **Accent Color**: `#FFAB3D` (warm orange/amber) - Used for CTAs, highlights, and interactive elements
- **Accent Hover**: `#d97706` (darker amber) - Hover state for accent elements

### Background
- **Primary Background**: Pure black `#000`
- **Secondary Background**: `#1a1a1a` (very dark gray) - Used for card backgrounds and feature sections

### Text
- **Primary Text**: White `#ffffff` - Main headings and important text
- **Secondary Text**: `#6a6a6a` (medium gray) - Subtitles, descriptions, body copy

### Borders & Accents
- **Border**: `#2a2a2a` (subtle dark gray) - Minimal, understated borders

## Typography

### Font Family
`InstrumentSans` (custom variable font, weight range 100-900)
- Clean, modern sans-serif with excellent readability
- Falls back to system fonts: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto`

### Font Sizes & Hierarchy
- **Hero Headline**: `2.6rem` (desktop), bold weight 700, tight line-height of 1
- **Hero Subtitle**: `1.2rem`, medium gray color
- **Section Headings**: `2.5rem` → `1.3rem` depending on hierarchy
- **Body Text**: `1.1rem` - `0.9rem` range
- **Buttons**: `1.1rem`, semi-bold weight 600

## Layout & Spacing

- **Container Width**: Max-width of `1200px` for main content, centered
- **Padding Philosophy**: Generous whitespace with 40-60px section padding on desktop
- **Grid Systems**: 
  - Features: 3-column auto-fit grid (min 280px, max 1fr)
  - Steps: 3-column auto-fit grid (min 300px, max 1fr)

## Component Styles

### Buttons

**Primary Button:**
- Warm orange background (`#FFAB3D`)
- Dark text on light button
- `8px 16px` padding, `8px` border-radius
- Subtle lift on hover (`translateY(-2px)`)
- Shadow effects on hover

**Secondary Button:**
- Transparent background
- White border (`2px solid`)
- Inverts on hover (white bg, black text)

### Cards
- Subtle dark background (`rgba(255, 255, 255, 0.05)`)
- Border: `2px solid #2a2a2a`
- Border-radius: `10px` - `12px` (rounded corners)
- Backdrop blur filter for glassmorphism effect
- Hover states with subtle elevation and orange accent border

### Modal Windows
- Dark overlay with backdrop blur: `rgba(0, 0, 0, 0.8)` + `blur(8px)`
- Content: Dark secondary background with `1px` border
- Large border-radius: `16px` - `24px`
- Heavy shadow: `0 25px 80px rgba(0, 0, 0, 0.4)`
- Smooth slide-up animation on open
- Circular close button (40px × 40px) with glassmorphism

### Event Cards
- Minimal design with bottom borders only (`1px solid #2a2a2a`)
- Event titles in accent orange color
- Icons: 16px × 16px SVG icons
- Hover effect: Subtle orange background tint (`rgba(255, 171, 61, 0.05)`) with 1px lift
- Clickable cards show arrow icon that translates diagonally on hover

### Form Inputs
- Dark background: `rgba(255, 255, 255, 0.05)`
- `2px` border in dark gray (`#2a2a2a`)
- Focus state: Orange border with subtle orange glow/shadow
- `12px` border-radius
- Backdrop blur for depth

## Visual Effects & Animations

### Transitions
- Standard duration: `0.3s ease`
- Quick interactions: `0.2s ease`
- Properties animated: `all`, `background`, `transform`, `color`, `box-shadow`

### Hover Effects
- Buttons lift up 2-3px (`translateY(-2px/3px)`)
- Shadow intensifies on hover
- Border colors change to accent orange
- Background tints with orange on interactive elements

### Keyframe Animations
- Modal fade-in with scale and slide-up effect
- Smooth entry/exit transitions

## Iconography

- Emoji icons used for calendar services (🍎 Apple, 📅 Google, 📬 Outlook)
- SVG icons for UI elements (calendar, location, arrow)
- Icon sizes: 16px for inline, 24px for standalone
- Accent orange color for icons

## Navigation

- Sticky header at top
- Center-aligned logo
- Height: `64px`
- Pure black background with subtle persistence

## Footer

- Center-aligned
- Minimal text in secondary gray
- Accent orange links
- Subtle border-top separator

## Responsive Behavior

### Mobile Breakpoints
- `768px`: Adjust grid to single column, reduce font sizes
- `480px`: Further size reductions, stack buttons vertically

### Mobile-specific
- Modal takes near full-screen on mobile
- Sticky subscribe button remains fixed at bottom
- Touch-friendly button sizes maintained

## Usage Notes for AI Code Generation

When implementing this design:
- Use CSS custom properties (CSS variables) for consistent theming
- All interactive elements should have smooth transitions
- Maintain semantic HTML structure
- Use flexbox and CSS Grid for layouts
- Ensure all touch targets are at least 44px for mobile accessibility
- Keep animations subtle and purposeful
- Test contrast ratios for accessibility (aim for WCAG AA minimum)