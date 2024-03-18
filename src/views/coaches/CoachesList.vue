<template>
  <div>
    <BaseDialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </BaseDialog>
    <section><CoachFilter @change-filter="setFilters" /></section>
    <section>
      <BaseCard>
        <div class="controls">
          <BaseButton mode="outline" @click="loadCoaches(true)">Refresh</BaseButton>
          <BaseButton v-if="isLoggedIn && !isCoach && !isLoading" link to="/register"
            >Register as Coach</BaseButton
          >
          <BaseButton link to="/auth?redirect=register" v-if="!isLoggedIn"
            >Login to Register as a Coach</BaseButton
          >
        </div>
        <div v-if="isLoading">
          <BaseSpinner />
        </div>
        <ul v-else-if="hasCoaches">
          <CoachItem v-for="coach in filteredCoaches" :key="coach.id" v-bind="coach" />
        </ul>
        <h3 v-else>No coaches found.</h3>
      </BaseCard>
    </section>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import CoachItem from '@/components/coaches/CoachItem.vue'
import CoachFilter from '@/components/coaches/CoachFilter.vue'

const store = useStore()
const filters = ref({
  frontend: true,
  backend: true,
  career: true
})
const isLoading = ref(false)
const error = ref(null)
const isLoggedIn = computed(() => store.getters.isAuthenticated)

const filteredCoaches = computed(() => {
  return store.getters['coaches/coaches'].filter((item) => {
    if (filters.value.frontend && item.areas.includes('frontend')) {
      return true
    }
    if (filters.value.backend && item.areas.includes('backend')) {
      return true
    }
    if (filters.value.career && item.areas.includes('career')) {
      return true
    }

    return false
  })
})

const isCoach = computed(() => store.getters['coaches/isCoach'])

const hasCoaches = computed(() => !isLoading.value && store.getters['coaches/hasCoaches'])

const setFilters = (updatedFilters) => {
  filters.value = updatedFilters
}

const loadCoaches = async (refresh = false) => {
  isLoading.value = true
  try {
    await store.dispatch('coaches/loadCoaches', { forceRefresh: refresh })
  } catch (err) {
    error.value = err.message || 'Something went wrong!'
  }

  isLoading.value = false
}

const handleError = () => {
  error.value = null
}

onMounted(loadCoaches)
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
