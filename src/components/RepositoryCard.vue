<template>
  <v-card
    elevation="2"
    class="h-100 d-flex flex-column repo-card"
    hover
    @click="openRepository"
  >
    <v-card-title class="text-h6">
      <v-icon class="mr-2" :color="repository.private ? 'warning' : 'success'">
        {{ repository.private ? 'mdi-lock' : 'mdi-source-repository' }}
      </v-icon>
      <span class="repo-name">{{ repository.name }}</span>
    </v-card-title>
    
    <v-card-text class="flex-grow-1">
      <p v-if="repository.description" class="text-body-2 mb-3">
        {{ repository.description }}
      </p>
      <p v-else class="text-body-2 text-grey-darken-1 mb-3 font-italic">
        {{ $t('repositoryCard.noDescription') }}
      </p>
      
      <div class="d-flex flex-wrap gap-2 mb-3">
        <v-chip v-if="repository.language" size="small" color="primary" variant="tonal">
          <v-icon start>mdi-code-tags</v-icon>
          {{ repository.language }}
        </v-chip>
        <v-chip v-if="repository.stargazers_count > 0" size="small" color="warning" variant="outlined">
          <v-icon start>mdi-star</v-icon>
          {{ formatNumber(repository.stargazers_count) }}
        </v-chip>
        <v-chip v-if="repository.forks_count > 0" size="small" color="info" variant="outlined">
          <v-icon start>mdi-source-fork</v-icon>
          {{ formatNumber(repository.forks_count) }}
        </v-chip>
        <v-chip v-if="repository.open_issues_count > 0" size="small" color="error" variant="outlined">
          <v-icon start>mdi-alert-circle</v-icon>
          {{ repository.open_issues_count }}
        </v-chip>
      </div>

      <div class="text-caption text-grey-darken-1">
        <v-icon size="small" class="mr-1">mdi-calendar</v-icon>
        {{ $t('repositoryCard.createdAt') }} {{ formatDate(repository.created_at) }}
        <br>
        <v-icon size="small" class="mr-1">mdi-update</v-icon>
        {{ $t('repositoryCard.updatedAt') }} {{ formatDate(repository.updated_at) }}
      </div>
    </v-card-text>
    
    <v-card-actions>
      <v-spacer />
      <v-btn
        size="small"
        variant="text"
        color="primary"
        @click.stop="openRepository"
      >
        {{ $t('repositoryCard.viewOnGithub') }}
        <v-icon end>mdi-open-in-new</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const props = defineProps({
  repository: {
    type: Object,
    required: true
  }
})

const openRepository = () => {
  window.open(props.repository.html_url, '_blank')
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const localeCode = locale.value === 'fr' ? 'fr-FR' : 'en-US'
  return date.toLocaleDateString(localeCode, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatNumber = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}
</script>

<style scoped>
.repo-card {
  transition: all 0.3s ease;
  cursor: pointer;
}

.repo-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}

.repo-name {
  font-weight: 600;
  word-break: break-word;
}

.gap-2 > * {
  margin-bottom: 4px !important;
}
</style>
