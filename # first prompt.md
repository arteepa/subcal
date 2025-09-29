# first prompt

I want to build a web app around iCalendar (.ics) feeds.

Short term:
- Create a simple landing page that explains the functionality and a CTA to express interest
- Calendars will have individual pages where people can subscribe to an existing .ics feed.
- On desktop and mobile, it should offer one-click subscribe options for Apple Calendar, Google Calendar, and Outlook.
- It should also display the feed URL (with copy button) for easy access.
- Additionally, render the events from the .ics feed in a list the calendar page itself (basic visual presentation).
- First calendar will be manually managed, no user system.

Long term:
- Extend this into a platform where users can create their own calendar page
- They should be able to add events via a UI, generate their own .ics feed, and share a subscription link/landing page with others.

Tech notes:
- Keep it lightweight, html, css, vanilla js
- Use a recommended/popular iCalendar parsing library for reading and rendering events.
- Code should be clean and modular, so I can later expand to include user accounts, authentication, and calendar creation.