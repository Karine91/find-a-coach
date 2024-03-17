<template>
  <div>
    <section>
      <BaseCard>
        <h2>{{ fullName }}</h2>
        <h3>${{ hourlyRate }}</h3>
      </BaseCard>
    </section>
    <section>
      <BaseCard>
        <header>
          <h2>Interested? Reach out now!</h2>
          <BaseButton link :to="contactLink">Contact</BaseButton>
        </header>
        <RouterView></RouterView>
      </BaseCard>
    </section>
    <section>
      <BaseCard>
        <BaseBadge v-for="area in areas" :key="area" :type="area" :title="area"></BaseBadge>
        <p>{{ description }}</p>
      </BaseCard>
    </section>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const props = defineProps(['id'])

const selectedCoach = ref(null)
const store = useStore()
const route = useRoute()

onBeforeMount(() => {
  selectedCoach.value = store.getters['coaches/coaches'].find((coach) => coach.id === props.id)
})

const contactLink = computed(() => `${route.path}/${props.id}/contact`)
const hourlyRate = computed(() => selectedCoach.value?.hourlyRate)
const areas = computed(() => selectedCoach.value?.areas)
const fullName = computed(
  () => `${selectedCoach.value?.firstName} ${selectedCoach.value?.lastName}`
)
const description = computed(() => selectedCoach.value.description)
</script>
