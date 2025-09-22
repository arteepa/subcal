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
        this.generateQRCode();
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

    generateQRCode() {
        const qrContainer = document.getElementById('qr-code');
        
        if (typeof QRCode !== 'undefined') {
            QRCode.toCanvas(qrContainer, this.calendarUrl, {
                width: 150,
                height: 150,
                margin: 2,
                color: {
                    dark: '#1f2937',
                    light: '#ffffff'
                }
            }, (error) => {
                if (error) {
                    console.error('QR code generation failed:', error);
                    qrContainer.innerHTML = '<p>QR code unavailable</p>';
                }
            });

            // Setup download functionality
            const downloadBtn = document.getElementById('download-qr');
            downloadBtn.addEventListener('click', () => {
                QRCode.toDataURL(this.calendarUrl, {
                    width: 300,
                    height: 300,
                    margin: 3
                }, (error, url) => {
                    if (!error) {
                        const link = document.createElement('a');
                        link.download = 'calendar-qr-code.png';
                        link.href = url;
                        link.click();
                    }
                });
            });
        } else {
            qrContainer.innerHTML = '<p>QR code library not loaded</p>';
        }
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
                <h2>Subscribe to This Calendar</h2>
                <p class="subscription-subtitle">Choose your preferred method to stay updated</p>
                
                <div class="subscription-grid">
                    <!-- One-click subscription buttons -->
                    <div class="subscription-card">
                        <h3>📱 One-Click Subscribe</h3>
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
                        <h3>🔗 Direct URL</h3>
                        <p>Copy this URL to add to any calendar app</p>
                        <div class="url-container">
                            <input type="text" id="calendar-url" readonly value="${this.calendarUrl}">
                            <button class="copy-btn" id="copy-url">📋 Copy</button>
                        </div>
                    </div>

                    <!-- QR Code -->
                    <div class="subscription-card">
                        <h3>📲 QR Code</h3>
                        <p>Scan with your phone for instant access</p>
                        <div class="qr-container">
                            <div id="qr-code"></div>
                            <button class="download-btn" id="download-qr">⬇️ Download QR</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Re-setup event handlers for the modal content
        this.setupSubscriptionButtons();
        this.setupCopyUrl();
        this.generateQRCode();

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
            // Use AllOrigins API to bypass CORS restrictions
            console.log('Fetching calendar via AllOrigins API...');
            
            const allOriginsResponse = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(this.httpCalendarUrl)}`);
            
            if (!allOriginsResponse.ok) {
                throw new Error(`AllOrigins API request failed: ${allOriginsResponse.status} ${allOriginsResponse.statusText}`);
            }
            
            const allOriginsData = await allOriginsResponse.json();
            console.log('AllOrigins response status:', allOriginsData.status);
            
            if (!allOriginsData.contents) {
                throw new Error(`AllOrigins API did not return calendar data. Status: ${allOriginsData.status?.http_code || 'unknown'}`);
            }
            
            let icsData;
            
            // Check if the content is base64 encoded (data URL format)
            if (allOriginsData.contents.startsWith('data:')) {
                console.log('Decoding base64 calendar data...');
                const base64Data = allOriginsData.contents.split(',')[1];
                icsData = atob(base64Data);
            } else {
                console.log('Using plain text calendar data...');
                icsData = allOriginsData.contents;
            }
            
            // Validate that we received valid ICS data
            if (!icsData.includes('BEGIN:VCALENDAR')) {
                throw new Error('Received data is not valid ICS calendar format');
            }
            
            console.log('✅ Successfully fetched and validated calendar data');
            console.log(`Calendar contains ${icsData.split('BEGIN:VEVENT').length - 1} events`);

            this.parseICSData(icsData);
            this.renderEvents();
        } catch (error) {
            console.error('Error loading ICS calendar:', error);
            eventsList.innerHTML = `
                <div class="error-message">
                    <h3>Unable to load calendar events</h3>
                    <p>There was an error loading the calendar feed. This usually happens due to CORS restrictions.</p>
                    <div class="error-details">
                        <p><strong>Technical details:</strong> ${error.message}</p>
                        <p><strong>Possible solutions:</strong></p>
                        <ul>
                            <li>The calendar may be set to private - make sure it's public</li>
                            <li>The calendar URL may have changed</li>
                            <li>CORS proxy services may be temporarily unavailable</li>
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

                return {
                    id: index + 1,
                    title: event.summary || 'Untitled Event',
                    startDate: event.startDate.toJSDate(),
                    endDate: event.endDate.toJSDate(),
                    location: event.location || 'Location TBD',
                    description: event.description || 'No description available.',
                    organizer: organizer
                };
            });

            // Sort events by start date
            this.events.sort((a, b) => a.startDate - b.startDate);

        } catch (error) {
            console.error('Error parsing ICS data:', error);
            throw new Error('Failed to parse calendar data');
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
                weekday: 'long',
                year: 'numeric',
                month: 'long',
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

        return `
            <div class="event-card" data-event-id="${event.id}">
                <div class="event-header">
                    <div>
                        <h3 class="event-title">${event.title}</h3>
                    </div>
                </div>
                
                <div class="event-datetime">
                    <span>📅</span>
                    <span>${formatDate(event.startDate)} at ${formatTime(event.startDate)} - ${formatTime(event.endDate)}</span>
                </div>
                
                <div class="event-location">
                    <span>📍</span>
                    <span>${event.location}</span>
                </div>
                
                <p class="event-description">${event.description}</p>
                
                <div class="event-actions">
                    <button class="add-to-calendar" data-event-id="${event.id}">
                        Add to Calendar
                    </button>
                </div>
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
    }

    addEventToCalendar(eventId) {
        const event = this.events.find(e => e.id === eventId);
        if (!event) return;

        // Create a Google Calendar link for individual events
        const formatGoogleDate = (date) => {
            return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        };

        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formatGoogleDate(event.startDate)}/${formatGoogleDate(event.endDate)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;

        window.open(googleCalendarUrl, '_blank');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CalendarPage();
});
