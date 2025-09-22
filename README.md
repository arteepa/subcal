# tribecal 📅

A lightweight web application for sharing iCalendar (.ics) feeds with beautiful, subscribable calendar pages.

## Features

### Current (Short-term Goals)
- ✅ **Landing Page**: Clean, modern landing page explaining functionality
- ✅ **Calendar Pages**: Individual pages for calendar subscriptions
- ✅ **One-Click Subscribe**: Support for Apple Calendar, Google Calendar, and Outlook
- ✅ **Feed Display**: Copy-able feed URLs and QR codes for mobile access
- ✅ **Event Rendering**: Visual display of events from .ics feeds
- ✅ **Responsive Design**: Works seamlessly on desktop and mobile

### Planned (Long-term Goals)
- 🔄 **User Accounts**: Authentication system for managing calendars
- 🔄 **Calendar Creation**: UI for users to create and manage their own calendars
- 🔄 **Event Management**: Add, edit, and delete events through the web interface
- 🔄 **Custom Domains**: Allow users to use their own domains for calendar pages

## Tech Stack

- **Frontend**: Pure HTML, CSS, and vanilla JavaScript (no frameworks)
- **Libraries**: 
  - [ical.js](https://github.com/mozilla-comm/ical.js/) for iCalendar parsing
  - [QRCode.js](https://github.com/davidshimjs/qrcodejs) for QR code generation
- **Architecture**: Modular, clean code structure for easy expansion

## Getting Started

### Prerequisites
- Node.js (for development server)
- Modern web browser

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/your-username/calendario-app.git
   cd calendario-app
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open your browser to `http://localhost:3000`

## Project Structure

\`\`\`
calendario/
├── index.html              # Landing page
├── calendar/
│   └── demo.html           # Demo calendar page
├── css/
│   ├── styles.css          # Main styles
│   └── calendar.css        # Calendar-specific styles
├── js/
│   ├── main.js            # Landing page functionality
│   └── calendar.js        # Calendar page functionality
├── feeds/
│   └── demo.ics           # Demo iCalendar file
└── package.json           # Project configuration
\`\`\`

## Usage

### Viewing the Demo
1. Visit the landing page at `/`
2. Click "View Demo Calendar" to see a sample calendar
3. Try the subscription options and QR code functionality

### Creating Your Own Calendar
Currently, calendars are manually managed by placing `.ics` files in the `feeds/` directory and creating corresponding HTML pages in the `calendar/` directory.

Future versions will include a web interface for calendar creation.

## iCalendar Format

The app uses standard iCalendar (.ics) format. Here's a basic event structure:

\`\`\`
BEGIN:VEVENT
UID:unique-id@your-domain.com
DTSTART:20241015T140000Z
DTEND:20241015T170000Z
SUMMARY:Event Title
DESCRIPTION:Event description
LOCATION:Event location
ORGANIZER:CN=Organizer Name:MAILTO:email@domain.com
STATUS:CONFIRMED
END:VEVENT
\`\`\`

## Subscription URLs

The app supports multiple subscription methods:

- **Apple Calendar**: `webcal://` protocol for automatic subscription
- **Google Calendar**: Direct integration with Google Calendar's "Add by URL" feature
- **Outlook**: Manual URL import with step-by-step instructions
- **QR Codes**: Mobile-friendly QR codes for easy phone access

## Development

### Adding New Features
The codebase is designed to be modular and extensible:

1. **Landing Page**: Modify `index.html`, `css/styles.css`, and `js/main.js`
2. **Calendar Pages**: Use `calendar/demo.html` as a template
3. **Styling**: Add styles to `css/calendar.css` for calendar-specific features
4. **Functionality**: Extend `js/calendar.js` for new calendar features

### Code Organization
- Keep HTML semantic and accessible
- Use CSS custom properties for consistent theming
- Write modular JavaScript classes for maintainability
- Follow the existing naming conventions

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Roadmap

### Phase 1 (Complete)
- ✅ Basic landing page and calendar subscription functionality
- ✅ One-click subscription support
- ✅ QR code generation
- ✅ Event list rendering

### Phase 2 (Next)
- 🔄 User authentication system
- 🔄 Calendar creation interface
- 🔄 Event management UI
- 🔄 Real .ics feed generation

### Phase 3 (Future)
- 🔄 Custom domains and branding
- 🔄 Analytics and subscription tracking
- 🔄 Email notifications
- 🔄 API for external integrations

## Support

For questions, issues, or feature requests, please open an issue on GitHub or contact the maintainer.

---

Built with ❤️ for seamless calendar sharing.
