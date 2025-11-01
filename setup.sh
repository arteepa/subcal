#!/bin/bash

# Setup script for Nuxt 3 migration

set -e

echo "🚀 Setting up Nuxt 3 subcal application..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Create necessary directories
echo "📁 Creating public directory structure..."
mkdir -p public/assets/icons
mkdir -p public/assets/fonts
mkdir -p assets/fonts

# Copy assets to public directory
if [ -d "assets/icons" ]; then
    echo "📋 Copying icons to public directory..."
    cp -r assets/icons/* public/assets/icons/ 2>/dev/null || echo "⚠️  No icons to copy"
fi

if [ -f "assets/logo.png" ]; then
    echo "📋 Copying logos to public directory..."
    cp assets/logo.png public/assets/
    cp assets/logo@2x.png public/assets/ 2>/dev/null || echo "⚠️  No @2x logo found"
fi

if [ -f "example.ics" ]; then
    echo "📋 Copying example.ics to public directory..."
    cp example.ics public/
fi

if [ -f "assets/InstrumentSans.woff2" ]; then
    echo "📋 Copying font to assets directory..."
    cp assets/InstrumentSans.woff2 assets/fonts/
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env 2>/dev/null || cat > .env << EOF
NODE_ENV=development
NUXT_PUBLIC_DEVELOPMENT_MODE=true
EOF
    echo "✅ Created .env file"
else
    echo "✅ .env file already exists"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎉 You can now run the application:"
echo "   npm run dev          - Start development server"
echo "   npm run build        - Build for production"
echo "   npm run typecheck    - Run TypeScript type checking"
echo ""
echo "📚 Documentation:"
echo "   README.nuxt.md       - Full documentation"
echo "   MIGRATION.md         - Migration guide"
echo ""

