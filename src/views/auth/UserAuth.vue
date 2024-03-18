<template>
  <BaseCard>
    <BaseDialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </BaseDialog>
    <BaseDialog fixed :show="isLoading" title="Authenticating">
      <BaseSpinner />
    </BaseDialog>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">Email</label>
        <input type="text" id="email" v-model.trim="data.email" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password" v-model.trim="data.password" />
      </div>
      <p v-if="!formIsValid">
        Please enter a valid email and password (must be at least 6 characters long).
      </p>
      <BaseButton>{{ submitButtonCaption }}</BaseButton>
      <BaseButton mode="flat" type="button" @click="switchMode"
        >{{ switchButtonCaption }} instead</BaseButton
      >
    </form>
  </BaseCard>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
const data = ref({
  email: '',
  password: ''
})

const router = useRouter()
const route = useRoute()

const formIsValid = ref(true)
const mode = ref('login')
const error = ref(null)
const isLoading = ref(false)

const store = useStore()

const submitButtonCaption = computed(() => {
  if (mode.value === 'login') {
    return 'Login'
  } else {
    return 'Signup'
  }
})

const switchButtonCaption = computed(() => {
  if (mode.value === 'login') {
    return 'Signup'
  } else {
    return 'Login'
  }
})

const submitForm = async () => {
  if (
    data.value.email === '' ||
    !data.value.email.includes('@') ||
    data.value.password.length < 6
  ) {
    formIsValid.value = false
    return
  }

  isLoading.value = true
  const { email, password } = data.value
  try {
    if (mode.value === 'login') {
      await store.dispatch('login', { email, password })
    } else {
      await store.dispatch('signup', { email, password })
    }
    const redirectUrl = '/' + (route.query.redirect || 'coaches')
    router.replace(redirectUrl)
  } catch (err) {
    error.value = err.message || 'Failed to authenticate, try later.'
  }

  isLoading.value = false
}

const handleError = () => {
  error.value = null
}

const switchMode = () => {
  if (mode.value === 'login') {
    mode.value = 'signup'
  } else {
    mode.value = 'login'
  }
}
</script>

<style scoped>
form {
  margin: 1rem;

  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
