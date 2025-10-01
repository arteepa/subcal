// Import user configuration
import userConfig from './config.js';

// Calendar page functionality
class CalendarPage {
    constructor() {
        // Load configuration from config file
        this.config = userConfig;
        this.calendarUrl = this.config.calendar.webCalUrl;
        this.httpCalendarUrl = this.config.calendar.httpUrl;
        this.events = [];
        this.init();
    }

    init() {
        this.setupSubscriptionButtons();
        this.setupCopyUrl();
        this.setupModal();
        this.setupStickySubscribeButton();
        this.loadEventsFromICS();
        this.setupSmoothScrolling();
    }

    setupSubscriptionButtons() {
        const subscribeButtons = document.querySelectorAll('.subscribe-btn');
        subscribeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const service = btn.dataset.service;
                this.handleSubscription(service);
            });
        });
    }

    handleSubscription(service) {
        const modal = document.getElementById('subscribe-modal');
        const modalContent = document.getElementById('modal-content-inner');
        
        let content = '';
        let actionUrl = '';

        switch (service) {
            case 'apple':
                actionUrl = this.calendarUrl;
                content = `
                    <div class="subscription-instructions">
                        <h3>🍎 Subscribe with Apple Calendar</h3>
                        <p>Click the button below to automatically add this calendar to your Apple Calendar app.</p>
                        <div style="margin: 20px 0;">
                            <a href="${actionUrl}" class="btn btn-primary">Open in Apple Calendar</a>
                        </div>
                        <p><strong>Manual Instructions:</strong></p>
                        <ol>
                            <li>Open Calendar app on your device</li>
                            <li>Go to Calendar → Add Account → Other</li>
                            <li>Select "Add CalDAV Account"</li>
                            <li>Enter the calendar URL: <code>${this.httpCalendarUrl}</code></li>
                            <li>Tap "Add" to subscribe</li>
                        </ol>
                    </div>
                `;
                break;
            
            case 'google':
                actionUrl = `https://calendar.google.com/calendar/u/0/r/settings/addbyurl?cid=${encodeURIComponent(this.httpCalendarUrl)}`;
                content = `
                    <div class="subscription-instructions">
                        <h3>📅 Subscribe with Google Calendar</h3>
                        <p>Click the button below to add this calendar to your Google Calendar.</p>
                        <div style="margin: 20px 0;">
                            <a href="${actionUrl}" target="_blank" class="btn btn-primary">Add to Google Calendar</a>
                        </div>
                        <p><strong>Manual Instructions:</strong></p>
                        <ol>
                            <li>Open Google Calendar in your browser</li>
                            <li>Click the "+" next to "Other calendars"</li>
                            <li>Select "From URL"</li>
                            <li>Paste this URL: <code>${this.httpCalendarUrl}</code></li>
                            <li>Click "Add calendar"</li>
                        </ol>
                    </div>
                `;
                break;
            
            case 'outlook':
                content = `
                    <div class="subscription-instructions">
                        <h3>📬 Subscribe with Outlook Calendar</h3>
                        <p>Follow these steps to add this calendar to Outlook:</p>
                        <ol>
                            <li>Open Outlook Calendar</li>
                            <li>Click "Add calendar" or "Subscribe to calendar"</li>
                            <li>Select "From internet"</li>
                            <li>Enter this URL: <code>${this.httpCalendarUrl}</code></li>
                            <li>Give it a name and click "Import"</li>
                        </ol>
                        <div style="margin: 20px 0;">
                            <button class="btn btn-secondary" onclick="navigator.clipboard.writeText('${this.httpCalendarUrl}')">📋 Copy URL</button>
                        </div>
                    </div>
                `;
                break;
        }

        modalContent.innerHTML = content;
        modal.style.display = 'block';
        document.body.classList.add('modal-open');

        // If there's an action URL, try to open it automatically for Apple and Google
        if (actionUrl && (service === 'apple' || service === 'google')) {
            setTimeout(() => {
                window.open(actionUrl, '_blank');
            }, 1000);
        }
    }

    setupCopyUrl() {
        const copyBtn = document.getElementById('copy-url');
        const urlInput = document.getElementById('calendar-url');

        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(urlInput.value);
                copyBtn.textContent = '✅ Copied!';
                copyBtn.classList.add('copied');
                
                setTimeout(() => {
                    copyBtn.textContent = '📋 Copy';
                    copyBtn.classList.remove('copied');
                }, 2000);
            } catch (err) {
                // Fallback for older browsers
                urlInput.select();
                document.execCommand('copy');
                copyBtn.textContent = '✅ Copied!';
                copyBtn.classList.add('copied');
                
                setTimeout(() => {
                    copyBtn.textContent = '📋 Copy';
                    copyBtn.classList.remove('copied');
                }, 2000);
            }
        });
    }


    setupModal() {
        const modal = document.getElementById('subscribe-modal');
        const closeBtn = modal.querySelector('.close');

        closeBtn.addEventListener('click', () => {
            this.closeModal();
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                this.closeModal();
            }
        });

        // ESC key to close modal
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.style.display === 'block') {
                this.closeModal();
            }
        });
    }

    setupStickySubscribeButton() {
        const stickyBtn = document.getElementById('sticky-subscribe-btn');
        if (stickyBtn) {
            stickyBtn.addEventListener('click', () => {
                this.openSubscriptionModal();
            });
        }

        // Also setup navigation subscribe link
        const navSubscribe = document.getElementById('nav-subscribe');
        if (navSubscribe) {
            navSubscribe.addEventListener('click', (e) => {
                e.preventDefault();
                this.openSubscriptionModal();
            });
        }
    }

    openSubscriptionModal() {
        const modal = document.getElementById('subscribe-modal');
        const modalContent = document.getElementById('modal-content-inner');
        
        // Reset modal content to show subscription options
        modalContent.innerHTML = `
            <div class="subscription-section-modal">
                <p class="subscription-subtitle">Suscribe with your preferred method to stay updated</p>
                
                <div class="subscription-grid">
                    <!-- One-click subscription buttons -->
                    <div class="subscription-card">
                        <h3>Popular Calendars</h3>
                        <div class="subscribe-buttons">
                            <button class="subscribe-btn apple-btn" data-service="apple">
                                <span class="btn-icon">🍎</span>
                                <span class="btn-text">
                                    <strong>Apple Calendar</strong>
                                    <small>iPhone, iPad, Mac</small>
                                </span>
                            </button>
                            <button class="subscribe-btn google-btn" data-service="google">
                                <span class="btn-icon">📅</span>
                                <span class="btn-text">
                                    <strong>Google Calendar</strong>
                                    <small>Android, Web, Gmail</small>
                                </span>
                            </button>
                            <button class="subscribe-btn outlook-btn" data-service="outlook">
                                <span class="btn-icon">📬</span>
                                <span class="btn-text">
                                    <strong>Outlook Calendar</strong>
                                    <small>Windows, Office 365</small>
                                </span>
                            </button>
                        </div>
                    </div>

                    <!-- Direct URL -->
                    <div class="subscription-card">
                        <h3>Use direct URL</h3>
                        <p>Copy this URL to add to any calendar app</p>
                        <div class="url-container">
                            <input type="text" id="calendar-url" readonly value="${this.calendarUrl}">
                            <button class="copy-btn" id="copy-url">📋 Copy</button>
                        </div>
                    </div>

                </div>
            </div>
        `;

        // Re-setup event handlers for the modal content
        this.setupSubscriptionButtons();
        this.setupCopyUrl();

        // Show modal
        modal.style.display = 'block';
        document.body.classList.add('modal-open');
    }

    closeModal() {
        const modal = document.getElementById('subscribe-modal');
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }


    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    async loadEventsFromICS() {
        const eventsList = document.getElementById('events-list');
        eventsList.innerHTML = '<div class="loading">Loading events from calendar feed...</div>';

        try {
            let icsData;

            // Check if we're in development mode
            if (this.config.settings.developmentMode) {
                console.log('🔧 Development mode: Loading local example.ics file...');
                
                // Load local example.ics file
                const localResponse = await fetch('./example.ics');
                
                if (!localResponse.ok) {
                    throw new Error(`Failed to load local example.ics: ${localResponse.status} ${localResponse.statusText}`);
                }
                
                icsData = await localResponse.text();
                console.log('✅ Successfully loaded local calendar data');
            } else {
                console.log('🌐 Production mode: Fetching calendar via AllOrigins API...');
                
                // Use AllOrigins API to bypass CORS restrictions
                const allOriginsResponse = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(this.httpCalendarUrl)}`);
                
                if (!allOriginsResponse.ok) {
                    throw new Error(`AllOrigins API request failed: ${allOriginsResponse.status} ${allOriginsResponse.statusText}`);
                }
                
                const allOriginsData = await allOriginsResponse.json();
                console.log('AllOrigins response status:', allOriginsData.status);
                
                if (!allOriginsData.contents) {
                    throw new Error(`AllOrigins API did not return calendar data. Status: ${allOriginsData.status?.http_code || 'unknown'}`);
                }
                
                // Check if the content is base64 encoded (data URL format)
                if (allOriginsData.contents.startsWith('data:')) {
                    console.log('Decoding base64 calendar data...');
                    const base64Data = allOriginsData.contents.split(',')[1];
                    // Properly decode UTF-8 from base64
                    const binaryString = atob(base64Data);
                    const bytes = new Uint8Array(binaryString.length);
                    for (let i = 0; i < binaryString.length; i++) {
                        bytes[i] = binaryString.charCodeAt(i);
                    }
                    icsData = new TextDecoder('utf-8').decode(bytes);
                } else {
                    console.log('Using plain text calendar data...');
                    icsData = allOriginsData.contents;
                }
                
                console.log('✅ Successfully fetched remote calendar data');
            }
            
            // Validate that we received valid ICS data
            if (!icsData.includes('BEGIN:VCALENDAR')) {
                throw new Error('Received data is not valid ICS calendar format');
            }
            
            console.log(`Calendar contains ${icsData.split('BEGIN:VEVENT').length - 1} events`);

            this.parseICSData(icsData);
            this.renderEvents();
        } catch (error) {
            console.error('Error loading ICS calendar:', error);
            
            // Show different error messages based on mode
            const isDevMode = this.config.settings.developmentMode;
            const errorTitle = isDevMode ? 'Unable to load local calendar file' : 'Unable to load calendar events';
            const errorDescription = isDevMode 
                ? 'There was an error loading the local example.ics file.'
                : 'There was an error loading the calendar feed. This usually happens due to CORS restrictions.';
            
            const solutions = isDevMode 
                ? [
                    'Make sure the example.ics file exists in the root directory',
                    'Check that the file is accessible via HTTP (not file:// protocol)',
                    'Verify the ICS file format is valid'
                ]
                : [
                    'The calendar may be set to private - make sure it\'s public',
                    'The calendar URL may have changed',
                    'CORS proxy services may be temporarily unavailable'
                ];

            eventsList.innerHTML = `
                <div class="error-message">
                    <h3>${errorTitle}</h3>
                    <p>${errorDescription}</p>
                    <div class="error-details">
                        <p><strong>Mode:</strong> ${isDevMode ? 'Development (local file)' : 'Production (remote URL)'}</p>
                        <p><strong>Technical details:</strong> ${error.message}</p>
                        <p><strong>Possible solutions:</strong></p>
                        <ul>
                            ${solutions.map(solution => `<li>${solution}</li>`).join('')}
                        </ul>
                    </div>
                    <button onclick="location.reload()" class="retry-btn">🔄 Retry</button>
                </div>
            `;
        }
    }

    parseICSData(icsData) {
        try {
            // Parse the ICS data using ical.js
            const jcalData = ICAL.parse(icsData);
            const comp = new ICAL.Component(jcalData);
            
            // Extract calendar metadata
            this.extractCalendarMetadata(comp);
            
            const vevents = comp.getAllSubcomponents('vevent');

            this.events = vevents.map((vevent, index) => {
                const event = new ICAL.Event(vevent);
                
                // Extract organizer
                let organizer = 'Event Organizer';
                const organizerProp = vevent.getFirstProperty('organizer');
                if (organizerProp) {
                    const cn = organizerProp.getParameter('cn');
                    if (cn) {
                        organizer = cn;
                    }
                }

                // Extract URL
                let url = null;
                const urlProp = vevent.getFirstProperty('url');
                if (urlProp) {
                    url = urlProp.getFirstValue();
                }

                return {
                    id: index + 1,
                    title: event.summary || 'Untitled Event',
                    startDate: event.startDate.toJSDate(),
                    endDate: event.endDate.toJSDate(),
                    location: event.location || null, // Don't set default fallback, use null for empty
                    description: event.description,
                    organizer: organizer,
                    url: url
                };
            });

            // Sort events by start date
            this.events.sort((a, b) => a.startDate - b.startDate);

        } catch (error) {
            console.error('Error parsing ICS data:', error);
            throw new Error('Failed to parse calendar data');
        }
    }

    extractCalendarMetadata(comp) {
        // Extract X-WR-CALNAME (calendar title)
        const calNameProp = comp.getFirstProperty('x-wr-calname');
        const calendarTitle = calNameProp ? calNameProp.getFirstValue() : 'Calendar';
        
        // Extract X-WR-CALDESC (calendar description)
        const calDescProp = comp.getFirstProperty('x-wr-caldesc');
        const calendarDescription = calDescProp ? calDescProp.getFirstValue() : 'Calendar events';
        
        // Update the HTML elements
        this.updateCalendarHeader(calendarTitle, calendarDescription);
        
        console.log('Calendar metadata extracted:', { title: calendarTitle, description: calendarDescription });
    }

    updateCalendarHeader(title, description) {
        const titleElement = document.querySelector('header h1');
        const descriptionElement = document.querySelector('header p');
        
        if (titleElement) {
            titleElement.textContent = title;
        }
        
        if (descriptionElement) {
            descriptionElement.textContent = description;
        }
    }

    renderEvents() {
        const eventsList = document.getElementById('events-list');
        
        // Get current date (start of today to include events happening today)
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        // Filter events to only show future events
        let filteredEvents = this.events.filter(event => {
            // Only include events that start today or in the future
            const eventDate = new Date(event.startDate.getFullYear(), event.startDate.getMonth(), event.startDate.getDate());
            return eventDate >= today;
        });

        // Sort events by date
        filteredEvents.sort((a, b) => a.startDate - b.startDate);

        if (filteredEvents.length === 0) {
            eventsList.innerHTML = '<div class="no-events">No upcoming events found.</div>';
            return;
        }

        const eventsHTML = filteredEvents.map(event => this.renderEventCard(event)).join('');
        eventsList.innerHTML = eventsHTML;

        // Setup event actions
        this.setupEventActions();
    }

    renderEventCard(event) {
        const formatDate = (date) => {
            return new Intl.DateTimeFormat('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            }).format(date);
        };

        const formatTime = (date) => {
            return new Intl.DateTimeFormat('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            }).format(date);
        };

        // Helper function to escape HTML entities
        const escapeHtml = (text) => {
            if (!text) return '';
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        };

        const cardClass = event.url ? 'event-card event-card-clickable' : 'event-card';
        const cardAttributes = event.url ? `data-event-id="${event.id}" data-url="${event.url}" style="cursor: pointer;"` : `data-event-id="${event.id}"`;
        
        return `
            <div class="${cardClass}" ${cardAttributes}>
                <div class="event-header">
                    <h3 class="event-title">${escapeHtml(event.title)}</h3>
                    ${event.url ? `
                    <div class="event-arrow">
                        <svg class="arrow-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19 4.00001C19.5523 4 20 4.44772 20 5.00001V15.7618C20 16.3141 19.5523 16.7618 19 16.7618H17.8096C17.2573 16.7618 16.8096 16.3141 16.8096 15.7618L16.8095 9.44638L7.96303 18.2929C7.5725 18.6834 6.93933 18.6834 6.54881 18.2929L5.70708 17.4511C5.31657 17.0606 5.31658 16.4274 5.7071 16.0369L14.5535 7.19046H8.23822C7.68594 7.19046 7.23822 6.74275 7.23822 6.19046V5.00007C7.23822 4.44779 7.68593 4.00007 8.23822 4.00007L19 4.00001Z" fill="currentColor"/>
                        </svg>
                    </div>
                    ` : ''}
                </div>
                
                <div class="event-data">
                    <img src="assets/icons/calendar.svg" alt="Date" class="event-icon">
                    <span>${formatDate(event.startDate)}</span>
                </div>
                
                ${event.location ? `
                <div class="event-data">
                    <img src="assets/icons/location.svg" alt="Location" class="event-icon">
                    <span>${escapeHtml(event.location)}</span>
                </div>
                ` : ''}
                
                ${event.description ? `<p class="event-description">${escapeHtml(event.description)}</p>` : ''}
                
            </div>
        `;
    }

    setupEventActions() {
        const addButtons = document.querySelectorAll('.add-to-calendar');
        addButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const eventId = parseInt(btn.dataset.eventId);
                this.addEventToCalendar(eventId);
            });
        });

        // Add click handlers for clickable event cards with URLs
        const clickableCards = document.querySelectorAll('.event-card-clickable');
        clickableCards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Prevent click if clicking on add-to-calendar button
                if (e.target.closest('.add-to-calendar')) {
                    return;
                }
                
                const url = card.dataset.url;
                if (url) {
                    window.open(url, '_blank', 'noopener,noreferrer');
                }
            });
        });
    }

    addEventToCalendar(eventId) {
        const event = this.events.find(e => e.id === eventId);
        if (!event) return;

        // Create a Google Calendar link for individual events
        const formatGoogleDate = (date) => {
            return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        };

        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formatGoogleDate(event.startDate)}/${formatGoogleDate(event.endDate)}&details=${encodeURIComponent(event.description || '')}&location=${encodeURIComponent(event.location || '')}`;

        window.open(googleCalendarUrl, '_blank');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CalendarPage();
});
