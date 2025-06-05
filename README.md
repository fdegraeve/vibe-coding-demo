# GitHub Repository Viewer

A modern Vue.js application with Material Design to explore GitHub repositories of any user.

## ✨ Features

- 🔍 **GitHub User Search** by username
- 📊 **Detailed Statistics** with interactive Chart.js visualizations
- 📈 **Visual Analytics** including language distribution, stars, and forks
- 🏆 **Top Repositories** ranking by popularity
- 📊 **Timeline Charts** showing repository creation activity over time
- 🎓 **Personalized Training Programs** with technology-based recommendations
- 📚 **Learning Resources** with links to courses and certifications
- 🌐 **Multilingual Support** available in French and English
- 📁 Complete list of public repositories with search and sorting
- 🎨 **Material Design Interface** powered by Vuetify
- 📱 **Responsive Design** for all devices
- 🌓 **Light/Dark Theme** toggle
- ⭐ **Repository Statistics** display (stars, forks, languages)
- 🚀 **Optimized Performance** with Vite

## 🛠️ Tech Stack

- **Vue.js 3** - Progressive JavaScript framework
- **Vuetify 3** - Material Design framework for Vue.js
- **Vue I18n** - Internationalization and translation
- **Vite** - Fast build tool
- **Axios** - HTTP client for API calls
- **Chart.js & vue-chartjs** - Interactive charting libraries
- **Material Design Icons** - Icon set

## 🚀 Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd github-ia-labs

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
# Development
npm run dev

# Production build
npm run build

# Build preview
npm run preview
```

## 📖 Usage

1. Open the application in your browser
2. Enter a GitHub username in the search field
3. Click "Search Repositories"
4. Explore the profile information and repository list
5. Navigate through different tabs to view:
   - **Repositories**: Complete list with search and filtering
   - **Statistics**: Interactive charts and analytics
   - **Training Programs**: Personalized learning recommendations
6. Use the language toggle (FR/EN) to switch between French and English
7. Toggle between light and dark themes

## 🌍 Internationalization

The application supports multiple languages:
- **French (Français)** - Default language
- **English** - Full translation available

The language is automatically detected from browser settings and can be manually switched using the language toggle in the top navigation bar.

## 🎨 Features Overview

### Repository Analysis
- Complete repository listing with metadata
- Advanced search and filtering capabilities
- Sorting by stars, forks, update date, and creation date
- Direct links to GitHub repositories

### Interactive Statistics
- **Language Distribution** pie chart
- **Stars vs Forks** scatter plot
- **Repository Creation Timeline** over the years
- **Top Repositories** ranking with visual indicators

### Training Programs
- **Technology-based recommendations** based on detected languages
- **Structured learning paths** for JavaScript, Vue.js, Python, Java
- **Resource links** to documentation, courses, and tutorials
- **Skill progression** from beginner to advanced levels

## 🔧 Configuration

The application uses GitHub's public API which has a rate limit of 60 requests per hour for unauthenticated users. To increase this limit, you can configure a GitHub personal access token.

### Environment Variables (Optional)
```bash
# .env file
VITE_GITHUB_TOKEN=your_github_personal_access_token
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── RepositoryCard.vue      # Individual repository display
│   ├── UserStats.vue           # Statistics and charts
│   └── TrainingPrograms.vue    # Learning recommendations
├── locales/
│   ├── fr.js                   # French translations
│   ├── en.js                   # English translations
│   └── index.js                # i18n configuration
├── App.vue                     # Main application component
├── main.js                     # Application entry point
└── style.css                   # Global styles
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🚀 Deployment

### GitHub Pages (Automated)
The repository includes GitHub Actions workflows for automatic deployment:

1. **Main Workflow** (`ci.yml`) - Uses modern GitHub Pages Actions
2. **Legacy Workflow** (`deploy-legacy.yml`) - Alternative deployment method

**Setup:**
1. Go to Repository Settings → Pages
2. Source: Select "GitHub Actions"
3. Push to `main` branch triggers deployment

**Troubleshooting:** See [GITHUB_PAGES_TROUBLESHOOTING.md](GITHUB_PAGES_TROUBLESHOOTING.md)

### Manual Deployment
```bash
# Quick deploy to GitHub Pages
npm run deploy

# Or step by step
npm run build
npx gh-pages -d dist
```

### Other Platforms
```bash
npm run build
```
Deploy the `dist/` directory to:
- **Netlify** - Drag & drop or Git integration
- **Vercel** - Import GitHub repository
- **Firebase Hosting** - `firebase deploy`
- **Surge.sh** - `surge dist/`

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub or contact the maintainers.

---

Made with ❤️ using Vue.js and Material Design
