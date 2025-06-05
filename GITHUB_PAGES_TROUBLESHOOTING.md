# GitHub Pages Deployment Troubleshooting

## Common Issues and Solutions

### 1. Permission Denied Error (403)

**Error Message:**
```
remote: Permission to username/repository.git denied to github-actions[bot]
fatal: unable to access 'https://github.com/username/repository.git/': The requested URL returned error: 403
```

**Solutions:**

#### Solution A: Update Workflow Permissions (Recommended)
1. Go to your repository on GitHub
2. Navigate to **Settings** → **Actions** → **General**
3. Under **Workflow permissions**, select:
   - ✅ **Read and write permissions**
   - ✅ **Allow GitHub Actions to create and approve pull requests**
4. Click **Save**

#### Solution B: Use GitHub Pages Actions Method
The main workflow (`ci.yml`) uses the modern GitHub Pages deployment method:
- Uses `actions/configure-pages@v4`
- Uses `actions/upload-pages-artifact@v3`
- Uses `actions/deploy-pages@v4`

This method doesn't require pushing to `gh-pages` branch and has better permission handling.

#### Solution C: Configure Pages Source
1. Go to **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions** (not "Deploy from a branch")
3. Save settings

### 2. Base URL Issues

If your site loads but assets are missing:

**Problem:** The app is deployed to `username.github.io/repository-name/` but configured for root path.

**Solution:** Update `vite.config.js`:
```javascript
export default defineConfig({
  base: '/your-repository-name/',
  // ... other config
})
```

Or use environment variable (already configured):
```bash
# In GitHub Actions, this is automatically set
NODE_ENV=production
```

### 3. 404 on Page Refresh

For single-page applications, you might get 404 errors when refreshing non-root pages.

**Solution:** Add a `404.html` file that redirects to `index.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <script>
    const path = window.location.pathname.slice(1);
    const query = window.location.search;
    window.location.replace('/?path=' + path + query);
  </script>
</head>
<body>
  <p>Redirecting...</p>
</body>
</html>
```

### 4. Build Failures

**Error:** Build fails in GitHub Actions but works locally.

**Solutions:**
- Ensure all dependencies are in `package.json`
- Check Node.js version compatibility
- Verify environment variables
- Check for case-sensitive file paths

### 5. Manual Deployment Alternative

If GitHub Actions deployment fails, you can deploy manually:

```bash
# Install dependencies
npm install

# Install gh-pages globally or locally
npm install gh-pages --save-dev

# Build and deploy
npm run deploy
```

## Verification Steps

After deployment, verify:

1. **Repository Settings:**
   - Go to Settings → Pages
   - Source should be "GitHub Actions" or "gh-pages branch"
   - Custom domain (if applicable)

2. **Workflow Status:**
   - Check Actions tab for workflow status
   - Review logs for any errors
   - Ensure all jobs completed successfully

3. **Site Accessibility:**
   - Visit `https://username.github.io/repository-name/`
   - Test navigation and functionality
   - Check browser console for errors

## Environment Variables

For GitHub Actions deployment, these are automatically available:

```yaml
env:
  NODE_ENV: production
  GITHUB_REPOSITORY: ${{ github.repository }}
  GITHUB_REF: ${{ github.ref }}
```

## Custom Domain Setup

To use a custom domain:

1. Add `CNAME` file to `public/` directory:
   ```
   your-domain.com
   ```

2. Update DNS settings:
   - Add CNAME record pointing to `username.github.io`
   - Or A records pointing to GitHub Pages IPs

3. Configure in repository settings:
   - Go to Settings → Pages
   - Add custom domain
   - Enable "Enforce HTTPS"

## Contact

If issues persist:
1. Check [GitHub Pages documentation](https://docs.github.com/en/pages)
2. Review [GitHub Actions documentation](https://docs.github.com/en/actions)
3. Open an issue in the repository
