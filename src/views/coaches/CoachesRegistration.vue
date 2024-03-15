<template>
  <section>
    <BaseCard>
      <h2>Register as a coach now!</h2>
      <CoachForm @save-data="saveData" />
    </BaseCard>
  </section>
</template>

<script setup>
import CoachForm from '@/components/coaches/CoachForm.vue'

import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()

const saveData = (formData) => {
  store.dispatch('coaches/registerCoach', formData)
  router.replace('/coaches')
}
</script>
