# Internationalization (i18n) Documentation

This document explains how internationalization is implemented in the GitHub Repository Viewer application.

## Overview

The application supports multiple languages using Vue I18n. Currently supported languages:
- **French (fr)** - Default language
- **English (en)** - Full translation available

## Implementation

### Setup

The i18n configuration is located in `/src/locales/`:

```
src/locales/
├── index.js    # Vue I18n configuration
├── fr.js       # French translations
└── en.js       # English translations
```

### Language Detection

The application automatically detects the user's preferred language using:
1. **localStorage** - Saved user preference
2. **Browser language** - Browser's default language
3. **Fallback** - French as default

### Usage in Components

Use the `$t()` function to translate strings:

```vue
<template>
  <h1>{{ $t('app.title') }}</h1>
  <p>{{ $t('search.description') }}</p>
</template>
```

In script setup:
```javascript
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
console.log(t('app.title'))
```

### Translation Keys Structure

```javascript
{
  app: {
    title: 'Application Title',
    toggleTheme: {
      dark: 'Switch to light theme',
      light: 'Switch to dark theme'
    }
  },
  search: {
    title: 'Search GitHub Repositories',
    placeholder: 'Enter GitHub username',
    button: 'Search Repositories'
  },
  // ... more keys
}
```

### Language Switching

Users can switch languages using the language toggle button in the app bar. The preference is automatically saved to localStorage.

## Adding New Languages

### 1. Create Translation File

Create a new file in `/src/locales/` (e.g., `es.js` for Spanish):

```javascript
export default {
  app: {
    title: 'Visualizador de Repositorios de GitHub',
    // ... all translations in Spanish
  }
}
```

### 2. Update Configuration

Add the new language to `/src/locales/index.js`:

```javascript
import es from './es.js'

export default createI18n({
  // ... existing config
  messages: {
    fr,
    en,
    es  // Add new language
  }
})
```

### 3. Update Language Selector

Modify the language toggle logic in `App.vue` to support multiple languages:

```javascript
const toggleLanguage = () => {
  const languages = ['fr', 'en', 'es']
  const currentIndex = languages.indexOf(locale.value)
  const nextIndex = (currentIndex + 1) % languages.length
  locale.value = languages[nextIndex]
  localStorage.setItem('preferred-language', locale.value)
}
```

## Date and Number Formatting

The application includes locale-aware formatting:

### Date Formatting
```javascript
const formatDate = (date) => {
  return new Date(date).toLocaleDateString(locale.value, {
    year: 'numeric',
    month: 'short', 
    day: 'numeric'
  })
}
```

### Number Formatting
```javascript
const formatNumber = (number) => {
  return new Intl.NumberFormat(locale.value).format(number)
}
```

## Best Practices

### 1. Translation Keys
- Use descriptive, hierarchical keys
- Group related translations
- Use dot notation for nesting

### 2. Pluralization
Vue I18n supports pluralization:
```javascript
{
  repository: 'repository | repositories'
}
```

Usage:
```vue
{{ $tc('repository', count) }}
```

### 3. Interpolation
Support dynamic content:
```javascript
{
  welcome: 'Welcome {name}!'
}
```

Usage:
```vue
{{ $t('welcome', { name: userName }) }}
```

### 4. Missing Translations
Configure fallback behavior in `/src/locales/index.js`:
```javascript
fallbackLocale: 'fr',
missingWarn: false,
fallbackWarn: false
```

## Testing Translations

1. **Manual Testing**: Use the language toggle to verify all strings
2. **Browser Testing**: Change browser language to test auto-detection
3. **Missing Keys**: Check browser console for missing translation warnings

## Contributing Translations

When adding new features:

1. **Add English keys** to `/src/locales/en.js`
2. **Add French keys** to `/src/locales/fr.js`
3. **Use translation keys** in components with `$t()`
4. **Test both languages** thoroughly

### Translation Guidelines

- Keep translations natural and contextual
- Maintain consistent terminology
- Consider cultural differences
- Keep UI text concise
- Use formal tone for professional contexts

## RTL Support

To add right-to-left language support:

1. Add RTL language files
2. Configure Vue I18n with `dir` attribute
3. Update CSS for RTL layouts
4. Test with RTL languages like Arabic or Hebrew

## Performance Considerations

- Translations are loaded synchronously at app startup
- Consider lazy loading for large translation files
- Use tree-shaking to remove unused translations in production
- Monitor bundle size when adding new languages

## Troubleshooting

### Common Issues

1. **Missing translations**: Check console for warnings
2. **Incorrect pluralization**: Verify plural rules for language
3. **Date formatting errors**: Ensure locale is valid
4. **Caching issues**: Clear localStorage and browser cache

### Debug Mode

Enable debug mode for development:
```javascript
createI18n({
  // ... config
  silentTranslationWarn: false,
  silentFallbackWarn: false
})
```
