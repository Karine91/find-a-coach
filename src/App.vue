<script setup>
import { onBeforeMount, watch, computed } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import TheHeader from './components/layout/TheHeader.vue'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

onBeforeMount(() => {
  store.dispatch('tryLogin')
})

const didAutoLogout = computed(() => store.getters.didAutoLogout)

watch(didAutoLogout, (newVal, oldVal) => {
  if (newVal && newVal !== oldVal) {
    router.replace('/coaches')
  }
})
</script>

<template>
  <TheHeader />
  <RouterView v-slot="props">
    <transition name="route" mode="out-in">
      <component :is="props.Component"></component>
    </transition>
  </RouterView>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}
</style>
