<template>
  <div class="w-full">
    <form @submit.prevent="handleSignUp">
      <div>
        <input
          type="text"
          id="name"
          v-model="userInfo.name"
          class="mt-1 p-2 w-full rounded-md outline-0 focus:ring-1 focus:ring-[var(--pb-c-blue)]"
          placeholder="Enter your full name"
          :class="{ error: error.nameError }"
        />
      </div>

      <div>
        <input
          type="email"
          id="email"
          v-model="userInfo.email"
          class="mt-1 p-2 w-full rounded-md outline-0 focus:ring-1 focus:ring-[var(--pb-c-blue)]"
          placeholder="Enter your email"
          :class="{ error: error.emailError }"
        />
      </div>

      <button
        type="submit"
        class="mt-5 w-full cursor-pointer bg-[var(--pb-c-blue)] text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Continue
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { RouterLink } from 'vue-router';

const userInfo = reactive({
  email: '',
  name: '',
});

const error = reactive({
  emailError: false,
  nameError: false
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Methods
const validateUserInfo = () => {
  error.emailError = userInfo.email === '' || !emailRegex.test(userInfo.email);
  error.nameError = userInfo.name === '';
};

const handleSignUp = () => {
  validateUserInfo();

  if (isUserInfoValidated.value) {
    alert(`Sign-Up successful for ${userInfo.email}!`);
    return;
  }

  userInfo.email = '';
  userInfo.name = '';
};

// Computed Properties
const isUserInfoValidated = computed(() => {
  return !error.emailError && !error.nameError;
})
</script>

<style scoped>
.error {
  border-color: red;
}
</style>
