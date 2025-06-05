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
          <v-chip-group>
            <v-chip
              v-for="(count, tech) in detectedTechnologies"
              :key="tech"
              :color="getTechColor(tech)"
              size="large"
              class="ma-1"
            >
              <v-icon start>{{ getTechIcon(tech) }}</v-icon>
              {{ tech }} ({{ count }} {{ count > 1 ? $t('training.projects') : $t('training.project') }})
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

// Fonction pour obtenir les modules traduits
const getModules = (programType) => {
  const currentLang = locale.value

  const modules = {
    javascript: {
      fr: [
        'ES6+ et nouvelles fonctionnalités',
        'Programmation asynchrone',
        'TypeScript fundamentals',
        'Testing avec Jest/Vitest',
        'Performance et optimisation',
        'Design patterns en JavaScript'
      ],
      en: [
        'ES6+ and modern features',
        'Asynchronous programming',
        'TypeScript fundamentals',
        'Testing with Jest/Vitest',
        'Performance and optimization',
        'JavaScript design patterns'
      ]
    },
    vue: {
      fr: [
        'Vue 3 Composition API',
        'Vuex/Pinia state management',
        'Vue Router avancé',
        'Testing de composants',
        'SSR avec Nuxt.js',
        'Performance et SEO'
      ],
      en: [
        'Vue 3 Composition API',
        'Vuex/Pinia state management',
        'Advanced Vue Router',
        'Component testing',
        'SSR with Nuxt.js',
        'Performance and SEO'
      ]
    },
    python: {
      fr: [
        'Python fondamentaux et OOP',
        'Testing avec pytest et unittest',
        'Packaging et distribution',
        'Documentation avec Sphinx',
        'CI/CD avec GitHub Actions',
        'Code quality avec pylint/black'
      ],
      en: [
        'Python fundamentals and OOP',
        'Testing with pytest and unittest',
        'Packaging and distribution',
        'Documentation with Sphinx',
        'CI/CD with GitHub Actions',
        'Code quality with pylint/black'
      ]
    },
    java: {
      fr: [
        'Java 11+ et nouvelles fonctionnalités',
        'Spring Boot et Spring Framework',
        'Microservices et architecture',
        'JUnit 5 et testing avancé',
        'Maven/Gradle et build automation',
        'Performance tuning et monitoring'
      ],
      en: [
        'Java 11+ and new features',
        'Spring Boot and Spring Framework',
        'Microservices and architecture',
        'JUnit 5 and advanced testing',
        'Maven/Gradle and build automation',
        'Performance tuning and monitoring'
      ]
    },
    general: {
      fr: [
        'Git et GitHub mastery',
        'Lecture et compréhension de code',
        'Rédaction de documentation',
        'Communication en équipe',
        'Debugging et troubleshooting',
        'Code review et feedback'
      ],
      en: [
        'Git and GitHub mastery',
        'Code reading and comprehension',
        'Technical documentation writing',
        'Team communication',
        'Debugging and troubleshooting',
        'Code review and feedback'
      ]
    },
    git: {
      fr: [
        'Git fundamentals et workflow',
        'Branching strategies (GitFlow, GitHub Flow)',
        'Pull requests et code review',
        'Issues et project management',
        'GitHub Actions et CI/CD',
        'Conflict resolution et best practices'
      ],
      en: [
        'Git fundamentals and workflow',
        'Branching strategies (GitFlow, GitHub Flow)',
        'Pull requests and code review',
        'Issues and project management',
        'GitHub Actions and CI/CD',
        'Conflict resolution and best practices'
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

  props.repositories.forEach(repo => {
    if (repo.language) {
      technologies[repo.language] = (technologies[repo.language] || 0) + 1
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
  const currentLocale = locale.value // Ensure reactivity according to language

  // Technology-specific programs
  if (techs.includes('JavaScript') || techs.includes('TypeScript')) {
    programs.push({
      id: 'javascript-mastery',
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
    programs.push({
      id: 'vue-expert',
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
    programs.push({
      id: 'python-contributor',
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
    programs.push({
      id: 'java-enterprise',
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

  // General program if few technologies detected
  if (programs.length === 0) {
    programs.push({
      id: 'general-contributor',
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

  return programs
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
