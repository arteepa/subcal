#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get the environment from command line args or default to production
const env = process.argv[2] || 'production';
const isDevelopment = env === 'development';

console.log(`Building for ${env} environment...`);

// Paths
const templatePath = path.join(__dirname, '..', 'js', 'config.template.js');
const configPath = path.join(__dirname, '..', 'js', 'config.js');

// Check if template exists, if not use the current config.js as template
let templateContent;
if (fs.existsSync(templatePath)) {
    templateContent = fs.readFileSync(templatePath, 'utf8');
} else {
    // Fallback: read current config and replace the value
    templateContent = fs.readFileSync(configPath, 'utf8');
    templateContent = templateContent.replace(
        /developmentMode:\s*(true|false)/,
        'developmentMode: __DEVELOPMENT_MODE__'
    );
}

// Replace the placeholder with the actual value
const developmentModeValue = isDevelopment ? 'true' : 'false';
const configContent = templateContent.replace(
    '__DEVELOPMENT_MODE__',
    developmentModeValue
);

// Write the updated config
fs.writeFileSync(configPath, configContent);

console.log(`✅ Set developmentMode to ${developmentModeValue}`);

// If this is a production build, we could add other optimizations here
if (!isDevelopment) {
    console.log('🚀 Production build complete - ready for deployment!');
} else {
    console.log('🛠️  Development build complete - ready for local testing!');
}
