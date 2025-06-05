<template>
  <v-app>
    <v-app-bar color="primary" dark prominent>
      <v-app-bar-title>
        <v-icon class="mr-2">mdi-github</v-icon>
        {{ $t('app.title') }}
      </v-app-bar-title>

      <v-spacer />

      <!-- Language selector -->
      <v-btn
        icon
        @click="toggleLanguage"
        :title="currentLocale === 'fr' ? 'Switch to English' : 'Passer au français'"
        class="mr-2"
      >
        <span style="font-size: 1.2em;">{{ currentLocale === 'fr' ? '🇫🇷' : '🇺🇸' }}</span>
      </v-btn>

      <v-btn
        icon
        @click="toggleTheme"
        :title="isDark ? $t('app.toggleTheme.dark') : $t('app.toggleTheme.light')"
      >
        <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid class="pa-8">
        <v-row justify="center">
          <v-col cols="12" md="8" lg="6">
            <v-card elevation="4" class="pa-6">
              <v-card-title class="text-h4 text-center mb-4">
                {{ $t('search.title') }}
              </v-card-title>

              <v-form @submit.prevent="searchRepositories">
                <v-text-field
                  v-model="username"
                  :label="$t('search.placeholder')"
                  prepend-inner-icon="mdi-account"
                  variant="outlined"
                  :loading="loading"
                  :disabled="loading"
                  :hint="$t('search.hint')"
                  persistent-hint
                  class="mb-4"
                />

                <v-btn
                  type="submit"
                  color="primary"
                  block
                  size="large"
                  :loading="loading"
                  :disabled="!username.trim()"
                >
                  <v-icon class="mr-2">mdi-magnify</v-icon>
                  {{ $t('search.button') }}
                </v-btn>
              </v-form>
            </v-card>
          </v-col>
        </v-row>

        <!-- Error Alert -->
        <v-row v-if="error" justify="center" class="mt-4">
          <v-col cols="12" md="8" lg="6">
            <v-alert
              type="error"
              variant="tonal"
              closable
              @click:close="error = null"
            >
              {{ error }}
            </v-alert>
          </v-col>
        </v-row>

        <!-- User Info -->
        <v-row v-if="userInfo" justify="center" class="mt-6">
          <v-col cols="12" md="8">
            <v-card elevation="2" class="pa-4">
              <v-row align="center">
                <v-col cols="auto">
                  <v-avatar size="80">
                    <v-img :src="userInfo.avatar_url" :alt="userInfo.name || userInfo.login" />
                  </v-avatar>
                </v-col>
                <v-col>
                  <h2 class="text-h5">{{ userInfo.name || userInfo.login }}</h2>
                  <p class="text-subtitle-1 text-grey-darken-1">@{{ userInfo.login }}</p>
                  <p v-if="userInfo.bio" class="text-body-1">{{ userInfo.bio }}</p>
                  <v-chip-group class="mt-2">
                    <v-chip v-if="userInfo.public_repos" size="small">
                      <v-icon start>mdi-source-repository</v-icon>
                      {{ userInfo.public_repos }} {{ $t('userInfo.repositories') }}
                    </v-chip>
                    <v-chip v-if="userInfo.followers" size="small">
                      <v-icon start>mdi-account-group</v-icon>
                      {{ userInfo.followers }} {{ $t('userInfo.followers') }}
                    </v-chip>
                    <v-chip v-if="userInfo.following" size="small">
                      <v-icon start>mdi-account-plus</v-icon>
                      {{ userInfo.following }} {{ $t('userInfo.following') }}
                    </v-chip>
                  </v-chip-group>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>

        <!-- Tabs for Repositories and Statistics -->
        <v-row v-if="repositories.length > 0" justify="center" class="mt-6">
          <v-col cols="12">
            <v-card elevation="2">
              <v-tabs v-model="activeTab" color="primary" align-tabs="center">
                <v-tab value="repositories">
                  <v-icon class="mr-2">mdi-source-repository</v-icon>
                  {{ $t('tabs.repositories') }} ({{ filteredRepositories.length }}{{ searchQuery ? '/' + repositories.length : '' }})
                </v-tab>
                <v-tab value="statistics">
                  <v-icon class="mr-2">mdi-chart-bar</v-icon>
                  {{ $t('tabs.statistics') }}
                </v-tab>
                <v-tab value="training">
                  <v-icon class="mr-2">mdi-school</v-icon>
                  {{ $t('tabs.training') }}
                </v-tab>
              </v-tabs>

              <v-card-text class="pa-6">
                <v-tabs-window v-model="activeTab">
                  <!-- Repositories Tab -->
                  <v-tabs-window-item value="repositories">
                    <!-- Search and Sort Controls -->
                    <v-row class="mb-4">
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="searchQuery"
                          :label="$t('repositories.searchPlaceholder')"
                          prepend-inner-icon="mdi-magnify"
                          variant="outlined"
                          density="compact"
                          clearable
                          hide-details
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-select
                          v-model="sortBy"
                          :items="sortOptions"
                          :label="$t('repositories.sortBy')"
                          variant="outlined"
                          density="compact"
                          hide-details
                        />
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col
                        v-for="repo in filteredRepositories"
                        :key="repo.id"
                        cols="12"
                        md="6"
                        lg="4"
                      >
                        <RepositoryCard :repository="repo" />
                      </v-col>
                    </v-row>

                    <!-- No results message -->
                    <v-row v-if="filteredRepositories.length === 0 && searchQuery" justify="center" class="mt-6">
                      <v-col cols="12" md="6">
                        <v-card elevation="2" class="pa-6 text-center">
                          <v-icon size="80" color="grey-lighten-1" class="mb-4">mdi-file-search-outline</v-icon>
                          <h3 class="text-h5 mb-2">{{ $t('search.noResults') }}</h3>
                          <p class="text-body-1 text-grey-darken-1">
                            {{ $t('search.noResultsDescription', { query: searchQuery }) }}
                          </p>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-tabs-window-item>

                  <!-- Statistics Tab -->
                  <v-tabs-window-item value="statistics">
                    <UserStats :repositories="repositories" :user-info="userInfo" />
                  </v-tabs-window-item>

                  <!-- Training Programs Tab -->
                  <v-tabs-window-item value="training">
                    <TrainingPrograms :repositories="repositories" :user-info="userInfo" />
                  </v-tabs-window-item>
                </v-tabs-window>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- No repositories message -->
        <v-row v-if="searchPerformed && repositories.length === 0 && !loading && !error" justify="center" class="mt-6">
          <v-col cols="12" md="6">
            <v-card elevation="2" class="pa-6 text-center">
              <v-icon size="80" color="grey-lighten-1" class="mb-4">mdi-source-repository-multiple</v-icon>
              <h3 class="text-h5 mb-2">{{ $t('search.noRepositories') }}</h3>
              <p class="text-body-1 text-grey-darken-1">
                {{ $t('search.noRepositoriesDescription') }}
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTheme } from 'vuetify'
import { useI18n } from 'vue-i18n'
import axios from 'axios'
import UserStats from './components/UserStats.vue'
import RepositoryCard from './components/RepositoryCard.vue'
import TrainingPrograms from './components/TrainingPrograms.vue'

const theme = useTheme()
const { t, locale } = useI18n()
const username = ref('')
const repositories = ref([])
const userInfo = ref(null)
const loading = ref(false)
const error = ref(null)
const searchPerformed = ref(false)
const activeTab = ref('repositories')
const searchQuery = ref('')
const sortBy = ref('updated')

const isDark = computed(() => theme.global.name.value === 'dark')
const currentLocale = computed(() => locale.value)

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const toggleLanguage = () => {
  const newLocale = locale.value === 'fr' ? 'en' : 'fr'
  locale.value = newLocale
  // Save preference to localStorage
  localStorage.setItem('preferred-language', newLocale)
}

const sortOptions = computed(() => [
  { title: t('repositories.sortOptions.updated'), value: 'updated' },
  { title: t('repositories.sortOptions.created'), value: 'created' },
  { title: t('repositories.sortOptions.name'), value: 'name' },
  { title: t('repositories.sortOptions.stars'), value: 'stars' },
  { title: t('repositories.sortOptions.forks'), value: 'forks' }
])

// Computed property for filtered and sorted repositories
const filteredRepositories = computed(() => {
  let filtered = repositories.value

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(repo =>
      repo.name.toLowerCase().includes(query) ||
      (repo.description && repo.description.toLowerCase().includes(query)) ||
      (repo.language && repo.language.toLowerCase().includes(query))
    )
  }

  // Sort repositories
  return filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'created':
        return new Date(b.created_at) - new Date(a.created_at)
      case 'name':
        return a.name.localeCompare(b.name)
      case 'stars':
        return b.stargazers_count - a.stargazers_count
      case 'forks':
        return b.forks_count - a.forks_count
      case 'updated':
      default:
        return new Date(b.updated_at) - new Date(a.updated_at)
    }
  })
})

const searchRepositories = async () => {
  if (!username.value.trim()) return

  loading.value = true
  error.value = null
  repositories.value = []
  userInfo.value = null
  searchPerformed.value = true
  searchQuery.value = '' // Reset search filter
  activeTab.value = 'repositories' // Switch to repositories tab

  try {
    // Get user information
    const userResponse = await axios.get(`https://api.github.com/users/${username.value.trim()}`)
    userInfo.value = userResponse.data

    // Get user repositories
    const reposResponse = await axios.get(`https://api.github.com/users/${username.value.trim()}/repos`, {
      params: {
        sort: 'updated',
        per_page: 100
      }
    })

    repositories.value = reposResponse.data
  } catch (err) {
    console.error('Error fetching data:', err)

    if (err.response?.status === 404) {
      error.value = t('errors.userNotFound', { username: username.value })
    } else if (err.response?.status === 403) {
      error.value = t('errors.rateLimited')
    } else {
      error.value = t('errors.generic')
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.v-card {
  transition: transform 0.2s ease-in-out;
}

.v-card:hover {
  transform: translateY(-2px);
}
</style>
