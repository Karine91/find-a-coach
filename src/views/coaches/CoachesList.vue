<template>
  <section><CoachFilter @change-filter="setFilters" /></section>
  <section>
    <BaseCard>
      <div class="controls">
        <BaseButton mode="outline">Refresh</BaseButton>
        <BaseButton v-if="!isCoach" link to="/register">Register as Coach</BaseButton>
      </div>
      <ul v-if="hasCoaches">
        <CoachItem v-for="coach in filteredCoaches" :key="coach.id" v-bind="coach" />
      </ul>
      <h3 v-else>No coaches found.</h3>
    </BaseCard>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import CoachItem from '@/components/coaches/CoachItem.vue'
import CoachFilter from '@/components/coaches/CoachFilter.vue'

const store = useStore()
const filters = ref({
  frontend: true,
  backend: true,
  career: true
})

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

const hasCoaches = computed(() => store.getters['coaches/hasCoaches'])

const setFilters = (updatedFilters) => {
  filters.value = updatedFilters
}
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
