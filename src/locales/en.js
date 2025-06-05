export default {
  app: {
    title: 'GitHub Repository Viewer',
    toggleTheme: {
      dark: 'Switch to light theme',
      light: 'Switch to dark theme'
    }
  },
  search: {
    title: 'Search GitHub Repositories',
    placeholder: 'GitHub username',
    hint: 'Enter a valid GitHub username',
    button: 'Search Repositories',
    noResults: 'No Results',
    noResultsDescription: 'No repositories match your search "{query}".',
    noRepositories: 'No Repositories Found',
    noRepositoriesDescription: 'This user has no public repositories or the username is incorrect.'
  },
  tabs: {
    repositories: 'Repositories',
    statistics: 'Statistics',
    training: 'Training'
  },
  repositories: {
    searchPlaceholder: 'Search repositories',
    sortBy: 'Sort by',
    sortOptions: {
      updated: 'Last updated',
      created: 'Creation date',
      name: 'Name (A-Z)',
      stars: 'Stars (↓)',
      forks: 'Forks (↓)'
    }
  },
  repositoryCard: {
    updatedAt: 'Updated on',
    createdAt: 'Created on',
    language: 'Language',
    stars: 'stars',
    forks: 'forks',
    viewOnGithub: 'View on GitHub',
    noDescription: 'No description available'
  },
  userInfo: {
    repositories: 'repositories',
    followers: 'followers',
    following: 'following'
  },
  statistics: {
    title: 'Statistics for',
    overview: 'Overview',
    totalRepos: 'Total Repositories',
    totalStars: 'Total Stars',
    totalForks: 'Total Forks',
    mostUsedLanguage: 'Most Used Language',
    languages: {
      title: 'Languages Distribution',
      description: 'Distribution of programming languages used'
    },
    activity: {
      title: 'Commit Activity',
      description: 'Number of commits per month (last 12 months)'
    },
    distribution: {
      title: 'Stars vs Forks Distribution',
      description: 'Distribution of stars and forks per repository'
    },
    topRepos: {
      title: 'Top 5 Popular Repositories',
      description: 'Repositories ranked by number of stars'
    }
  },
  training: {
    title: 'Personalized Training Program',
    subtitle: 'Based on analysis of {count} repositories from {user}',
    description: 'Here is a personalized training program to become an effective contributor to projects using the identified technologies.',
    detectedTech: 'Detected Technologies',
    sortedByUsage: 'Sorted by number of appearances in your projects',
    project: 'project',
    projects: 'projects',
    rank: 'Rank',
    mostUsed: 'Most used',
    duration: 'Estimated duration',
    modules: 'Modules',
    resources: 'Recommended resources',
    viewDetails: 'View details',
    tips: {
      title: 'Tips to Become an Effective Contributor',
      technical: {
        title: '🚀 Technical Skills',
        items: [
          'Master Git and GitHub (pull requests, issues, reviews)',
          'Understand clean code best practices',
          'Learn unit and integration testing',
          'Follow documentation conventions'
        ]
      },
      collaborative: {
        title: '🤝 Collaborative Skills',
        items: [
          'Clear communication in issues and PRs',
          'Respect project guidelines',
          'Patience and receptiveness to feedback',
          'Regular and progressive contribution'
        ]
      }
    },
    dialog: {
      detailedProgram: 'Detailed Program',
      learningGoals: 'Learning objectives',
      prerequisites: 'Prerequisites',
      certification: 'Possible certification',
      close: 'Close',
      startTraining: 'Start training'
    },
    programs: {
      javascript: {
        title: 'JavaScript/TypeScript Mastery',
        description: 'Become an expert in modern JavaScript and TypeScript to contribute to open source projects.',
        modules: [
          'ES6+ and modern features',
          'Advanced TypeScript',
          'JavaScript design patterns',
          'Testing with Jest/Mocha',
          'Bundlers and build tools',
          'Contributing to Node.js projects'
        ]
      },
      vue: {
        title: 'Vue.js Expert Developer',
        description: 'Master Vue.js 3, its ecosystem and best practices for open source projects.',
        modules: [
          'Vue 3 Composition API',
          'Vuex/Pinia for state management',
          'Advanced Vue Router',
          'Vue component testing',
          'Nuxt.js and SSR',
          'Contributing to Vue ecosystem'
        ]
      },
      python: {
        title: 'Python Open Source Contributor',
        description: 'Develop your Python skills to effectively contribute to open source projects.',
        modules: [
          'Advanced Python and best practices',
          'Web frameworks (Django/Flask)',
          'Testing with pytest',
          'Packaging and distribution',
          'Documentation with Sphinx',
          'Contributing to Python projects'
        ]
      },
      java: {
        title: 'Java Enterprise Contributor',
        description: 'Master Java and its ecosystem to contribute to enterprise projects.',
        modules: [
          'Modern Java (8+)',
          'Spring Framework',
          'Maven/Gradle',
          'Testing with JUnit/Mockito',
          'Microservices architecture',
          'Contributing to Apache projects'
        ]
      },
      react: {
        title: 'React/Next.js Specialist',
        description: 'Master React, its hooks, ecosystem and Next.js for modern development.',
        modules: [
          'React 18+ and new features',
          'Advanced hooks and custom hooks',
          'State management (Redux/Zustand)',
          'React Router and navigation',
          'Testing with Jest and React Testing Library',
          'Next.js and SSR/SSG'
        ]
      },
      php: {
        title: 'PHP Web Developer',
        description: 'Develop robust web applications with modern PHP, Laravel and Symfony.',
        modules: [
          'PHP 8+ and new features',
          'Advanced object-oriented programming',
          'Laravel and Symfony frameworks',
          'REST APIs and GraphQL',
          'Testing with PHPUnit',
          'Security and best practices'
        ]
      },
      general: {
        title: 'General Open Source Contributor',
        description: 'Learn the fundamentals to contribute to any open source project.',
        modules: [
          'Git and GitHub workflow',
          'Technical documentation',
          'Code review and collaboration',
          'Open source project management',
          'Licenses and legal aspects',
          'Community building'
        ]
      },
      git: {
        title: 'Git & GitHub Mastery',
        description: 'Master Git and GitHub to collaborate effectively on any project.',
        modules: [
          'Git fundamentals and workflow',
          'Branching strategies (GitFlow, GitHub Flow)',
          'Pull requests and code review',
          'Issues and project management',
          'GitHub Actions and CI/CD',
          'Conflict resolution and best practices'
        ]
      }
    }
  },
  errors: {
    userNotFound: 'User "{username}" does not exist on GitHub.',
    rateLimited: 'GitHub API rate limit reached. Please try again later.',
    generic: 'An error occurred while fetching data. Please try again.'
  },
  common: {
    loading: 'Loading...',
    error: 'Error',
    close: 'Close',
    ok: 'OK',
    cancel: 'Cancel'
  }
}
