export default {
  app: {
    title: 'Visualiseur de Dépôts GitHub',
    toggleTheme: {
      dark: 'Passer au thème clair',
      light: 'Passer au thème sombre'
    }
  },
  search: {
    title: 'Rechercher les dépôts GitHub',
    placeholder: 'Nom d\'utilisateur GitHub',
    hint: 'Entrez un nom d\'utilisateur GitHub valide',
    button: 'Rechercher les dépôts',
    noResults: 'Aucun résultat',
    noResultsDescription: 'Aucun dépôt ne correspond à votre recherche "{query}".',
    noRepositories: 'Aucun dépôt trouvé',
    noRepositoriesDescription: 'Cet utilisateur n\'a pas de dépôts publics ou le nom d\'utilisateur est incorrect.'
  },
  tabs: {
    repositories: 'Dépôts',
    statistics: 'Statistiques',
    training: 'Formation'
  },
  repositories: {
    searchPlaceholder: 'Rechercher dans les dépôts',
    sortBy: 'Trier par',
    sortOptions: {
      updated: 'Dernière mise à jour',
      created: 'Date de création',
      name: 'Nom (A-Z)',
      stars: 'Étoiles (↓)',
      forks: 'Forks (↓)'
    }
  },
  repositoryCard: {
    updatedAt: 'Mis à jour le',
    createdAt: 'Créé le',
    language: 'Langage',
    stars: 'étoiles',
    forks: 'forks',
    viewOnGithub: 'Voir sur GitHub',
    noDescription: 'Aucune description disponible'
  },
  userInfo: {
    repositories: 'dépôts',
    followers: 'followers',
    following: 'following'
  },
  statistics: {
    title: 'Statistiques de',
    overview: 'Vue d\'ensemble',
    totalRepos: 'Dépôts totaux',
    totalStars: 'Étoiles totales',
    totalForks: 'Forks totaux',
    mostUsedLanguage: 'Langage le plus utilisé',
    languages: {
      title: 'Répartition des langages',
      description: 'Distribution des langages de programmation utilisés'
    },
    activity: {
      title: 'Activité de commit',
      description: 'Nombre de commits par mois (derniers 12 mois)'
    },
    distribution: {
      title: 'Distribution Étoiles vs Forks',
      description: 'Répartition des étoiles et forks par dépôt'
    },
    topRepos: {
      title: 'Top 5 des dépôts populaires',
      description: 'Dépôts classés par nombre d\'étoiles'
    }
  },
  training: {
    title: 'Programme de Formation Personnalisé',
    subtitle: 'Basé sur l\'analyse de {count} dépôts de {user}',
    description: 'Voici un programme de formation personnalisé pour devenir contributeur efficace sur les projets utilisant les technologies identifiées.',
    detectedTech: 'Technologies Détectées',
    sortedByUsage: 'Triées par nombre d\'apparitions dans vos projets',
    project: 'projet',
    projects: 'projets',
    rank: 'Rang',
    mostUsed: 'Plus utilisée',
    duration: 'Durée estimée',
    modules: 'Modules',
    resources: 'Ressources recommandées',
    viewDetails: 'Voir le détail',
    tips: {
      title: 'Conseils pour Devenir un Contributeur Efficace',
      technical: {
        title: '🚀 Compétences Techniques',
        items: [
          'Maîtriser Git et GitHub (pull requests, issues, reviews)',
          'Comprendre les bonnes pratiques de code clean',
          'Apprendre les tests unitaires et d\'intégration',
          'Suivre les conventions de documentation'
        ]
      },
      collaborative: {
        title: '🤝 Compétences Collaboratives',
        items: [
          'Communication claire dans les issues et PR',
          'Respect des guidelines du projet',
          'Patience et réceptivité aux retours',
          'Contribution régulière et progressive'
        ]
      }
    },
    dialog: {
      detailedProgram: 'Programme Détaillé',
      learningGoals: 'Objectifs d\'apprentissage',
      prerequisites: 'Prérequis',
      certification: 'Certification possible',
      close: 'Fermer',
      startTraining: 'Commencer la formation'
    },
    programs: {
      javascript: {
        title: 'Maîtrise JavaScript/TypeScript',
        description: 'Devenez expert en JavaScript moderne et TypeScript pour contribuer aux projets open source.',
        modules: [
          'ES6+ et fonctionnalités modernes',
          'TypeScript avancé',
          'Patterns de design JavaScript',
          'Testing avec Jest/Mocha',
          'Bundlers et outils de build',
          'Contribution aux projets Node.js'
        ]
      },
      vue: {
        title: 'Développeur Expert Vue.js',
        description: 'Maîtrisez Vue.js 3, l\'écosystème et les meilleures pratiques pour les projets open source.',
        modules: [
          'Vue 3 Composition API',
          'Vuex/Pinia pour la gestion d\'état',
          'Vue Router avancé',
          'Testing des composants Vue',
          'Nuxt.js et SSR',
          'Contribution à l\'écosystème Vue'
        ]
      },
      python: {
        title: 'Contributeur Open Source Python',
        description: 'Développez vos compétences Python pour contribuer efficacement aux projets open source.',
        modules: [
          'Python avancé et bonnes pratiques',
          'Frameworks web (Django/Flask)',
          'Testing avec pytest',
          'Packaging et distribution',
          'Documentation avec Sphinx',
          'Contribution aux projets Python'
        ]
      },
      java: {
        title: 'Contributeur Enterprise Java',
        description: 'Maîtrisez Java et son écosystème pour contribuer aux projets enterprise.',
        modules: [
          'Java moderne (8+)',
          'Spring Framework',
          'Maven/Gradle',
          'Testing avec JUnit/Mockito',
          'Architecture microservices',
          'Contribution aux projets Apache'
        ]
      },
      react: {
        title: 'Spécialiste React/Next.js',
        description: 'Maîtrisez React, ses hooks, l\'écosystème et Next.js pour le développement moderne.',
        modules: [
          'React 18+ et nouvelles fonctionnalités',
          'Hooks avancés et custom hooks',
          'State management (Redux/Zustand)',
          'React Router et navigation',
          'Testing avec Jest et React Testing Library',
          'Next.js et SSR/SSG'
        ]
      },
      php: {
        title: 'Développeur Web PHP',
        description: 'Développez des applications web robustes avec PHP moderne, Laravel et Symfony.',
        modules: [
          'PHP 8+ et nouvelles fonctionnalités',
          'Programmation orientée objet avancée',
          'Laravel et Symfony frameworks',
          'API REST et GraphQL',
          'Testing avec PHPUnit',
          'Sécurité et best practices'
        ]
      },
      general: {
        title: 'Contributeur Open Source Général',
        description: 'Apprenez les fondamentaux pour contribuer à tout projet open source.',
        modules: [
          'Git et GitHub workflow',
          'Documentation technique',
          'Code review et collaboration',
          'Gestion de projet open source',
          'Licences et aspects légaux',
          'Community building'
        ]
      },
      git: {
        title: 'Git & GitHub Mastery',
        description: 'Maîtrisez Git et GitHub pour collaborer efficacement sur tout projet.',
        modules: [
          'Git fundamentals et workflow',
          'Branching strategies (GitFlow, GitHub Flow)',
          'Pull requests et code review',
          'Issues et project management',
          'GitHub Actions et CI/CD',
          'Conflict resolution et best practices'
        ]
      }
    }
  },
  errors: {
    userNotFound: 'L\'utilisateur "{username}" n\'existe pas sur GitHub.',
    rateLimited: 'Limite de taux d\'API GitHub atteinte. Veuillez réessayer plus tard.',
    generic: 'Une erreur est survenue lors de la récupération des données. Veuillez réessayer.'
  },
  common: {
    loading: 'Chargement...',
    error: 'Erreur',
    close: 'Fermer',
    ok: 'OK',
    cancel: 'Annuler'
  }
}
