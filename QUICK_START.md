# Quick Start Guide

Get the GitHub Repository Viewer up and running in minutes!

## 🚀 Quick Setup

```bash
# Clone the repository
git clone <repository-url>
cd github-ia-labs

# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5173 in your browser.

## 🎯 First Steps

1. **Enter a GitHub username** in the search field
2. **Click "Search Repositories"** to fetch data
3. **Explore the tabs:**
   - **Repositories**: Browse all repos with search/filter
   - **Statistics**: View interactive charts and analytics
   - **Training**: Get personalized learning recommendations

## 🌍 Language Support

- **Toggle language** using the FR/EN button in the top bar
- **Automatic detection** based on browser settings
- **Persistent preference** saved in localStorage

## 🎨 Themes

- **Toggle theme** using the sun/moon icon
- **System preference** detection
- **Material Design** consistent styling

## 📱 Features Overview

### Repository Analysis
- Complete repository listing with metadata
- Search and filter capabilities
- Sort by stars, forks, date, or name
- Direct GitHub links

### Interactive Statistics
- Language distribution pie chart
- Stars vs forks scatter plot
- Repository timeline
- Top repositories ranking

### Training Programs
- Technology-based learning suggestions
- Structured skill progression
- Resource links and documentation
- Multiple programming languages supported

## 🔧 Configuration

### Optional: GitHub Token
For increased API rate limits, create a `.env` file:

```bash
VITE_GITHUB_TOKEN=your_github_personal_access_token
```

### Rate Limits
- **Without token**: 60 requests/hour
- **With token**: 5,000 requests/hour

## 🛠️ Development

### Project Structure
```
src/
├── components/          # Vue components
├── locales/            # i18n translations
├── App.vue            # Main application
├── main.js           # Entry point
└── style.css         # Global styles
```

### Adding Features
1. Create component in `src/components/`
2. Add translations to `src/locales/fr.js` and `src/locales/en.js`
3. Import and use in `App.vue` or other components
4. Test in both languages and themes

### Build for Production
```bash
npm run build
```

## 🎓 Learning

This project demonstrates:
- **Vue.js 3** with Composition API
- **Vuetify 3** Material Design components
- **Vue I18n** internationalization
- **Chart.js** data visualization
- **Axios** HTTP client
- **Responsive design** principles

## 📚 Resources

- [Vue.js Documentation](https://vuejs.org/)
- [Vuetify Documentation](https://vuetifyjs.com/)
- [Vue I18n Guide](https://vue-i18n.intlify.dev/)
- [GitHub API Documentation](https://docs.github.com/en/rest)

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines.

## 🚀 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for hosting options.

---

Happy coding! 🎉
