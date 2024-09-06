<template>
  <div class="w-full">
    <form @submit.prevent="handleSignUp">
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

      <div>
        <input
          type="password"
          id="password"
          v-model="userInfo.password"
          class="mt-1 p-2 w-full rounded-md outline-0 focus:ring-1 focus:ring-[var(--pb-c-blue)]"
          placeholder="Enter your password"
          :class="{ error: error.passwordError }"
        />
      </div>

      <RouterLink to="/forgotPassword">
        <p class="text-right text-sm text-[var(--pb-c-blue)] mb-3 hover:underline cursor-pointer">Forgot Password?</p>
      </RouterLink>

      <button
        type="submit"
        class="w-full cursor-pointer bg-[var(--pb-c-blue)] text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
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
  password: '',
});

const error = reactive({
  emailError: false,
  passwordError: false
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Methods
const validateUserInfo = () => {
  error.emailError = userInfo.email === '' || !emailRegex.test(userInfo.email);
  error.passwordError = userInfo.password === '';
};

const handleSignUp = () => {
  validateUserInfo();

  if (isUserInfoValidated.value) {
    alert(`Sign-Up successful for ${userInfo.email}!`);
    return;
  }

  userInfo.email = '';
  userInfo.password = '';
};

// Computed Properties
const isUserInfoValidated = computed(() => {
  return !error.emailError && !error.passwordError;
})
</script>

<style scoped>
.error {
  border-color: red;
}
</style>
