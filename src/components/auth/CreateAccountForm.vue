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
        <!-- <p v-if="error.nameError" class="text-red-500 text-sm">Name is required.</p> -->
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
        <!-- <p v-if="error.emailError" class="text-red-500 text-sm">Invalid email address.</p> -->
      </div>

      <div>
        <input
          type="tel"
          id="phone"
          v-model="userInfo.phone"
          class="mt-1 p-2 w-full rounded-md outline-0 focus:ring-1 focus:ring-[var(--pb-c-blue)]"
          placeholder="Enter your phone number"
          :class="{ error: error.phoneError }"
        />
        <!-- <p v-if="error.phoneError" class="text-red-500 text-sm">Phone number is required.</p> -->
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
        <!-- <p v-if="error.passwordError" class="text-red-500 text-sm">Password is required.</p> -->
      </div>

      <div class="mb-4">
        <input
          type="password"
          id="confirmPassword"
          v-model="userInfo.confirmPassword"
          class="mt-1 p-2 w-full rounded-md outline-0 focus:ring-1 focus:ring-[var(--pb-c-blue)]"
          placeholder="Confirm your password"
          :class="{ error: error.confirmPasswordError }"
        />
        <!-- <p v-if="error.confirmPasswordError" class="text-red-500 text-sm">Passwords do not match.</p> -->
      </div>

      <button
        type="submit"
        class="w-full cursor-pointer bg-[var(--pb-c-blue)] text-white py-2 rounded-md hover:bg-blue-600 transition-colors mb-3"
      >
        Continue
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';

const userInfo = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
});

const error = reactive({
  nameError: false,
  emailError: false,
  phoneError: false,
  passwordError: false,
  confirmPasswordError: false
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Methods
const validateUserInfo = () => {
  error.nameError = userInfo.name === '';
  error.emailError = userInfo.email === '' || !emailRegex.test(userInfo.email);
  error.phoneError = userInfo.phone === '';
  error.passwordError = userInfo.password === '';
  error.confirmPasswordError = userInfo.password !== userInfo.confirmPassword;
};

const handleSignUp = () => {
  validateUserInfo();
  
  if (isUserInfoValidated.value) {
    alert(`Sign-Up successful for ${userInfo.email} with phone ${userInfo.phone}!`);
    
    // Reset form
    userInfo.name = '';
    userInfo.email = '';
    userInfo.phone = '';
    userInfo.password = '';
    userInfo.confirmPassword = '';
  } else {
    alert('Please fill in all fields correctly.');
  }
};

// Computed Properties
const isUserInfoValidated = computed(() => {
  return !error.nameError && !error.emailError && !error.phoneError && !error.passwordError && !error.confirmPasswordError;
});
</script>

<style scoped>
.error {
  border-color: red;
}

.sign-up-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
}
</style>
