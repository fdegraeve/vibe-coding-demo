<template>
  <v-container>
    <v-row>
      <!-- General statistics cards -->
      <v-col cols="12" md="3" v-for="stat in generalStats" :key="stat.title">
        <v-card elevation="2" class="pa-4 text-center h-100">
          <v-icon :color="stat.color" size="48" class="mb-2">{{ stat.icon }}</v-icon>
          <h3 class="text-h4 font-weight-bold">{{ stat.value }}</h3>
          <p class="text-subtitle-1 text-grey-darken-1">{{ stat.title }}</p>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <!-- Graphique des langages -->
      <v-col cols="12" md="6">
        <v-card elevation="2" class="pa-4">
          <v-card-title class="text-h5 mb-4">
            <v-icon class="mr-2">mdi-code-tags</v-icon>
            {{ $t('statistics.languages.title') }}
          </v-card-title>
          <div class="chart-container" style="height: 300px;">
            <Doughnut :data="languageChartData" :options="chartOptions" />
          </div>
        </v-card>
      </v-col>

      <!-- Monthly activity chart -->
      <v-col cols="12" md="6">
        <v-card elevation="2" class="pa-4">
          <v-card-title class="text-h5 mb-4">
            <v-icon class="mr-2">mdi-chart-line</v-icon>
            {{ $t('statistics.activity.title') }}
          </v-card-title>
          <div class="chart-container" style="height: 300px;">
            <Line :data="activityChartData" :options="lineChartOptions" />
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <!-- Graphique des stars -->
      <v-col cols="12" md="6">
        <v-card elevation="2" class="pa-4">
          <v-card-title class="text-h5 mb-4">
            <v-icon class="mr-2">mdi-star</v-icon>
            {{ $t('statistics.distribution.title') }}
          </v-card-title>
          <div class="chart-container" style="height: 300px;">
            <Bar :data="starsChartData" :options="barChartOptions" />
          </div>
        </v-card>
      </v-col>

      <!-- Graphique des forks -->
      <v-col cols="12" md="6">
        <v-card elevation="2" class="pa-4">
          <v-card-title class="text-h5 mb-4">
            <v-icon class="mr-2">mdi-source-fork</v-icon>
            Distribution des forks
          </v-card-title>
          <div class="chart-container" style="height: 300px;">
            <Bar :data="forksChartData" :options="barChartOptions" />
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <!-- Top repositories -->
      <v-col cols="12">
        <v-card elevation="2" class="pa-4">
          <v-card-title class="text-h5 mb-4">
            <v-icon class="mr-2">mdi-trophy</v-icon>
            {{ $t('statistics.topRepos.title') }}
          </v-card-title>
          <v-list>
            <v-list-item
              v-for="(repo, index) in topRepositories"
              :key="repo.id"
              :href="repo.html_url"
              target="_blank"
              class="mb-2"
            >
              <template v-slot:prepend>
                <v-avatar :color="getTrophyColor(index)" class="mr-3">
                  <span class="text-white font-weight-bold">{{ index + 1 }}</span>
                </v-avatar>
              </template>

              <v-list-item-title class="font-weight-bold">
                {{ repo.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ repo.description || 'Aucune description' }}
              </v-list-item-subtitle>

              <template v-slot:append>
                <div class="text-right">
                  <v-chip size="small" class="mr-2">
                    <v-icon start>mdi-star</v-icon>
                    {{ repo.stargazers_count }}
                  </v-chip>
                  <v-chip size="small">
                    <v-icon start>mdi-source-fork</v-icon>
                    {{ repo.forks_count }}
                  </v-chip>
                </div>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js'
import { Doughnut, Line, Bar } from 'vue-chartjs'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement
)

const { t } = useI18n()

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

// General statistics
const generalStats = computed(() => [
  {
    title: t('statistics.totalRepos'),
    value: props.userInfo.public_repos || 0,
    icon: 'mdi-source-repository',
    color: 'primary'
  },
  {
    title: t('userInfo.followers'),
    value: props.userInfo.followers || 0,
    icon: 'mdi-account-group',
    color: 'success'
  },
  {
    title: t('userInfo.following'),
    value: props.userInfo.following || 0,
    icon: 'mdi-account-plus',
    color: 'info'
  },
  {
    title: t('statistics.totalStars'),
    value: props.repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0),
    icon: 'mdi-star',
    color: 'warning'
  }
])

// Data for language chart
const languageChartData = computed(() => {
  const languages = {}
  props.repositories.forEach(repo => {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1
    }
  })

  const sortedLanguages = Object.entries(languages)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 8) // Top 8 langages

  const colors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
    '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
  ]

  return {
    labels: sortedLanguages.map(([lang]) => lang),
    datasets: [{
      data: sortedLanguages.map(([, count]) => count),
      backgroundColor: colors.slice(0, sortedLanguages.length),
      borderWidth: 2,
      borderColor: '#fff'
    }]
  }
})

// Data for activity chart
const activityChartData = computed(() => {
  const monthlyActivity = {}

  props.repositories.forEach(repo => {
    const date = new Date(repo.created_at)
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    monthlyActivity[monthYear] = (monthlyActivity[monthYear] || 0) + 1
  })

  const sortedMonths = Object.keys(monthlyActivity).sort().slice(-12) // 12 derniers mois

  return {
    labels: sortedMonths.map(month => {
      const [year, monthNum] = month.split('-')
      const date = new Date(year, monthNum - 1)
      return date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
    }),
    datasets: [{
      label: 'Repositories Created',
      data: sortedMonths.map(month => monthlyActivity[month] || 0),
      borderColor: '#1976D2',
      backgroundColor: 'rgba(25, 118, 210, 0.1)',
      fill: true,
      tension: 0.4
    }]
  }
})

// Data for stars chart
const starsChartData = computed(() => {
  const starsRanges = {
    '0': 0,
    '1-5': 0,
    '6-20': 0,
    '21-50': 0,
    '51+': 0
  }

  props.repositories.forEach(repo => {
    const stars = repo.stargazers_count
    if (stars === 0) starsRanges['0']++
    else if (stars <= 5) starsRanges['1-5']++
    else if (stars <= 20) starsRanges['6-20']++
    else if (stars <= 50) starsRanges['21-50']++
    else starsRanges['51+']++
  })

  return {
    labels: Object.keys(starsRanges),
    datasets: [{
      label: 'Number of Repositories',
      data: Object.values(starsRanges),
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 205, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 205, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 1
    }]
  }
})

// Data for forks chart
const forksChartData = computed(() => {
  const forksRanges = {
    '0': 0,
    '1-5': 0,
    '6-20': 0,
    '21+': 0
  }

  props.repositories.forEach(repo => {
    const forks = repo.forks_count
    if (forks === 0) forksRanges['0']++
    else if (forks <= 5) forksRanges['1-5']++
    else if (forks <= 20) forksRanges['6-20']++
    else forksRanges['21+']++
  })

  return {
    labels: Object.keys(forksRanges),
    datasets: [{
      label: 'Number of Repositories',
      data: Object.values(forksRanges),
      backgroundColor: [
        'rgba(255, 159, 64, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 99, 132, 0.8)'
      ],
      borderColor: [
        'rgba(255, 159, 64, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 1
    }]
  }
})

// Top repositories
const topRepositories = computed(() => {
  return [...props.repositories]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5)
})

// Options des graphiques
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
}

const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1
      }
    }
  }
}

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1
      }
    }
  }
}

const getTrophyColor = (index) => {
  const colors = ['gold', 'silver', '#CD7F32', 'grey', 'grey-lighten-1']
  return colors[index] || 'grey'
}
</script>

<style scoped>
.chart-container {
  position: relative;
}
</style>
