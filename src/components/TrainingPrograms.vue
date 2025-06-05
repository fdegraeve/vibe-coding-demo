<template>
  <v-container>
    <!-- Introduction -->
    <v-row>
      <v-col cols="12">
        <v-card elevation="2" class="pa-6 mb-6">
          <v-card-title class="text-h4 text-center mb-4">
            <v-icon color="primary" size="48" class="mr-3">mdi-school</v-icon>
            {{ $t('training.title') }}
          </v-card-title>
          <v-card-text class="text-center">
            <p class="text-h6 mb-3">
              {{ $t('training.subtitle', { count: repositories.length, user: userInfo.login }) }}
            </p>
            <p class="text-body-1 text-grey-darken-1">
              {{ $t('training.description') }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Detected technologies -->
    <v-row>
      <v-col cols="12">
        <v-card elevation="2" class="pa-4 mb-6">
          <v-card-title class="text-h5 mb-4">
            <v-icon class="mr-2">mdi-code-tags</v-icon>
            {{ $t('training.detectedTech') }}
          </v-card-title>
          <v-card-subtitle class="text-body-2 mb-3">
            {{ $t('training.sortedByUsage') }}
          </v-card-subtitle>
          <v-chip-group>
            <v-chip
              v-for="(count, tech, index) in detectedTechnologies"
              :key="tech"
              :color="getTechColor(tech)"
              :variant="index < 3 ? 'elevated' : 'flat'"
              :size="index === 0 ? 'x-large' : index < 3 ? 'large' : 'default'"
              class="ma-1"
              :class="index < 3 ? 'text-h6 font-weight-bold' : ''"
            >
              <v-icon start :size="index < 3 ? 'large' : 'default'">{{ getTechIcon(tech) }}</v-icon>
              {{ tech }}
              <v-chip
                :color="index < 3 ? 'white' : 'grey-lighten-3'"
                :text-color="index < 3 ? getTechColor(tech) : 'grey-darken-2'"
                size="small"
                class="ml-2"
              >
                {{ count }} {{ count > 1 ? $t('training.projects') : $t('training.project') }}
              </v-chip>
              <v-tooltip activator="parent" location="top">
                {{ $t('training.rank') }} #{{ index + 1 }} - {{ $t('training.mostUsed') }}
              </v-tooltip>
            </v-chip>
          </v-chip-group>
        </v-card>
      </v-col>
    </v-row>

    <!-- Programmes de formation -->
    <v-row>
      <v-col
        v-for="program in trainingPrograms"
        :key="program.id"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card elevation="3" class="h-100 d-flex flex-column training-card">
          <v-card-title class="text-h5 text-white" :style="{ backgroundColor: program.color }">
            <v-icon class="mr-2" color="white">{{ program.icon }}</v-icon>
            {{ program.title }}
          </v-card-title>

          <v-card-subtitle class="pa-4">
            <v-chip :color="program.level.color" size="small" class="mb-2">
              {{ program.level.text }}
            </v-chip>
            <div class="text-caption">
              {{ $t('training.duration') }}: {{ program.duration }}
            </div>
          </v-card-subtitle>

          <v-card-text class="flex-grow-1 pa-4">
            <p class="text-body-2 mb-4">{{ program.description }}</p>

            <v-expansion-panels variant="accordion" class="mb-4">
              <v-expansion-panel>
                <v-expansion-panel-title>
                  <v-icon class="mr-2">mdi-format-list-bulleted</v-icon>
                  {{ $t('training.modules') }} ({{ program.modules.length }})
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-list density="compact">
                    <v-list-item
                      v-for="(module, index) in program.modules"
                      :key="index"
                      class="pa-2"
                    >
                      <template v-slot:prepend>
                        <v-icon size="small" color="primary">mdi-check-circle</v-icon>
                      </template>
                      <v-list-item-title class="text-body-2">
                        {{ module }}
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>

            <div class="mb-3">
              <h4 class="text-subtitle-1 mb-2">
                <v-icon class="mr-1" size="small">mdi-link</v-icon>
                {{ $t('training.resources') }}:
              </h4>
              <v-list density="compact">
                <v-list-item
                  v-for="resource in program.resources"
                  :key="resource.name"
                  :href="resource.url"
                  target="_blank"
                  class="pa-1"
                >
                  <template v-slot:prepend>
                    <v-icon :color="resource.type === 'free' ? 'success' : 'warning'" size="small">
                      {{ resource.type === 'free' ? 'mdi-currency-usd-off' : 'mdi-currency-usd' }}
                    </v-icon>
                  </template>
                  <v-list-item-title class="text-caption">
                    {{ resource.name }}
                  </v-list-item-title>
                  <template v-slot:append>
                    <v-icon size="small">mdi-open-in-new</v-icon>
                  </template>
                </v-list-item>
              </v-list>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- General tips -->
    <v-row class="mt-6">
      <v-col cols="12">
        <v-card elevation="2" class="pa-6">
          <v-card-title class="text-h5 mb-4">
            <v-icon class="mr-2" color="info">mdi-lightbulb</v-icon>
            {{ $t('training.tips.title') }}
          </v-card-title>

          <v-row>
            <v-col cols="12" md="6">
              <h4 class="text-h6 mb-3">{{ currentLocale === 'fr' ? '🚀 Compétences Techniques' : '🚀 Technical Skills' }}</h4>
              <ul class="text-body-2">
                <li v-for="(item, index) in getTechnicalTips()" :key="`tech-${index}`" class="mb-2">
                  {{ item }}
                </li>
              </ul>
            </v-col>
            <v-col cols="12" md="6">
              <h4 class="text-h6 mb-3">{{ currentLocale === 'fr' ? '🤝 Compétences Collaboratives' : '🤝 Collaborative Skills' }}</h4>
              <ul class="text-body-2">
                <li v-for="(item, index) in getCollaborativeTips()" :key="`collab-${index}`" class="mb-2">
                  {{ item }}
                </li>
              </ul>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const props = defineProps({
  repositories: {
    type: Array,
    required: true
  },
  userInfo: {
    type: Object,
    required: true
  }
})

// Computed property pour la locale actuelle
const currentLocale = computed(() => locale.value)

// Fonctions pour obtenir les conseils selon la langue
const getTechnicalTips = () => {
  const tips = {
    fr: [
      'Maîtriser Git et GitHub (pull requests, issues, reviews)',
      'Comprendre les bonnes pratiques de code clean',
      'Apprendre les tests unitaires et d\'intégration',
      'Suivre les conventions de documentation'
    ],
    en: [
      'Master Git and GitHub (pull requests, issues, reviews)',
      'Understand clean code best practices',
      'Learn unit and integration testing',
      'Follow documentation conventions'
    ]
  }
  return tips[locale.value] || tips.fr
}

const getCollaborativeTips = () => {
  const tips = {
    fr: [
      'Communication claire dans les issues et PR',
      'Respect des guidelines du projet',
      'Patience et réceptivité aux retours',
      'Contribution régulière et progressive'
    ],
    en: [
      'Clear communication in issues and PRs',
      'Respect project guidelines',
      'Patience and receptiveness to feedback',
      'Regular and progressive contribution'
    ]
  }
  return tips[locale.value] || tips.fr
}

// Fonction pour obtenir les modules traduits - VERSION ÉTENDUE
const getModules = (programType) => {
  const currentLang = locale.value

  const modules = {
    javascript: {
      fr: [
        'ES6+ et nouvelles fonctionnalités (async/await, modules, classes)',
        'Programmation asynchrone avancée (Promises, event loop)',
        'TypeScript fundamentals et types avancés',
        'Testing avec Jest/Vitest et testing intégration',
        'Performance et optimisation (bundling, lazy loading)',
        'Design patterns en JavaScript (Module, Observer, etc.)',
        'Node.js et développement backend',
        'Framework modernes (React, Vue, Angular)',
        'Outils de développement (ESLint, Prettier, Babel)'
      ],
      en: [
        'ES6+ and modern features (async/await, modules, classes)',
        'Advanced asynchronous programming (Promises, event loop)',
        'TypeScript fundamentals and advanced types',
        'Testing with Jest/Vitest and integration testing',
        'Performance and optimization (bundling, lazy loading)',
        'JavaScript design patterns (Module, Observer, etc.)',
        'Node.js and backend development',
        'Modern frameworks (React, Vue, Angular)',
        'Development tools (ESLint, Prettier, Babel)'
      ]
    },
    vue: {
      fr: [
        'Vue 3 Composition API et Reactivity System',
        'Vuex/Pinia state management avancé',
        'Vue Router avancé et navigation guards',
        'Testing de composants avec Vue Test Utils',
        'SSR avec Nuxt.js et optimisation SEO',
        'Performance et optimisation (virtual scrolling, memoization)',
        'Écosystème Vue (Vuetify, Quasar, Element Plus)',
        'Migration Vue 2 vers Vue 3',
        'Microservices frontend avec Module Federation'
      ],
      en: [
        'Vue 3 Composition API and Reactivity System',
        'Advanced Vuex/Pinia state management',
        'Advanced Vue Router and navigation guards',
        'Component testing with Vue Test Utils',
        'SSR with Nuxt.js and SEO optimization',
        'Performance and optimization (virtual scrolling, memoization)',
        'Vue ecosystem (Vuetify, Quasar, Element Plus)',
        'Vue 2 to Vue 3 migration',
        'Frontend microservices with Module Federation'
      ]
    },
    python: {
      fr: [
        'Python fondamentaux et OOP avancée',
        'Testing avec pytest, unittest et mocking',
        'Packaging et distribution (setuptools, wheel, PyPI)',
        'Documentation avec Sphinx et docstrings',
        'CI/CD avec GitHub Actions et tests automatisés',
        'Code quality avec pylint, black, mypy',
        'Web frameworks (Django, Flask, FastAPI)',
        'Data science avec pandas, numpy, matplotlib',
        'Async programming avec asyncio et aiohttp'
      ],
      en: [
        'Python fundamentals and advanced OOP',
        'Testing with pytest, unittest and mocking',
        'Packaging and distribution (setuptools, wheel, PyPI)',
        'Documentation with Sphinx and docstrings',
        'CI/CD with GitHub Actions and automated testing',
        'Code quality with pylint, black, mypy',
        'Web frameworks (Django, Flask, FastAPI)',
        'Data science with pandas, numpy, matplotlib',
        'Async programming with asyncio and aiohttp'
      ]
    },
    java: {
      fr: [
        'Java 11+ et nouvelles fonctionnalités (Records, Pattern Matching)',
        'Spring Boot et Spring Framework ecosystem',
        'Microservices architecture et patterns',
        'JUnit 5 et testing avancé (Mockito, TestContainers)',
        'Maven/Gradle et build automation avancée',
        'Performance tuning et JVM optimization',
        'Jakarta EE et enterprise patterns',
        'Reactive programming avec Spring WebFlux',
        'Cloud native avec Spring Cloud et Kubernetes'
      ],
      en: [
        'Java 11+ and new features (Records, Pattern Matching)',
        'Spring Boot and Spring Framework ecosystem',
        'Microservices architecture and patterns',
        'JUnit 5 and advanced testing (Mockito, TestContainers)',
        'Advanced Maven/Gradle and build automation',
        'Performance tuning and JVM optimization',
        'Jakarta EE and enterprise patterns',
        'Reactive programming with Spring WebFlux',
        'Cloud native with Spring Cloud and Kubernetes'
      ]
    },
    react: {
      fr: [
        'React 18+ et nouvelles fonctionnalités (Concurrent Features)',
        'Hooks avancés et custom hooks patterns',
        'State management (Redux Toolkit, Zustand, Jotai)',
        'React Router v6 et navigation avancée',
        'Testing avec Jest et React Testing Library',
        'Next.js et SSR/SSG/ISR patterns',
        'Performance et optimisation (React.memo, useMemo, Suspense)',
        'React Server Components et architecture moderne',
        'Mobile avec React Native et Expo'
      ],
      en: [
        'React 18+ and new features (Concurrent Features)',
        'Advanced hooks and custom hooks patterns',
        'State management (Redux Toolkit, Zustand, Jotai)',
        'React Router v6 and advanced navigation',
        'Testing with Jest and React Testing Library',
        'Next.js and SSR/SSG/ISR patterns',
        'Performance and optimization (React.memo, useMemo, Suspense)',
        'React Server Components and modern architecture',
        'Mobile with React Native and Expo'
      ]
    },
    php: {
      fr: [
        'PHP 8+ et nouvelles fonctionnalités (Union Types, Attributes)',
        'Programmation orientée objet avancée et design patterns',
        'Laravel et Symfony frameworks mastery',
        'API REST et GraphQL avec Lighthouse/API Platform',
        'Testing avec PHPUnit et pest',
        'Sécurité et best practices (OWASP Top 10)',
        'Performance et caching (Redis, Memcached, OPcache)',
        'Deployment et DevOps (Docker, CI/CD)',
        'Microservices et architecture hexagonale'
      ],
      en: [
        'PHP 8+ and new features (Union Types, Attributes)',
        'Advanced object-oriented programming and design patterns',
        'Laravel and Symfony frameworks mastery',
        'REST APIs and GraphQL with Lighthouse/API Platform',
        'Testing with PHPUnit and pest',
        'Security and best practices (OWASP Top 10)',
        'Performance and caching (Redis, Memcached, OPcache)',
        'Deployment and DevOps (Docker, CI/CD)',
        'Microservices and hexagonal architecture'
      ]
    },
    go: {
      fr: [
        'Go fundamentals et syntaxe idiomatique',
        'Concurrency avec goroutines et channels',
        'HTTP servers et clients avec net/http',
        'Testing avec le package testing et testify',
        'Dependency management avec Go modules',
        'Performance profiling avec pprof',
        'Frameworks web (Gin, Fiber, Echo)',
        'Database access avec GORM et sqlx',
        'Docker et deployment cloud-native',
        'Microservices et gRPC'
      ],
      en: [
        'Go fundamentals and idiomatic syntax',
        'Concurrency with goroutines and channels',
        'HTTP servers and clients with net/http',
        'Testing with testing package and testify',
        'Dependency management with Go modules',
        'Performance profiling with pprof',
        'Web frameworks (Gin, Fiber, Echo)',
        'Database access with GORM and sqlx',
        'Docker and cloud-native deployment',
        'Microservices and gRPC'
      ]
    },
    rust: {
      fr: [
        'Ownership, borrowing et lifetime management',
        'Pattern matching et error handling',
        'Traits et génériques avancés',
        'Async programming avec tokio',
        'Web development avec Actix/Rocket/Axum',
        'Testing et benchmarking',
        'Unsafe Rust et FFI',
        'WebAssembly avec wasm-pack',
        'Performance et memory safety',
        'Cargo et ecosystem'
      ],
      en: [
        'Ownership, borrowing and lifetime management',
        'Pattern matching and error handling',
        'Advanced traits and generics',
        'Async programming with tokio',
        'Web development with Actix/Rocket/Axum',
        'Testing and benchmarking',
        'Unsafe Rust and FFI',
        'WebAssembly with wasm-pack',
        'Performance and memory safety',
        'Cargo and ecosystem'
      ]
    },
    csharp: {
      fr: [
        'C# 10+ et nouvelles fonctionnalités (records, top-level programs)',
        'ASP.NET Core et Web APIs',
        'Entity Framework Core et patterns',
        'Testing avec xUnit et Moq',
        'Async/await et Task Parallel Library',
        'LINQ et expressions lambda avancées',
        'Dependency injection et architecture',
        'Blazor pour applications web modernes',
        'Performance optimization et memory management',
        'Cloud development avec Azure'
      ],
      en: [
        'C# 10+ and new features (records, top-level programs)',
        'ASP.NET Core and Web APIs',
        'Entity Framework Core and patterns',
        'Testing with xUnit and Moq',
        'Async/await and Task Parallel Library',
        'Advanced LINQ and lambda expressions',
        'Dependency injection and architecture',
        'Blazor for modern web applications',
        'Performance optimization and memory management',
        'Cloud development with Azure'
      ]
    },
    kotlin: {
      fr: [
        'Kotlin pour Android et multiplatform',
        'Coroutines et programmation asynchrone',
        'Interopérabilité Java-Kotlin',
        'DSL building et syntax advanced',
        'Spring Boot avec Kotlin',
        'Testing avec JUnit 5 et MockK',
        'Functional programming patterns',
        'Kotlin/Native et Kotlin/JS',
        'Architecture patterns (MVVM, Clean Architecture)',
        'Performance et optimisation'
      ],
      en: [
        'Kotlin for Android and multiplatform',
        'Coroutines and asynchronous programming',
        'Java-Kotlin interoperability',
        'DSL building and advanced syntax',
        'Spring Boot with Kotlin',
        'Testing with JUnit 5 and MockK',
        'Functional programming patterns',
        'Kotlin/Native and Kotlin/JS',
        'Architecture patterns (MVVM, Clean Architecture)',
        'Performance and optimization'
      ]
    },
    swift: {
      fr: [
        'Swift fundamentals et syntax moderne',
        'iOS development avec UIKit et SwiftUI',
        'Combine framework et reactive programming',
        'Core Data et persistance',
        'Testing avec XCTest',
        'Memory management et ARC',
        'Concurrency avec async/await',
        'App Store optimization et deployment',
        'Performance profiling avec Instruments',
        'Server-side Swift avec Vapor'
      ],
      en: [
        'Swift fundamentals and modern syntax',
        'iOS development with UIKit and SwiftUI',
        'Combine framework and reactive programming',
        'Core Data and persistence',
        'Testing with XCTest',
        'Memory management and ARC',
        'Concurrency with async/await',
        'App Store optimization and deployment',
        'Performance profiling with Instruments',
        'Server-side Swift with Vapor'
      ]
    },
    ruby: {
      fr: [
        'Ruby idioms et métaprogrammation',
        'Ruby on Rails framework mastery',
        'RSpec et testing behavior-driven',
        'ActiveRecord patterns et optimisation',
        'API development avec Rails API',
        'Background jobs avec Sidekiq',
        'Gems development et packaging',
        'Performance optimization et profiling',
        'Deployment avec Capistrano',
        'Microservices architecture'
      ],
      en: [
        'Ruby idioms and metaprogramming',
        'Ruby on Rails framework mastery',
        'RSpec and behavior-driven testing',
        'ActiveRecord patterns and optimization',
        'API development with Rails API',
        'Background jobs with Sidekiq',
        'Gems development and packaging',
        'Performance optimization and profiling',
        'Deployment with Capistrano',
        'Microservices architecture'
      ]
    },
    flutter: {
      fr: [
        'Flutter widgets et state management',
        'Dart language fundamentals',
        'Navigation et routing avancé',
        'State management (Bloc, Provider, Riverpod)',
        'Testing (unit, widget, integration)',
        'Performance optimization',
        'Platform integration (iOS/Android)',
        'CI/CD et deployment automatisé',
        'Firebase integration',
        'Custom painters et animations'
      ],
      en: [
        'Flutter widgets and state management',
        'Dart language fundamentals',
        'Advanced navigation and routing',
        'State management (Bloc, Provider, Riverpod)',
        'Testing (unit, widget, integration)',
        'Performance optimization',
        'Platform integration (iOS/Android)',
        'CI/CD and automated deployment',
        'Firebase integration',
        'Custom painters and animations'
      ]
    },
    docker: {
      fr: [
        'Docker fundamentals et containerisation',
        'Dockerfile best practices et multi-stage builds',
        'Docker Compose et orchestration locale',
        'Networking et volumes management',
        'Security et image scanning',
        'Registry management (Docker Hub, Harbor)',
        'Monitoring et logging',
        'Docker Swarm basics',
        'Integration avec CI/CD pipelines',
        'Performance optimization'
      ],
      en: [
        'Docker fundamentals and containerization',
        'Dockerfile best practices and multi-stage builds',
        'Docker Compose and local orchestration',
        'Networking and volumes management',
        'Security and image scanning',
        'Registry management (Docker Hub, Harbor)',
        'Monitoring and logging',
        'Docker Swarm basics',
        'CI/CD pipeline integration',
        'Performance optimization'
      ]
    },
    kubernetes: {
      fr: [
        'Kubernetes architecture et concepts',
        'Pods, Services et Ingress',
        'Deployments et StatefulSets',
        'ConfigMaps et Secrets management',
        'Helm charts et package management',
        'Monitoring avec Prometheus et Grafana',
        'RBAC et security policies',
        'Networking avec CNI',
        'Storage et persistent volumes',
        'Troubleshooting et debugging'
      ],
      en: [
        'Kubernetes architecture and concepts',
        'Pods, Services and Ingress',
        'Deployments and StatefulSets',
        'ConfigMaps and Secrets management',
        'Helm charts and package management',
        'Monitoring with Prometheus and Grafana',
        'RBAC and security policies',
        'Networking with CNI',
        'Storage and persistent volumes',
        'Troubleshooting and debugging'
      ]
    },
    aws: {
      fr: [
        'AWS Core Services (EC2, S3, RDS)',
        'Identity and Access Management (IAM)',
        'Lambda et serverless architecture',
        'VPC et networking',
        'CloudFormation et Infrastructure as Code',
        'ECS/EKS et container services',
        'Monitoring avec CloudWatch',
        'Security best practices',
        'Cost optimization strategies',
        'Well-Architected Framework'
      ],
      en: [
        'AWS Core Services (EC2, S3, RDS)',
        'Identity and Access Management (IAM)',
        'Lambda and serverless architecture',
        'VPC and networking',
        'CloudFormation and Infrastructure as Code',
        'ECS/EKS and container services',
        'Monitoring with CloudWatch',
        'Security best practices',
        'Cost optimization strategies',
        'Well-Architected Framework'
      ]
    },
    tensorflow: {
      fr: [
        'TensorFlow fundamentals et eager execution',
        'Keras API et model building',
        'Data preprocessing et tf.data',
        'Training loops et callbacks',
        'Model deployment avec TensorFlow Serving',
        'TensorFlow Lite pour mobile',
        'Custom layers et operations',
        'Distributed training strategies',
        'TensorBoard pour visualization',
        'MLOps avec TFX pipeline'
      ],
      en: [
        'TensorFlow fundamentals and eager execution',
        'Keras API and model building',
        'Data preprocessing and tf.data',
        'Training loops and callbacks',
        'Model deployment with TensorFlow Serving',
        'TensorFlow Lite for mobile',
        'Custom layers and operations',
        'Distributed training strategies',
        'TensorBoard for visualization',
        'MLOps with TFX pipeline'
      ]
    },
    nodejs: {
      fr: [
        'Node.js fundamentals et event loop',
        'Express.js et middleware patterns',
        'APIs REST et authentication (JWT, OAuth)',
        'Base de données avec MongoDB/PostgreSQL',
        'Testing avec Jest et Supertest',
        'Error handling et logging',
        'Performance et scalabilité',
        'Security best practices (OWASP)',
        'Deployment et monitoring',
        'Microservices architecture'
      ],
      en: [
        'Node.js fundamentals and event loop',
        'Express.js and middleware patterns',
        'REST APIs and authentication (JWT, OAuth)',
        'Databases with MongoDB/PostgreSQL',
        'Testing with Jest and Supertest',
        'Error handling and logging',
        'Performance and scalability',
        'Security best practices (OWASP)',
        'Deployment and monitoring',
        'Microservices architecture'
      ]
    },
    angular: {
      fr: [
        'Angular fundamentals et architecture',
        'Components et lifecycle hooks',
        'Services et dependency injection',
        'RxJS et reactive programming',
        'Forms (template-driven et reactive)',
        'Routing et navigation guards',
        'HTTP client et interceptors',
        'Testing avec Jasmine et Karma',
        'Angular Material et UI libraries',
        'Performance optimization et lazy loading'
      ],
      en: [
        'Angular fundamentals and architecture',
        'Components and lifecycle hooks',
        'Services and dependency injection',
        'RxJS and reactive programming',
        'Forms (template-driven and reactive)',
        'Routing and navigation guards',
        'HTTP client and interceptors',
        'Testing with Jasmine and Karma',
        'Angular Material and UI libraries',
        'Performance optimization and lazy loading'
      ]
    },
    reactnative: {
      fr: [
        'React Native fundamentals et setup',
        'Navigation avec React Navigation',
        'State management (Redux, Context)',
        'Native modules et platform APIs',
        'Styling et responsive design',
        'Testing et debugging',
        'Performance optimization',
        'Push notifications et deep linking',
        'App Store et Google Play deployment',
        'Code sharing strategies'
      ],
      en: [
        'React Native fundamentals and setup',
        'Navigation with React Navigation',
        'State management (Redux, Context)',
        'Native modules and platform APIs',
        'Styling and responsive design',
        'Testing and debugging',
        'Performance optimization',
        'Push notifications and deep linking',
        'App Store and Google Play deployment',
        'Code sharing strategies'
      ]
    },
    devops: {
      fr: [
        'Containerisation avec Docker',
        'Orchestration avec Kubernetes',
        'CI/CD pipelines (GitHub Actions, Jenkins)',
        'Infrastructure as Code (Terraform)',
        'Monitoring et logging (Prometheus, Grafana)',
        'Security et vulnerability scanning',
        'Cloud deployment (AWS, Azure, GCP)',
        'Configuration management (Ansible)',
        'GitOps et deployment strategies',
        'Performance tuning et optimization'
      ],
      en: [
        'Containerization with Docker',
        'Orchestration with Kubernetes',
        'CI/CD pipelines (GitHub Actions, Jenkins)',
        'Infrastructure as Code (Terraform)',
        'Monitoring and logging (Prometheus, Grafana)',
        'Security and vulnerability scanning',
        'Cloud deployment (AWS, Azure, GCP)',
        'Configuration management (Ansible)',
        'GitOps and deployment strategies',
        'Performance tuning and optimization'
      ]
    },
    datascience: {
      fr: [
        'Python pour data science (Pandas, NumPy)',
        'Machine learning avec Scikit-learn',
        'Deep learning (TensorFlow, PyTorch)',
        'Data visualization (Matplotlib, Plotly)',
        'Feature engineering et preprocessing',
        'Model evaluation et validation',
        'MLOps et model deployment',
        'Big data avec Apache Spark',
        'NLP et text processing',
        'Time series analysis'
      ],
      en: [
        'Python for data science (Pandas, NumPy)',
        'Machine learning with Scikit-learn',
        'Deep learning (TensorFlow, PyTorch)',
        'Data visualization (Matplotlib, Plotly)',
        'Feature engineering and preprocessing',
        'Model evaluation and validation',
        'MLOps and model deployment',
        'Big data with Apache Spark',
        'NLP and text processing',
        'Time series analysis'
      ]
    },
    cpp: {
      fr: [
        'C++ moderne (C++17/20) et best practices',
        'Template metaprogramming avancé',
        'STL et algorithmes standards',
        'Memory management et RAII',
        'Concurrency et multithreading',
        'Performance optimization et profiling',
        'Design patterns en C++',
        'Testing avec GoogleTest',
        'Build systems (CMake, Bazel)',
        'Interopérabilité avec C et autres langages'
      ],
      en: [
        'Modern C++ (C++17/20) and best practices',
        'Advanced template metaprogramming',
        'STL and standard algorithms',
        'Memory management and RAII',
        'Concurrency and multithreading',
        'Performance optimization and profiling',
        'C++ design patterns',
        'Testing with GoogleTest',
        'Build systems (CMake, Bazel)',
        'C and other language interoperability'
      ]
    },
    general: {
      fr: [
        'Git et GitHub mastery (rebase, cherry-pick, workflows)',
        'Lecture et compréhension de code legacy',
        'Rédaction de documentation technique claire',
        'Communication en équipe et code review',
        'Debugging et troubleshooting méthodique',
        'Patterns de contribution open source',
        'Gestion de projet agile (Scrum, Kanban)',
        'Architecture software et design patterns',
        'Testing strategies (unit, integration, e2e)',
        'Performance optimization et profiling'
      ],
      en: [
        'Git and GitHub mastery (rebase, cherry-pick, workflows)',
        'Legacy code reading and comprehension',
        'Clear technical documentation writing',
        'Team communication and code review',
        'Methodical debugging and troubleshooting',
        'Open source contribution patterns',
        'Agile project management (Scrum, Kanban)',
        'Software architecture and design patterns',
        'Testing strategies (unit, integration, e2e)',
        'Performance optimization and profiling'
      ]
    },
    git: {
      fr: [
        'Git fundamentals et workflow avancés',
        'Branching strategies (GitFlow, GitHub Flow, GitLab Flow)',
        'Pull requests et code review best practices',
        'Issues management et project boards',
        'GitHub Actions et CI/CD automation',
        'Conflict resolution et merge strategies',
        'Git hooks et automation',
        'Repository management et organization',
        'Security et signed commits',
        'Collaboration patterns pour équipes'
      ],
      en: [
        'Git fundamentals and advanced workflows',
        'Branching strategies (GitFlow, GitHub Flow, GitLab Flow)',
        'Pull requests and code review best practices',
        'Issues management and project boards',
        'GitHub Actions and CI/CD automation',
        'Conflict resolution and merge strategies',
        'Git hooks and automation',
        'Repository management and organization',
        'Security and signed commits',
        'Team collaboration patterns'
      ]
    }
  }

  // Returns modules in current language or French as default
  if (modules[programType] && modules[programType][currentLang]) {
    return modules[programType][currentLang]
  } else if (modules[programType] && modules[programType]['fr']) {
    return modules[programType]['fr']
  } else {
    return []
  }
}

// Analysis of used technologies
const detectedTechnologies = computed(() => {
  const technologies = {}

  // Comprehensive technology aliases for better detection (ordered by GitHub popularity/frequency)
  const techAliases = {
    // TOP TIER: Most popular languages on GitHub (>10M repos)
    'JavaScript': ['JavaScript', 'JS', 'ECMAScript', 'ES6', 'ES2015', 'ES2020', 'ES2021', 'ES2022'],
    'Python': ['Python', 'Python3', 'Py', 'Python2'],
    'TypeScript': ['TypeScript', 'TS'],
    'Java': ['Java', 'OpenJDK', 'Oracle Java'],
    'C#': ['C#', 'CSharp', 'C Sharp', 'C-Sharp'],
    'PHP': ['PHP', 'PHP7', 'PHP8'],
    'C++': ['C++', 'CPP', 'Cpp', 'C Plus Plus'],
    'C': ['C'],
    'Shell': ['Shell', 'Bash', 'Zsh', 'PowerShell', 'Sh', 'Fish'],
    'Go': ['Go', 'Golang'],

    // SECOND TIER: Very popular languages (1-10M repos)
    'Ruby': ['Ruby', 'Ruby on Rails'],
    'Rust': ['Rust', 'Rustlang'],
    'Kotlin': ['Kotlin'],
    'Swift': ['Swift', 'SwiftUI'],
    'Scala': ['Scala'],
    'Dart': ['Dart'],
    'R': ['R', 'R-lang'],
    'Objective-C': ['Objective-C', 'ObjC', 'Objective C'],
    'Perl': ['Perl', 'Perl5', 'Perl6', 'Raku'],
    'Haskell': ['Haskell'],
    'Lua': ['Lua', 'LuaJIT'],
    'Groovy': ['Groovy'],
    'Julia': ['Julia'],
    'Clojure': ['Clojure', 'ClojureScript'],
    'Elixir': ['Elixir'],
    'F#': ['F#', 'FSharp', 'F Sharp'],
    'Erlang': ['Erlang'],
    'OCaml': ['OCaml', 'Caml'],
    'Crystal': ['Crystal'],
    'Nim': ['Nim'],

    // THIRD TIER: Popular specialized languages
    'Zig': ['Zig'],
    'COBOL': ['COBOL', 'Cobol'],
    'Fortran': ['Fortran', 'FORTRAN'],
    'Pascal': ['Pascal', 'Delphi'],
    'Ada': ['Ada'],
    'Assembly': ['Assembly', 'ASM', 'x86', 'ARM'],
    'VHDL': ['VHDL'],
    'Verilog': ['Verilog'],
    'D': ['D', 'Dlang'],
    'Racket': ['Racket'],
    'Scheme': ['Scheme'],
    'Common Lisp': ['Common Lisp', 'Lisp'],
    'Smalltalk': ['Smalltalk'],
    'Prolog': ['Prolog'],
    'ML': ['ML', 'Standard ML', 'SML'],
    'Roff': ['Roff', 'Groff'],
    'V': ['V', 'Vlang'],
    'Odin': ['Odin'],
    'Carbon': ['Carbon'],

    // FRONTEND FRAMEWORKS & LIBRARIES
    'React': ['React', 'ReactJS', 'JSX', 'React.js'],
    'Vue': ['Vue', 'Vue.js', 'Vuejs', 'Vue3'],
    'Angular': ['Angular', 'AngularJS', 'Angular2+'],
    'Svelte': ['Svelte', 'SvelteKit'],
    'Solid': ['SolidJS', 'Solid.js'],
    'Preact': ['Preact'],
    'Lit': ['Lit', 'LitElement'],
    'Alpine.js': ['Alpine', 'Alpine.js'],
    'Stimulus': ['Stimulus', 'StimulusJS'],
    'Ember': ['Ember', 'Ember.js'],
    'Backbone': ['Backbone', 'Backbone.js'],
    'Knockout': ['Knockout', 'KnockoutJS'],
    'Aurelia': ['Aurelia'],
    'Mithril': ['Mithril', 'Mithril.js'],

    // BACKEND FRAMEWORKS & RUNTIMES
    'Node.js': ['Node', 'Node.js', 'NodeJS', 'npm'],
    'Express': ['Express', 'Express.js'],
    'Koa': ['Koa', 'Koa.js'],
    'Fastify': ['Fastify'],
    'NestJS': ['NestJS', 'Nest'],
    'Deno': ['Deno'],
    'Bun': ['Bun'],

    // FULLSTACK FRAMEWORKS
    'Next.js': ['Next', 'Next.js', 'NextJS'],
    'Nuxt.js': ['Nuxt', 'Nuxt.js', 'NuxtJS'],
    'Remix': ['Remix', 'Remix.run'],
    'SvelteKit': ['SvelteKit'],
    'Gatsby': ['Gatsby', 'GatsbyJS'],
    'Astro': ['Astro'],
    'T3 Stack': ['T3', 'T3 Stack'],
    'Fresh': ['Fresh'],

    // PYTHON FRAMEWORKS
    'Django': ['Django'],
    'Flask': ['Flask'],
    'FastAPI': ['FastAPI'],
    'Tornado': ['Tornado'],
    'Pyramid': ['Pyramid'],
    'Sanic': ['Sanic'],
    'Starlette': ['Starlette'],
    'Quart': ['Quart'],
    'Bottle': ['Bottle'],
    'CherryPy': ['CherryPy'],

    // JAVA FRAMEWORKS
    'Spring': ['Spring', 'Spring Boot', 'Spring Framework'],
    'Hibernate': ['Hibernate'],
    'Struts': ['Struts'],
    'JSF': ['JSF', 'JavaServer Faces'],
    'Vaadin': ['Vaadin'],
    'Play': ['Play Framework'],
    'Vert.x': ['Vert.x', 'Eclipse Vert.x'],
    'Micronaut': ['Micronaut'],
    'Quarkus': ['Quarkus'],
    'Helidon': ['Helidon'],

    // C# / .NET FRAMEWORKS
    'ASP.NET': ['ASP.NET', 'ASP', '.NET', 'dotnet'],
    'Blazor': ['Blazor', 'Blazor Server', 'Blazor WebAssembly'],
    'Entity Framework': ['Entity Framework', 'EF Core'],
    'WPF': ['WPF', 'Windows Presentation Foundation'],
    'WinUI': ['WinUI'],
    'Xamarin': ['Xamarin', 'Xamarin.Forms'],
    'MAUI': ['MAUI', '.NET MAUI'],
    'Unity': ['Unity', 'Unity3D'],

    // GO FRAMEWORKS
    'Gin': ['Gin', 'Gin-Gonic'],
    'Fiber': ['Fiber', 'GoFiber'],
    'Echo': ['Echo'],
    'Beego': ['Beego'],
    'Revel': ['Revel'],
    'Buffalo': ['Buffalo', 'Gobuffalo'],
    'Iris': ['Iris'],

    // RUST FRAMEWORKS
    'Actix': ['Actix', 'Actix-web'],
    'Rocket': ['Rocket'],
    'Warp': ['Warp'],
    'Axum': ['Axum'],
    'Tide': ['Tide'],
    'Poem': ['Poem'],

    // RUBY FRAMEWORKS
    'Rails': ['Rails', 'Ruby on Rails', 'RoR'],
    'Sinatra': ['Sinatra'],
    'Hanami': ['Hanami'],
    'Roda': ['Roda'],
    'Padrino': ['Padrino'],

    // PHP FRAMEWORKS
    'Laravel': ['Laravel'],
    'Symfony': ['Symfony'],
    'CodeIgniter': ['CodeIgniter'],
    'CakePHP': ['CakePHP'],
    'Zend': ['Zend', 'Laminas'],
    'Yii': ['Yii', 'Yii2'],
    'Phalcon': ['Phalcon'],
    'Slim': ['Slim'],

    // ELIXIR FRAMEWORKS
    'Phoenix': ['Phoenix', 'Phoenix Framework'],
    'Nerves': ['Nerves'],
    'Plug': ['Plug'],

    // MOBILE DEVELOPMENT
    'React Native': ['React Native', 'ReactNative', 'RN'],
    'Flutter': ['Flutter', 'Dart Flutter'],
    'Ionic': ['Ionic'],
    'Cordova': ['Cordova', 'PhoneGap', 'Apache Cordova'],
    'Capacitor': ['Capacitor'],
    'NativeScript': ['NativeScript'],
    'Expo': ['Expo'],

    // DATA SCIENCE & AI/ML
    'TensorFlow': ['TensorFlow', 'TF'],
    'PyTorch': ['PyTorch', 'Torch'],
    'Pandas': ['Pandas'],
    'NumPy': ['NumPy', 'Numpy'],
    'Scikit-learn': ['Scikit-learn', 'sklearn', 'scikit learn'],
    'Jupyter': ['Jupyter', 'Jupyter Notebook', 'JupyterLab'],
    'Matplotlib': ['Matplotlib'],
    'Seaborn': ['Seaborn'],
    'Plotly': ['Plotly'],
    'OpenCV': ['OpenCV', 'cv2'],
    'Keras': ['Keras'],
    'XGBoost': ['XGBoost'],
    'LightGBM': ['LightGBM'],
    'CatBoost': ['CatBoost'],
    'Hugging Face': ['Hugging Face', 'HuggingFace', 'Transformers'],
    'spaCy': ['spaCy', 'Spacy'],
    'NLTK': ['NLTK'],
    'Apache Spark': ['Spark', 'Apache Spark', 'PySpark'],
    'Dask': ['Dask'],
    'Ray': ['Ray'],

    // DEVOPS & INFRASTRUCTURE
    'Docker': ['Docker', 'Dockerfile', 'docker-compose'],
    'Kubernetes': ['Kubernetes', 'K8s', 'kubectl'],
    'Terraform': ['Terraform', 'HCL'],
    'Ansible': ['Ansible', 'Ansible Playbook'],
    'Jenkins': ['Jenkins'],
    'GitHub Actions': ['GitHub Actions', 'Actions', 'Workflows'],
    'GitLab CI': ['GitLab CI', 'GitLab CI/CD'],
    'CircleCI': ['CircleCI'],
    'Travis CI': ['Travis CI', 'Travis'],
    'Azure DevOps': ['Azure DevOps'],
    'Puppet': ['Puppet'],
    'Chef': ['Chef'],
    'Vagrant': ['Vagrant'],
    'Helm': ['Helm'],
    'Istio': ['Istio'],
    'Consul': ['Consul'],
    'Vault': ['Vault', 'HashiCorp Vault'],
    'Packer': ['Packer'],
    'Nomad': ['Nomad'],

    // CLOUD PLATFORMS
    'AWS': ['AWS', 'Amazon Web Services', 'EC2', 'S3', 'Lambda'],
    'Azure': ['Azure', 'Microsoft Azure'],
    'GCP': ['GCP', 'Google Cloud', 'Google Cloud Platform'],
    'Digital Ocean': ['Digital Ocean', 'DigitalOcean'],
    'Heroku': ['Heroku'],
    'Vercel': ['Vercel', 'Zeit'],
    'Netlify': ['Netlify'],
    'Railway': ['Railway'],
    'Render': ['Render'],
    'Firebase': ['Firebase'],
    'Supabase': ['Supabase'],
    'PlanetScale': ['PlanetScale'],
    'Cloudflare': ['Cloudflare', 'Cloudflare Workers'],

    // DATABASES
    'SQL': ['SQL', 'MySQL', 'PostgreSQL', 'SQLite', 'MariaDB'],
    'PostgreSQL': ['PostgreSQL', 'Postgres'],
    'MySQL': ['MySQL'],
    'SQLite': ['SQLite'],
    'MongoDB': ['MongoDB', 'Mongo'],
    'Redis': ['Redis'],
    'Elasticsearch': ['Elasticsearch', 'ElasticSearch'],
    'CouchDB': ['CouchDB'],
    'Neo4j': ['Neo4j'],
    'Cassandra': ['Cassandra', 'Apache Cassandra'],
    'DynamoDB': ['DynamoDB'],
    'InfluxDB': ['InfluxDB'],
    'TimescaleDB': ['TimescaleDB'],
    'CockroachDB': ['CockroachDB'],
    'PlanetScale': ['PlanetScale'],
    'Supabase': ['Supabase'],
    'FaunaDB': ['FaunaDB'],

    // QUERY LANGUAGES & APIs
    'GraphQL': ['GraphQL', 'Apollo', 'Apollo GraphQL'],
    'REST': ['REST', 'RESTful', 'REST API'],
    'gRPC': ['gRPC', 'Protocol Buffers', 'Protobuf'],
    'tRPC': ['tRPC'],
    'Hasura': ['Hasura'],
    'Prisma': ['Prisma'],

    // WEB TECHNOLOGIES & STANDARDS
    'HTML': ['HTML', 'HTML5'],
    'CSS': ['CSS', 'CSS3'],
    'SCSS': ['SCSS', 'Sass', 'SASS'],
    'Less': ['Less', 'LESS'],
    'Stylus': ['Stylus'],
    'PostCSS': ['PostCSS'],
    'Tailwind': ['Tailwind', 'TailwindCSS', 'Tailwind CSS'],
    'Bootstrap': ['Bootstrap'],
    'Bulma': ['Bulma'],
    'Foundation': ['Foundation', 'Zurb Foundation'],
    'Semantic UI': ['Semantic UI', 'Semantic-UI'],
    'Material UI': ['Material UI', 'MUI', 'Material-UI'],
    'Ant Design': ['Ant Design', 'antd'],
    'Chakra UI': ['Chakra UI', 'Chakra'],
    'Mantine': ['Mantine'],

    // BUILD TOOLS & BUNDLERS
    'Webpack': ['Webpack'],
    'Vite': ['Vite'],
    'Rollup': ['Rollup'],
    'Parcel': ['Parcel'],
    'esbuild': ['esbuild'],
    'Turbopack': ['Turbopack'],
    'Snowpack': ['Snowpack'],
    'Browserify': ['Browserify'],
    'Gulp': ['Gulp'],
    'Grunt': ['Grunt'],

    // TESTING FRAMEWORKS
    'Jest': ['Jest'],
    'Vitest': ['Vitest'],
    'Cypress': ['Cypress'],
    'Playwright': ['Playwright'],
    'Selenium': ['Selenium'],
    'Puppeteer': ['Puppeteer'],
    'Testing Library': ['Testing Library', 'React Testing Library'],
    'Mocha': ['Mocha'],
    'Chai': ['Chai'],
    'Jasmine': ['Jasmine'],
    'Karma': ['Karma'],
    'Protractor': ['Protractor'],
    'WebDriver': ['WebDriver'],

    // VERSION CONTROL & COLLABORATION
    'Git': ['Git'],
    'GitHub': ['GitHub'],
    'GitLab': ['GitLab'],
    'Bitbucket': ['Bitbucket'],
    'Mercurial': ['Mercurial', 'Hg'],
    'SVN': ['SVN', 'Subversion'],

    // PACKAGE MANAGERS
    'npm': ['npm'],
    'Yarn': ['Yarn'],
    'pnpm': ['pnpm'],
    'pip': ['pip'],
    'conda': ['conda', 'Anaconda', 'Miniconda'],
    'Maven': ['Maven'],
    'Gradle': ['Gradle'],
    'NuGet': ['NuGet'],
    'Composer': ['Composer'],
    'Cargo': ['Cargo'],
    'Go Modules': ['Go Modules', 'go mod'],
    'Bundle': ['Bundle', 'Bundler'],
    'Poetry': ['Poetry'],
    'Pipenv': ['Pipenv'],

    // OPERATING SYSTEMS & PLATFORMS
    'Linux': ['Linux', 'Ubuntu', 'CentOS', 'Debian', 'Red Hat', 'RHEL'],
    'Windows': ['Windows', 'Win32', 'Windows Server'],
    'macOS': ['macOS', 'Mac OS', 'Darwin'],
    'Android': ['Android'],
    'iOS': ['iOS'],
    'embedded': ['embedded', 'Arduino', 'Raspberry Pi'],

    // BLOCKCHAIN & WEB3
    'Solidity': ['Solidity'],
    'Web3': ['Web3', 'Web3.js'],
    'Ethereum': ['Ethereum', 'ETH'],
    'Bitcoin': ['Bitcoin', 'BTC'],
    'Smart Contracts': ['Smart Contracts'],
    'DeFi': ['DeFi', 'Decentralized Finance'],
    'NFT': ['NFT', 'Non-Fungible Token'],

    // GAME DEVELOPMENT
    'Unity': ['Unity', 'Unity3D'],
    'Unreal Engine': ['Unreal Engine', 'UE4', 'UE5'],
    'Godot': ['Godot'],
    'GameMaker': ['GameMaker', 'GameMaker Studio'],
    'Construct': ['Construct'],
    'Defold': ['Defold'],

    // MISCELLANEOUS TECHNOLOGIES
    'WebAssembly': ['WebAssembly', 'WASM'],
    'PWA': ['PWA', 'Progressive Web App'],
    'Electron': ['Electron', 'ElectronJS'],
    'Tauri': ['Tauri'],
    'Qt': ['Qt', 'PyQt', 'PySide'],
    'GTK': ['GTK', 'GTK+'],
    'OpenGL': ['OpenGL'],
    'Vulkan': ['Vulkan'],
    'DirectX': ['DirectX'],
    'CUDA': ['CUDA'],
    'OpenCL': ['OpenCL'],
    'LLVM': ['LLVM'],
    'JVM': ['JVM', 'Java Virtual Machine'],
    'CLR': ['CLR', 'Common Language Runtime'],
    'WASI': ['WASI'],
    'POSIX': ['POSIX']
  }

  props.repositories.forEach(repo => {
    if (repo.language) {
      // Normalize the language name
      let normalizedLang = repo.language

      // Find the canonical name for this language
      for (const [canonical, aliases] of Object.entries(techAliases)) {
        if (aliases.some(alias => alias.toLowerCase() === repo.language.toLowerCase())) {
          normalizedLang = canonical
          break
        }
      }

      technologies[normalizedLang] = (technologies[normalizedLang] || 0) + 1
    }
  })

  // Sort by usage frequency
  return Object.fromEntries(
    Object.entries(technologies).sort(([,a], [,b]) => b - a)
  )
})

// Training programs based on detected technologies
const trainingPrograms = computed(() => {
  const programs = []
  const techs = Object.keys(detectedTechnologies.value)
  const techCounts = detectedTechnologies.value
  const currentLocale = locale.value // Ensure reactivity according to language

  // Debug: log detected technologies
  console.log('🔍 Detected technologies:', techs)
  console.log('📊 Technologies with count:', detectedTechnologies.value)

  // Technology-specific programs using canonical names
  if (techs.includes('JavaScript') || techs.includes('TypeScript')) {
    const jsPriority = (techCounts['JavaScript'] || 0) + (techCounts['TypeScript'] || 0)
    programs.push({
      id: 'javascript-mastery',
      priority: jsPriority,
      title: t('training.programs.javascript.title'),
      color: '#3B82F6',
      icon: 'mdi-language-javascript',
      level: { text: 'Intermédiaire', color: 'orange' },
      duration: '8-12 semaines',
      description: t('training.programs.javascript.description'),
      detailedDescription: 'Programme complet couvrant ES6+, async/await, TypeScript, testing, et les bonnes pratiques de développement JavaScript.',
      modules: getModules('javascript'),
      resources: [
        { name: 'MDN JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide', type: 'free' },
        { name: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/', type: 'free' },
        { name: 'JavaScript.info', url: 'https://javascript.info/', type: 'free' },
        { name: 'Frontend Masters', url: 'https://frontendmasters.com/', type: 'paid' }
      ],
      prerequisites: ['Bases de la programmation', 'HTML/CSS de base'],
      certification: 'Certification JavaScript Institute ou équivalent'
    })
  }

  if (techs.includes('Vue') || techs.includes('JavaScript')) {
    const vuePriority = (techCounts['Vue'] || 0) + (techCounts['JavaScript'] || 0) * 0.5
    programs.push({
      id: 'vue-expert',
      priority: vuePriority,
      title: t('training.programs.vue.title'),
      color: '#4FC08D',
      icon: 'mdi-vuejs',
      level: { text: 'Intermédiaire à Avancé', color: 'green' },
      duration: '6-10 semaines',
      description: t('training.programs.vue.description'),
      detailedDescription: 'Formation approfondie sur Vue.js 3, Composition API, gestion d\'état, et développement d\'applications complexes.',
      modules: getModules('vue'),
      resources: [
        { name: 'Vue.js Documentation', url: 'https://vuejs.org/', type: 'free' },
        { name: 'Vue Mastery', url: 'https://www.vuemastery.com/', type: 'paid' },
        { name: 'Vue School', url: 'https://vueschool.io/', type: 'paid' },
        { name: 'Awesome Vue', url: 'https://github.com/vuejs/awesome-vue', type: 'free' }
      ],
      prerequisites: ['JavaScript ES6+', 'HTML/CSS', 'Concepts de SPA'],
      certification: 'Vue.js Certified Developer'
    })
  }

  if (techs.includes('Python')) {
    const pythonPriority = techCounts['Python'] || 0
    programs.push({
      id: 'python-contributor',
      priority: pythonPriority,
      title: t('training.programs.python.title'),
      color: '#3776AB',
      icon: 'mdi-language-python',
      level: { text: 'Débutant à Intermédiaire', color: 'blue' },
      duration: '10-14 semaines',
      description: t('training.programs.python.description'),
      detailedDescription: 'Formation complète Python avec focus sur les contributions open source, testing, et packaging.',
      modules: getModules('python'),
      resources: [
        { name: 'Python.org Tutorial', url: 'https://docs.python.org/3/tutorial/', type: 'free' },
        { name: 'Real Python', url: 'https://realpython.com/', type: 'paid' },
        { name: 'Python Package Index', url: 'https://pypi.org/', type: 'free' },
        { name: 'Talk Python Training', url: 'https://training.talkpython.fm/', type: 'paid' }
      ],
      prerequisites: ['Bases de la programmation'],
      certification: 'Python Institute PCAP/PCPP'
    })
  }

  if (techs.includes('Java')) {
    const javaPriority = techCounts['Java'] || 0
    programs.push({
      id: 'java-enterprise',
      priority: javaPriority,
      title: t('training.programs.java.title'),
      color: '#ED8B00',
      icon: 'mdi-language-java',
      level: { text: 'Intermédiaire à Avancé', color: 'deep-orange' },
      duration: '12-16 semaines',
      description: t('training.programs.java.description'),
      detailedDescription: 'Programme avancé Java avec Spring Framework, microservices, et architecture enterprise.',
      modules: getModules('java'),
      resources: [
        { name: 'Oracle Java Documentation', url: 'https://docs.oracle.com/en/java/', type: 'free' },
        { name: 'Spring Academy', url: 'https://spring.academy/', type: 'free' },
        { name: 'Baeldung', url: 'https://www.baeldung.com/', type: 'free' },
        { name: 'Pluralsight Java', url: 'https://www.pluralsight.com/', type: 'paid' }
      ],
      prerequisites: ['Java de base', 'POO', 'SQL'],
      certification: 'Oracle Certified Professional Java SE'
    })
  }

  // Add React program
  if (techs.includes('React') || techs.includes('JavaScript')) {
    const reactPriority = (techCounts['React'] || 0) + (techCounts['JavaScript'] || 0) * 0.3
    programs.push({
      id: 'react-specialist',
      priority: reactPriority,
      title: currentLocale === 'fr' ? 'Spécialiste React/Next.js' : 'React/Next.js Specialist',
      color: '#61DAFB',
      icon: 'mdi-react',
      level: { text: currentLocale === 'fr' ? 'Intermédiaire' : 'Intermediate', color: 'cyan' },
      duration: '8-12 semaines',
      description: currentLocale === 'fr'
        ? 'Maîtrisez React, ses hooks, l\'écosystème et Next.js pour le développement moderne.'
        : 'Master React, its hooks, ecosystem and Next.js for modern development.',
      detailedDescription: currentLocale === 'fr'
        ? 'Formation complète sur React 18+, hooks avancés, state management, testing, et Next.js.'
        : 'Complete training on React 18+, advanced hooks, state management, testing, and Next.js.',
      modules: getModules('react'),
      resources: [
        { name: 'React Documentation', url: 'https://react.dev/', type: 'free' },
        { name: 'Next.js Learn', url: 'https://nextjs.org/learn', type: 'free' },
        { name: 'React Testing Library', url: 'https://testing-library.com/', type: 'free' },
        { name: 'Epic React', url: 'https://epicreact.dev/', type: 'paid' }
      ],
      prerequisites: [currentLocale === 'fr' ? 'JavaScript ES6+' : 'JavaScript ES6+', 'HTML/CSS'],
      certification: 'Meta React Developer Certificate'
    })
  }

  // Add PHP program
  if (techs.includes('PHP')) {
    const phpPriority = techCounts['PHP'] || 0
    programs.push({
      id: 'php-web-developer',
      priority: phpPriority,
      title: currentLocale === 'fr' ? 'Développeur Web PHP' : 'PHP Web Developer',
      color: '#777BB4',
      icon: 'mdi-language-php',
      level: { text: currentLocale === 'fr' ? 'Intermédiaire' : 'Intermediate', color: 'purple' },
      duration: '10-14 semaines',
      description: currentLocale === 'fr'
        ? 'Développez des applications web robustes avec PHP moderne, Laravel et Symfony.'
        : 'Develop robust web applications with modern PHP, Laravel and Symfony.',
      detailedDescription: currentLocale === 'fr'
        ? 'Formation complète PHP 8+, frameworks (Laravel/Symfony), API REST, et best practices.'
        : 'Complete PHP 8+ training, frameworks (Laravel/Symfony), REST APIs, and best practices.',
      modules: getModules('php'),
      resources: [
        { name: 'PHP.net Documentation', url: 'https://www.php.net/docs.php', type: 'free' },
        { name: 'Laravel Documentation', url: 'https://laravel.com/docs', type: 'free' },
        { name: 'Symfony Documentation', url: 'https://symfony.com/doc', type: 'free' },
        { name: 'Laracasts', url: 'https://laracasts.com/', type: 'paid' }
      ],
      prerequisites: [currentLocale === 'fr' ? 'Programmation de base' : 'Basic programming', 'HTML/CSS', 'SQL'],
      certification: 'Zend Certified PHP Engineer'
    })
  }

  // Add Go program
  if (techs.includes('Go')) {
    const goPriority = techCounts['Go'] || 0
    programs.push({
      id: 'go-backend-developer',
      priority: goPriority,
      title: currentLocale === 'fr' ? 'Développeur Backend Go' : 'Go Backend Developer',
      color: '#00ADD8',
      icon: 'mdi-language-go',
      level: { text: currentLocale === 'fr' ? 'Intermédiaire' : 'Intermediate', color: 'cyan' },
      duration: '8-12 semaines',
      description: currentLocale === 'fr'
        ? 'Maîtrisez Go pour le développement backend, microservices et applications performantes.'
        : 'Master Go for backend development, microservices and high-performance applications.',
      detailedDescription: currentLocale === 'fr'
        ? 'Formation complète Go avec concurrency, APIs REST, gRPC, testing et déploiement cloud.'
        : 'Complete Go training with concurrency, REST APIs, gRPC, testing and cloud deployment.',
      modules: getModules('go'),
      resources: [
        { name: 'Go Documentation', url: 'https://golang.org/doc/', type: 'free' },
        { name: 'Go by Example', url: 'https://gobyexample.com/', type: 'free' },
        { name: 'Effective Go', url: 'https://golang.org/doc/effective_go.html', type: 'free' },
        { name: 'Go with TDD', url: 'https://quii.gitbook.io/learn-go-with-tests/', type: 'free' }
      ],
      prerequisites: [currentLocale === 'fr' ? 'Programmation de base' : 'Basic programming'],
      certification: 'Go Certified Developer'
    })
  }

  // Add Rust program
  if (techs.includes('Rust')) {
    const rustPriority = techCounts['Rust'] || 0
    programs.push({
      id: 'rust-systems-programmer',
      priority: rustPriority,
      title: currentLocale === 'fr' ? 'Programmeur Système Rust' : 'Rust Systems Programmer',
      color: '#CE422B',
      icon: 'mdi-language-rust',
      level: { text: currentLocale === 'fr' ? 'Avancé' : 'Advanced', color: 'deep-orange' },
      duration: '12-16 semaines',
      description: currentLocale === 'fr'
        ? 'Développez des systèmes sûrs et performants avec Rust.'
        : 'Develop safe and performant systems with Rust.',
      detailedDescription: currentLocale === 'fr'
        ? 'Formation approfondie Rust : ownership, concurrency, WebAssembly et programmation système.'
        : 'In-depth Rust training: ownership, concurrency, WebAssembly and systems programming.',
      modules: getModules('rust'),
      resources: [
        { name: 'The Rust Programming Language', url: 'https://doc.rust-lang.org/book/', type: 'free' },
        { name: 'Rust by Example', url: 'https://doc.rust-lang.org/stable/rust-by-example/', type: 'free' },
        { name: 'Rustlings', url: 'https://github.com/rust-lang/rustlings/', type: 'free' },
        { name: 'Tokio Tutorial', url: 'https://tokio.rs/tokio/tutorial', type: 'free' }
      ],
      prerequisites: [currentLocale === 'fr' ? 'Programmation système' : 'Systems programming', 'C/C++'],
      certification: 'Rust Foundation Certification'
    })
  }

  // Add C# program
  if (techs.includes('C#')) {
    const csharpPriority = techCounts['C#'] || 0
    programs.push({
      id: 'csharp-dotnet-developer',
      priority: csharpPriority,
      title: currentLocale === 'fr' ? 'Développeur C#/.NET' : 'C#/.NET Developer',
      color: '#239120',
      icon: 'mdi-language-csharp',
      level: { text: currentLocale === 'fr' ? 'Intermédiaire' : 'Intermediate', color: 'green' },
      duration: '10-14 semaines',
      description: currentLocale === 'fr'
        ? 'Développez des applications modernes avec C# et l\'écosystème .NET.'
        : 'Develop modern applications with C# and the .NET ecosystem.',
      detailedDescription: currentLocale === 'fr'
        ? 'Formation complète C# .NET : ASP.NET Core, Entity Framework, Azure et microservices.'
        : 'Complete C# .NET training: ASP.NET Core, Entity Framework, Azure and microservices.',
      modules: getModules('csharp'),
      resources: [
        { name: 'Microsoft Learn C#', url: 'https://docs.microsoft.com/en-us/dotnet/csharp/', type: 'free' },
        { name: '.NET Documentation', url: 'https://docs.microsoft.com/en-us/dotnet/', type: 'free' },
        { name: 'Pluralsight .NET', url: 'https://www.pluralsight.com/', type: 'paid' },
        { name: 'Channel 9', url: 'https://channel9.msdn.com/', type: 'free' }
      ],
      prerequisites: [currentLocale === 'fr' ? 'POO' : 'OOP', 'SQL'],
      certification: 'Microsoft Certified: Azure Developer Associate'
    })
  }

  // Add C++ program
  if (techs.includes('C++')) {
    const cppPriority = techCounts['C++'] || 0
    programs.push({
      id: 'cpp-systems-developer',
      priority: cppPriority,
      title: currentLocale === 'fr' ? 'Développeur Système C++' : 'C++ Systems Developer',
      color: '#00599C',
      icon: 'mdi-language-cpp',
      level: { text: currentLocale === 'fr' ? 'Avancé' : 'Advanced', color: 'blue' },
      duration: '14-18 semaines',
      description: currentLocale === 'fr'
        ? 'Maîtrisez C++ moderne pour les systèmes haute performance.'
        : 'Master modern C++ for high-performance systems.',
      detailedDescription: currentLocale === 'fr'
        ? 'Formation avancée C++17/20 : templates, STL, concurrency et optimisation.'
        : 'Advanced C++17/20 training: templates, STL, concurrency and optimization.',
      modules: getModules('cpp'),
      resources: [
        { name: 'cppreference.com', url: 'https://en.cppreference.com/', type: 'free' },
        { name: 'Effective Modern C++', url: 'https://www.oreilly.com/library/view/effective-modern-c/9781491908419/', type: 'paid' },
        { name: 'CppCon Videos', url: 'https://www.youtube.com/user/CppCon', type: 'free' },
        { name: 'Compiler Explorer', url: 'https://godbolt.org/', type: 'free' }
      ],
      prerequisites: [currentLocale === 'fr' ? 'C de base' : 'Basic C', currentLocale === 'fr' ? 'Algorithmique' : 'Algorithms'],
      certification: 'C++ Institute Certification'
    })
  }

  // Add Node.js program
  if (techs.includes('Node.js') || techs.includes('JavaScript')) {
    const nodePriority = (techCounts['Node.js'] || 0) + (techCounts['JavaScript'] || 0) * 0.4
    programs.push({
      id: 'nodejs-backend-developer',
      priority: nodePriority,
      title: currentLocale === 'fr' ? 'Développeur Backend Node.js' : 'Node.js Backend Developer',
      color: '#339933',
      icon: 'mdi-nodejs',
      level: { text: currentLocale === 'fr' ? 'Intermédiaire' : 'Intermediate', color: 'green' },
      duration: '8-12 semaines',
      description: currentLocale === 'fr'
        ? 'Créez des APIs robustes et scalables avec Node.js et Express.'
        : 'Build robust and scalable APIs with Node.js and Express.',
      detailedDescription: currentLocale === 'fr'
        ? 'Formation complète Node.js : Express, bases de données, authentification et déploiement.'
        : 'Complete Node.js training: Express, databases, authentication and deployment.',
      modules: getModules('nodejs'),
      resources: [
        { name: 'Node.js Documentation', url: 'https://nodejs.org/en/docs/', type: 'free' },
        { name: 'Express.js Guide', url: 'https://expressjs.com/', type: 'free' },
        { name: 'Node.js Best Practices', url: 'https://github.com/goldbergyoni/nodebestpractices', type: 'free' },
        { name: 'Node University', url: 'https://node.university/', type: 'paid' }
      ],
      prerequisites: [currentLocale === 'fr' ? 'JavaScript ES6+' : 'JavaScript ES6+'],
      certification: 'OpenJS Node.js Application Developer'
    })
  }

  // Add Angular program
  if (techs.includes('Angular') || techs.includes('TypeScript')) {
    const angularPriority = (techCounts['Angular'] || 0) + (techCounts['TypeScript'] || 0) * 0.4
    programs.push({
      id: 'angular-developer',
      priority: angularPriority,
      title: currentLocale === 'fr' ? 'Développeur Angular' : 'Angular Developer',
      color: '#DD0031',
      icon: 'mdi-angular',
      level: { text: currentLocale === 'fr' ? 'Intermédiaire' : 'Intermediate', color: 'red' },
      duration: '10-14 semaines',
      description: currentLocale === 'fr'
        ? 'Développez des applications enterprise avec Angular et TypeScript.'
        : 'Develop enterprise applications with Angular and TypeScript.',
      detailedDescription: currentLocale === 'fr'
        ? 'Formation complète Angular : components, services, routing, RxJS et testing.'
        : 'Complete Angular training: components, services, routing, RxJS and testing.',
      modules: getModules('angular'),
      resources: [
        { name: 'Angular Documentation', url: 'https://angular.io/docs', type: 'free' },
        { name: 'Angular University', url: 'https://angular-university.io/', type: 'paid' },
        { name: 'ng-book', url: 'https://www.ng-book.com/', type: 'paid' },
        { name: 'Angular Material', url: 'https://material.angular.io/', type: 'free' }
      ],
      prerequisites: [currentLocale === 'fr' ? 'TypeScript' : 'TypeScript', 'HTML/CSS'],
      certification: 'Angular Certified Developer'
    })
  }

  // Add React Native program
  if (techs.includes('React Native') || techs.includes('JavaScript')) {
    const rnPriority = (techCounts['React Native'] || 0) + (techCounts['React'] || 0) * 0.3 + (techCounts['JavaScript'] || 0) * 0.2
    programs.push({
      id: 'react-native-developer',
      priority: rnPriority,
      title: currentLocale === 'fr' ? 'Développeur Mobile React Native' : 'React Native Mobile Developer',
      color: '#61DAFB',
      icon: 'mdi-cellphone',
      level: { text: currentLocale === 'fr' ? 'Intermédiaire' : 'Intermediate', color: 'cyan' },
      duration: '10-14 semaines',
      description: currentLocale === 'fr'
        ? 'Créez des applications mobiles cross-platform avec React Native.'
        : 'Build cross-platform mobile apps with React Native.',
      detailedDescription: currentLocale === 'fr'
        ? 'Formation React Native : navigation, APIs natives, performance et publication.'
        : 'React Native training: navigation, native APIs, performance and publishing.',
      modules: getModules('reactnative'),
      resources: [
        { name: 'React Native Docs', url: 'https://reactnative.dev/docs/getting-started', type: 'free' },
        { name: 'Expo Documentation', url: 'https://docs.expo.dev/', type: 'free' },
        { name: 'React Native Elements', url: 'https://react-native-elements.github.io/react-native-elements/', type: 'free' },
        { name: 'The Complete React Native Course', url: 'https://www.udemy.com/course/the-complete-react-native-and-redux-course/', type: 'paid' }
      ],
      prerequisites: [currentLocale === 'fr' ? 'React' : 'React', 'JavaScript ES6+'],
      certification: 'Meta React Native Certificate'
    })
  }

  // Add Flutter program
  if (techs.includes('Flutter') || techs.includes('Dart')) {
    const flutterPriority = (techCounts['Flutter'] || 0) + (techCounts['Dart'] || 0)
    programs.push({
      id: 'flutter-developer',
      priority: flutterPriority,
      title: currentLocale === 'fr' ? 'Développeur Mobile Flutter' : 'Flutter Mobile Developer',
      color: '#02569B',
      icon: 'mdi-flutter',
      level: { text: currentLocale === 'fr' ? 'Intermédiaire' : 'Intermediate', color: 'blue' },
      duration: '10-14 semaines',
      description: currentLocale === 'fr'
        ? 'Développez des applications mobiles élégantes avec Flutter et Dart.'
        : 'Develop elegant mobile applications with Flutter and Dart.',
      detailedDescription: currentLocale === 'fr'
        ? 'Formation Flutter : widgets, state management, animations et intégration native.'
        : 'Flutter training: widgets, state management, animations and native integration.',
      modules: getModules('flutter'),
      resources: [
        { name: 'Flutter Documentation', url: 'https://flutter.dev/docs', type: 'free' },
        { name: 'Flutter Codelabs', url: 'https://flutter.dev/docs/codelabs', type: 'free' },
        { name: 'Flutter Widget of the Week', url: 'https://www.youtube.com/playlist?list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG', type: 'free' },
        { name: 'Flutter & Dart - The Complete Guide', url: 'https://www.udemy.com/course/learn-flutter-dart-to-build-ios-android-apps/', type: 'paid' }
      ],
      prerequisites: [currentLocale === 'fr' ? 'Programmation de base' : 'Basic programming'],
      certification: 'Google Flutter Certification'
    })
  }

  // Add Docker/DevOps program
  if (techs.includes('Docker') || techs.includes('DevOps')) {
    const devopsPriority = (techCounts['Docker'] || 0) + (techCounts['Kubernetes'] || 0) + (techCounts['DevOps'] || 0)
    programs.push({
      id: 'devops-containerization',
      priority: devopsPriority,
      title: currentLocale === 'fr' ? 'Spécialiste DevOps & Conteneurisation' : 'DevOps & Containerization Specialist',
      color: '#2496ED',
      icon: 'mdi-docker',
      level: { text: currentLocale === 'fr' ? 'Intermédiaire à Avancé' : 'Intermediate to Advanced', color: 'blue' },
      duration: '12-16 semaines',
      description: currentLocale === 'fr'
        ? 'Maîtrisez Docker, Kubernetes et les pratiques DevOps modernes.'
        : 'Master Docker, Kubernetes and modern DevOps practices.',
      detailedDescription: currentLocale === 'fr'
        ? 'Formation DevOps complète : conteneurisation, orchestration, CI/CD et monitoring.'
        : 'Complete DevOps training: containerization, orchestration, CI/CD and monitoring.',
      modules: getModules('devops'),
      resources: [
        { name: 'Docker Documentation', url: 'https://docs.docker.com/', type: 'free' },
        { name: 'Kubernetes Documentation', url: 'https://kubernetes.io/docs/', type: 'free' },
        { name: 'Docker Mastery Course', url: 'https://www.udemy.com/course/docker-mastery/', type: 'paid' },
        { name: 'Kubernetes Academy', url: 'https://kube.academy/', type: 'free' }
      ],
      prerequisites: [currentLocale === 'fr' ? 'Linux de base' : 'Basic Linux', currentLocale === 'fr' ? 'Réseaux' : 'Networking'],
      certification: 'Docker Certified Associate (DCA), CKA/CKAD'
    })
  }

  // Add AWS/Cloud program
  if (techs.includes('AWS') || techs.includes('Cloud')) {
    const cloudPriority = (techCounts['AWS'] || 0) + (techCounts['Azure'] || 0) + (techCounts['GCP'] || 0)
    programs.push({
      id: 'cloud-architect',
      priority: cloudPriority,
      title: currentLocale === 'fr' ? 'Architecte Cloud AWS' : 'AWS Cloud Architect',
      color: '#FF9900',
      icon: 'mdi-aws',
      level: { text: currentLocale === 'fr' ? 'Avancé' : 'Advanced', color: 'orange' },
      duration: '14-18 semaines',
      description: currentLocale === 'fr'
        ? 'Concevez et déployez des architectures cloud scalables sur AWS.'
        : 'Design and deploy scalable cloud architectures on AWS.',
      detailedDescription: currentLocale === 'fr'
        ? 'Formation AWS : EC2, S3, Lambda, RDS, VPC, sécurité et best practices.'
        : 'AWS training: EC2, S3, Lambda, RDS, VPC, security and best practices.',
      modules: getModules('aws'),
      resources: [
        { name: 'AWS Documentation', url: 'https://docs.aws.amazon.com/', type: 'free' },
        { name: 'AWS Training', url: 'https://aws.amazon.com/training/', type: 'free' },
        { name: 'A Cloud Guru', url: 'https://acloudguru.com/', type: 'paid' },
        { name: 'AWS Certified Solutions Architect Study Guide', url: 'https://www.wiley.com/en-us/AWS+Certified+Solutions+Architect+Study+Guide-p-9781119713081', type: 'paid' }
      ],
      prerequisites: [currentLocale === 'fr' ? 'Réseaux' : 'Networking', currentLocale === 'fr' ? 'Linux' : 'Linux'],
      certification: 'AWS Certified Solutions Architect'
    })
  }

  // Add Data Science/AI program
  if (techs.includes('TensorFlow') || techs.includes('PyTorch') || techs.includes('Data Science')) {
    const dsPriority = (techCounts['TensorFlow'] || 0) + (techCounts['PyTorch'] || 0) + (techCounts['Python'] || 0) * 0.3
    programs.push({
      id: 'data-science-ai',
      priority: dsPriority,
      title: currentLocale === 'fr' ? 'Data Scientist & IA' : 'Data Scientist & AI',
      color: '#FF6F00',
      icon: 'mdi-brain',
      level: { text: currentLocale === 'fr' ? 'Avancé' : 'Advanced', color: 'orange' },
      duration: '16-20 semaines',
      description: currentLocale === 'fr'
        ? 'Exploitez les données et créez des modèles IA avec Python.'
        : 'Leverage data and build AI models with Python.',
      detailedDescription: currentLocale === 'fr'
        ? 'Formation complète : machine learning, deep learning, NLP et MLOps.'
        : 'Complete training: machine learning, deep learning, NLP and MLOps.',
      modules: getModules('datascience'),
      resources: [
        { name: 'TensorFlow Documentation', url: 'https://www.tensorflow.org/', type: 'free' },
        { name: 'PyTorch Tutorials', url: 'https://pytorch.org/tutorials/', type: 'free' },
        { name: 'Kaggle Learn', url: 'https://www.kaggle.com/learn', type: 'free' },
        { name: 'Coursera ML Course', url: 'https://www.coursera.org/learn/machine-learning', type: 'paid' }
      ],
      prerequisites: [currentLocale === 'fr' ? 'Python' : 'Python', currentLocale === 'fr' ? 'Mathématiques' : 'Mathematics', currentLocale === 'fr' ? 'Statistiques' : 'Statistics'],
      certification: 'TensorFlow Developer Certificate'
    })
  }

  // Add Ruby program
  if (techs.includes('Ruby')) {
    const rubyPriority = techCounts['Ruby'] || 0
    programs.push({
      id: 'ruby-rails-developer',
      priority: rubyPriority,
      title: currentLocale === 'fr' ? 'Développeur Ruby on Rails' : 'Ruby on Rails Developer',
      color: '#CC342D',
      icon: 'mdi-language-ruby',
      level: { text: currentLocale === 'fr' ? 'Intermédiaire' : 'Intermediate', color: 'red' },
      duration: '10-14 semaines',
      description: currentLocale === 'fr'
        ? 'Développez des applications web rapides avec Ruby on Rails.'
        : 'Develop fast web applications with Ruby on Rails.',
      detailedDescription: currentLocale === 'fr'
        ? 'Formation Ruby/Rails : MVC, ActiveRecord, testing et déploiement.'
        : 'Ruby/Rails training: MVC, ActiveRecord, testing and deployment.',
      modules: getModules('ruby'),
      resources: [
        { name: 'Ruby Documentation', url: 'https://ruby-doc.org/', type: 'free' },
        { name: 'Rails Guides', url: 'https://guides.rubyonrails.org/', type: 'free' },
        { name: 'The Odin Project', url: 'https://www.theodinproject.com/', type: 'free' },
        { name: 'Go Rails', url: 'https://gorails.com/', type: 'paid' }
      ],
      prerequisites: [currentLocale === 'fr' ? 'Programmation de base' : 'Basic programming', 'HTML/CSS'],
      certification: 'Ruby Association Certified Ruby Programmer'
    })
  }

  // General program if few technologies detected
  if (programs.length === 0) {
    programs.push({
      id: 'general-contributor',
      priority: 0, // Priorité de base
      title: t('training.programs.general.title'),
      color: '#6366F1',
      icon: 'mdi-account-group',
      level: { text: 'Débutant', color: 'indigo' },
      duration: '4-6 semaines',
      description: t('training.programs.general.description'),
      detailedDescription: 'Formation générale sur les outils et pratiques essentielles pour contribuer efficacement aux projets open source.',
      modules: getModules('general'),
      resources: [
        { name: 'GitHub Learning Lab', url: 'https://lab.github.com/', type: 'free' },
        { name: 'First Contributions', url: 'https://firstcontributions.github.io/', type: 'free' },
        { name: 'Open Source Guide', url: 'https://opensource.guide/', type: 'free' },
        { name: 'freeCodeCamp', url: 'https://www.freecodecamp.org/', type: 'free' }
      ],
      prerequisites: ['Curiosité et motivation'],
      certification: 'GitHub Certification'
    })
  }

  // Toujours ajouter le programme Git/GitHub
  programs.push({
    id: 'git-github-mastery',
    priority: 1000, // Toujours important
    title: t('training.programs.git.title'),
    color: '#181717',
    icon: 'mdi-git',
    level: { text: 'Essentiel', color: 'grey-darken-2' },
    duration: '3-4 semaines',
    description: t('training.programs.git.description'),
    detailedDescription: 'Formation intensive sur Git, GitHub, et les workflows de collaboration moderne.',
    modules: getModules('git'),
    resources: [
      { name: 'Pro Git Book', url: 'https://git-scm.com/book', type: 'free' },
      { name: 'GitHub Skills', url: 'https://skills.github.com/', type: 'free' },
      { name: 'Atlassian Git Tutorials', url: 'https://www.atlassian.com/git/tutorials', type: 'free' },
      { name: 'Git Interactive Tutorial', url: 'https://learngitbranching.js.org/', type: 'free' }
    ],
    prerequisites: ['Aucun'],
    certification: 'GitHub Certified Developer'
  })

  // Trier les programmes par priorité (nombre d'apparitions des technologies)
  return programs.sort((a, b) => (b.priority || 0) - (a.priority || 0))
})

const getTechColor = (tech) => {
  const colors = {
    'JavaScript': 'blue',
    'TypeScript': 'blue',
    'Python': 'blue-darken-2',
    'Java': 'orange-darken-2',
    'Vue': 'green',
    'React': 'cyan',
    'Angular': 'red',
    'Node.js': 'green-darken-2',
    'Go': 'cyan-darken-2',
    'Rust': 'orange',
    'C++': 'indigo',
    'C#': 'purple',
    'PHP': 'indigo-darken-2'
  }
  return colors[tech] || 'grey'
}

const getTechIcon = (tech) => {
  const icons = {
    'JavaScript': 'mdi-language-javascript',
    'TypeScript': 'mdi-language-typescript',
    'Python': 'mdi-language-python',
    'Java': 'mdi-language-java',
    'Vue': 'mdi-vuejs',
    'React': 'mdi-react',
    'Angular': 'mdi-angular',
    'Node.js': 'mdi-nodejs',
    'Go': 'mdi-language-go',
    'Rust': 'mdi-language-rust',
    'C++': 'mdi-language-cpp',
    'C#': 'mdi-language-csharp',
    'PHP': 'mdi-language-php',
    'HTML': 'mdi-language-html5',
    'CSS': 'mdi-language-css3'
  }
  return icons[tech] || 'mdi-code-tags'
}
</script>

<style scoped>
.training-card {
  transition: all 0.3s ease;
}

.training-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}

.v-expansion-panel-title {
  min-height: 40px !important;
}

.v-list-item {
  min-height: 32px !important;
}
</style>
