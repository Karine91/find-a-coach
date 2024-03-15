<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control" :class="{ invalid: !data.firstName.isValid }">
      <label for="firstname">Firstname</label>
      <input
        type="text"
        id="firstname"
        v-model.trim="data.firstName.val"
        @blur="clearValidation('firstName')"
      />
      <p v-if="!data.firstName.isValid">Firstname must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !data.lastName.isValid }">
      <label for="lastname">Lastname</label>
      <input
        type="text"
        id="lastname"
        v-model.trim="data.lastName.val"
        @blur="clearValidation('lastName')"
      />
      <p v-if="!data.lastName.isValid">Lastname must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !data.description.isValid }">
      <label for="description">Description</label>
      <textarea
        rows="5"
        id="description"
        v-model.trim="data.description.val"
        @blur="clearValidation('description')"
      />
      <p v-if="!data.description.isValid">Description must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !data.rate.isValid }">
      <label for="rate">Hourly Rate</label>
      <input
        type="number"
        id="rate"
        v-model.number="data.rate.val"
        @blur="clearValidation('rate')"
      />
      <p v-if="!data.rate.isValid">Hourly Rate must be greater than 0</p>
    </div>
    <div class="form-control" :class="{ invalid: !data.areas.isValid }">
      <h3>Areas of Expertise</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="data.areas.val"
          @blur="clearValidation('areas')"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="data.areas.val"
          @blur="clearValidation('areas')"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="data.areas.val"
          @blur="clearValidation('areas')"
        />
        <label for="career">Career Advisory</label>
      </div>
      <p v-if="!data.areas.isValid">At least one expertise must be selected</p>
    </div>
    <p v-if="!data.formIsValid">Please fix the above errors and submit again.</p>
    <BaseButton type="submit">Register</BaseButton>
  </form>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['save-data'])

const data = ref({
  firstName: {
    val: '',
    isValid: true
  },
  lastName: {
    val: '',
    isValid: true
  },
  description: {
    val: '',
    isValid: true
  },
  rate: {
    val: null,
    isValid: true
  },
  areas: {
    val: [],
    isValid: true
  },
  formIsValid: true
})

const clearValidation = (input) => {
  data.value[input].isValid = true
}

const validate = () => {
  data.value.formIsValid = true
  if (data.value.firstName.val === '') {
    data.value.firstName.isValid = false
    data.value.formIsValid = false
  }
  if (data.value.lastName.val === '') {
    data.value.lastName.isValid = false
    data.value.formIsValid = false
  }
  if (data.value.description.val === '') {
    data.value.description.isValid = false
    data.value.formIsValid = false
  }
  if (!data.value.rate.val || data.value.rate.val < 0) {
    data.value.rate.isValid = false
    data.value.formIsValid = false
  }
  if (data.value.areas.val.length === 0) {
    data.value.areas.isValid = false
    data.value.formIsValid = false
  }
}

const onSubmit = () => {
  validate()
  if (!data.value.formIsValid) {
    return
  }
  const { firstName, lastName, description, rate, areas } = data.value

  const formData = {
    first: firstName.val,
    last: lastName.val,
    desc: description.val,
    rate: rate.val,
    areas: areas.val
  }
  emit('save-data', formData)
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
