#!/bin/bash

# Pre-deployment test script
# This script runs basic checks before deploying

echo "🚀 Running pre-deployment checks..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Run build
echo "🔨 Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build completed successfully"

# Check if dist directory exists
if [ ! -d "dist" ]; then
    echo "❌ dist directory not found"
    exit 1
fi

# Check if main files exist
if [ ! -f "dist/index.html" ]; then
    echo "❌ index.html not found in dist"
    exit 1
fi

echo "✅ All required files generated"

# Count generated files
file_count=$(find dist -type f | wc -l)
echo "📊 Generated $file_count files in dist/"

# Check file sizes
total_size=$(du -sh dist | cut -f1)
echo "📊 Total build size: $total_size"

echo ""
echo "🎉 Pre-deployment checks passed!"
echo "🚀 Ready to deploy!"

# Optional: Preview the build
read -p "🔍 Do you want to preview the build? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌐 Starting preview server..."
    npm run preview
fi
