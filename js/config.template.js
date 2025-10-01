// User and Calendar Configuration Template
// This file is used by the build script to generate the final config.js
export const userConfig = {
    // User Information
    username: "Pablo Rodriguez",
    avatar: "https://avatars.githubusercontent.com/u/1234567?v=4", // Placeholder avatar URL
    email: "pablo@example.com",
    
    // Calendar Configuration
    calendar: {
        // WebCal URL for calendar subscriptions (used for Apple Calendar, etc.)
        webCalUrl: 'webcal://calendar.google.com/calendar/ical/c_a323145e31d68becfab6a971a42df2462cdc130880df65e4c43754980f08b125%40group.calendar.google.com/public/basic.ics',
        
        // HTTP URL for fetching calendar data (used for API calls)
        httpUrl: 'https://calendar.google.com/calendar/ical/c_a323145e31d68becfab6a971a42df2462cdc130880df65e4c43754980f08b125%40group.calendar.google.com/public/basic.ics',
        
        // Calendar metadata
        name: "Pablo's Events Calendar",
        description: "Personal and professional events calendar",
        timezone: "America/New_York", // Default timezone
        color: "#4285f4" // Calendar color theme
    },
    
    // Social Links (optional)
    social: {
        github: "https://github.com/pablo",
        linkedin: "https://linkedin.com/in/pablo",
        twitter: "https://twitter.com/pablo"
    },
    
    // Application Settings
    settings: {
        theme: "light", // light or dark
        language: "en-US",
        dateFormat: "MM/DD/YYYY",
        timeFormat: "12h", // 12h or 24h
        
        // Development mode - set to true to load local example.ics file
        // Set to false for production to use remote calendar URLs
        developmentMode: __DEVELOPMENT_MODE__
    }
};

// Export individual parts for convenience
export const { username, avatar, email } = userConfig;
export const { calendar } = userConfig;
export const { social, settings } = userConfig;

// Default export for easy importing
export default userConfig;
