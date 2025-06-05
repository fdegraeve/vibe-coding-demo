# GitHub Repository Viewer - Deployment Guide

This document provides instructions for deploying the GitHub Repository Viewer application.

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Deployment Options

### 1. Netlify

#### Option A: Drag and Drop
1. Run `npm run build`
2. Go to [Netlify](https://netlify.com)
3. Drag the `dist/` folder to the deploy area

#### Option B: Git Integration
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy

### 2. Vercel

#### CLI Deployment
```bash
npm install -g vercel
vercel --prod
```

#### Git Integration
1. Connect your repository to [Vercel](https://vercel.com)
2. Build command: `npm run build`
3. Output directory: `dist`
4. Deploy automatically on push

### 3. GitHub Pages

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### 4. Firebase Hosting

```bash
npm install -g firebase-tools
firebase init hosting
firebase deploy
```

Configuration in `firebase.json`:
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

## Environment Variables

For production deployments, you may want to set:

```bash
# GitHub API token (optional, increases rate limit)
VITE_GITHUB_TOKEN=your_github_token_here
```

## Performance Optimization

The build creates some large chunks. Consider:

1. **Code Splitting**: Implement dynamic imports for routes
2. **Bundle Analysis**: Use `npm run build -- --analyze`
3. **Chunk Optimization**: Configure Rollup manual chunks

## Domain Configuration

After deployment, you may want to:

1. Configure custom domain
2. Set up SSL certificate (usually automatic)
3. Configure redirects if needed
4. Set up analytics (Google Analytics, etc.)

## Monitoring

Consider setting up:
- Error tracking (Sentry, Bugsnag)
- Performance monitoring
- Uptime monitoring
- User analytics

## Security Headers

Add these headers for security:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

Most hosting platforms allow header configuration through their dashboard or config files.
