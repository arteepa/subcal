# Possible .ICS (iCalendar) Fields

An **.ics file** (iCalendar spec, RFC 5545/7986) is a container of structured text.  
At the top is `VCALENDAR`, and inside are **components** such as `VEVENT`, `VTODO`, `VJOURNAL`, `VFREEBUSY`, `VTIMEZONE`.  
Most apps (Google, Apple, Outlook) mainly use `VEVENT`.

---

## VCALENDAR Level
- `PRODID` → identifies the product that created the file  
- `VERSION` → version of iCal spec (usually 2.0)  
- `CALSCALE` → calendar scale (typically GREGORIAN)  
- `METHOD` → publishing method (`PUBLISH`, `REQUEST`, `CANCEL`)  
- `X-WR-CALNAME` → display name (non-standard, common)  
- `X-WR-TIMEZONE` → default timezone (non-standard, common)  

---

## VEVENT Level

### Identifiers
- `UID` → unique identifier  
- `SEQUENCE` → version of the event  
- `DTSTAMP` → created/last updated timestamp  

### Timing
- `DTSTART` → start datetime  
- `DTEND` → end datetime  
- `DURATION` → duration instead of DTEND  
- `RRULE` → recurrence rule (daily, weekly, etc.)  
- `RDATE` → recurrence dates  
- `EXDATE` → excluded dates  
- `RECURRENCE-ID` → override for a recurring instance  
- `TZID` → timezone reference  

### Content
- `SUMMARY` → event title  
- `DESCRIPTION` → description text  
- `LOCATION` → event location  
- `URL` → link to event info  
- `CATEGORIES` → tags/labels  
- `ATTACH` → attachment (URL, file, image)  

### People
- `ORGANIZER` → event organizer (often `MAILTO:`)  
- `ATTENDEE` → participant (RSVP status, role)  
- `CONTACT` → contact details  

### Status & Transparency
- `STATUS` → `TENTATIVE`, `CONFIRMED`, `CANCELLED`  
- `TRANSP` → free/busy indicator (`OPAQUE`, `TRANSPARENT`)  

### Priority & Classification
- `CLASS` → `PUBLIC`, `PRIVATE`, `CONFIDENTIAL`  
- `PRIORITY` → number 0–9  

### Alarms / Reminders (VALARM)
- `TRIGGER` → when it triggers (e.g. `-PT15M`)  
- `ACTION` → `DISPLAY`, `AUDIO`, `EMAIL`  
- `DESCRIPTION` → reminder text  
- `ATTACH` → sound file, etc.  

### Other Metadata
- `CREATED` → creation timestamp  
- `LAST-MODIFIED` → last modification timestamp  
- `GEO` → latitude/longitude  
- `RESOURCES` → required resources  
- `RELATED-TO` → relationship with other events  

---

## VTIMEZONE Level
- `TZID` → timezone identifier  
- `STANDARD` / `DAYLIGHT` → offset definitions and rules  

---

## Extensions (Non-standard)
Custom `X-` properties, common examples:  
- `X-MICROSOFT-CDO-BUSYSTATUS`  
- `X-APPLE-STRUCTURED-LOCATION`  
- `X-WR-CALDESC` (calendar description)  
