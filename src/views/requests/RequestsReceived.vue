<template>
  <div>
    <BaseDialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </BaseDialog>
    <section>
      <BaseCard>
        <header>
          <h2>Requests Received</h2>
        </header>
        <div v-if="isLoading">
          <BaseSpinner />
        </div>
        <ul v-else-if="hasRequests && !isLoading">
          <RequestItem
            v-for="req in receivedRequests"
            :key="req.id"
            :email="req.userEmail"
            :message="req.message"
          ></RequestItem>
        </ul>
        <h3 v-else>You haven't received any requests yet!</h3>
      </BaseCard>
    </section>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import RequestItem from '@/components/requests/RequestItem.vue'

const isLoading = ref(false)
const error = ref(null)

const store = useStore()

const receivedRequests = computed(() => store.getters['requests/requests'])
const hasRequests = computed(() => store.getters['requests/hasRequests'])
const handleError = () => {
  error.value = null
}
const loadRequests = async () => {
  isLoading.value = true
  try {
    await store.dispatch('requests/fetchRequests')
  } catch (err) {
    error.value = err.message || 'Something went wrong!'
  }

  isLoading.value = false
}

onMounted(loadRequests)
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
