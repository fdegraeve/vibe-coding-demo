# Contributing to GitHub Repository Viewer

Thank you for your interest in contributing to this project! We welcome contributions from developers of all skill levels.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/github-ia-labs.git
   cd github-ia-labs
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```

## Development Guidelines

### Code Style
- Use Vue 3 Composition API
- Follow Vue.js best practices
- Use Vuetify components for UI consistency
- Maintain Material Design principles
- Write semantic HTML and accessible code

### Internationalization
- All user-facing text must be translatable
- Add new translations to both `/src/locales/fr.js` and `/src/locales/en.js`
- Use the `$t()` function for all displayed text
- Test in both French and English languages

### Component Structure
- Keep components focused and reusable
- Use proper prop validation
- Document complex components with JSDoc comments
- Follow the existing file structure

### Testing
- Test your changes thoroughly
- Verify functionality in both light and dark themes
- Test responsiveness on different screen sizes
- Ensure GitHub API integration works correctly

## Making Changes

1. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the guidelines above

3. **Test your changes**:
   ```bash
   npm run build
   npm run preview
   ```

4. **Commit your changes** with a clear message:
   ```bash
   git commit -m "Add: brief description of your changes"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub with:
   - Clear description of changes
   - Screenshots if UI changes are involved
   - Testing instructions

## Types of Contributions

### Bug Reports
- Use the GitHub issue template
- Include steps to reproduce
- Provide browser and OS information
- Include screenshots when relevant

### Feature Requests
- Describe the problem you're trying to solve
- Explain your proposed solution
- Consider backward compatibility
- Discuss potential implementation approaches

### Code Contributions
- New features and enhancements
- Bug fixes
- Performance improvements
- Documentation updates
- Translation improvements

## Development Environment

### Required Tools
- Node.js (v16 or higher)
- npm or yarn
- Git
- A modern code editor (VS Code recommended)

### Recommended VS Code Extensions
- Vue Language Features (Volar)
- TypeScript Vue Plugin (Volar)
- Material Icon Theme
- GitLens

## Project Structure

```
src/
├── components/          # Vue components
│   ├── RepositoryCard.vue
│   ├── UserStats.vue
│   └── TrainingPrograms.vue
├── locales/            # Internationalization
│   ├── fr.js          # French translations
│   ├── en.js          # English translations
│   └── index.js       # i18n configuration
├── App.vue            # Main application
├── main.js           # Application entry point
└── style.css         # Global styles
```

## Questions?

If you have questions about contributing, feel free to:
- Open an issue for discussion
- Contact the maintainers
- Check existing issues and pull requests

Thank you for contributing to make this project better! 🚀
