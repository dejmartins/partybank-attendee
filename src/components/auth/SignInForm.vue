<template>
  <div class="w-full">
    <form @submit.prevent="handleSignUp">
      <!-- <div>
        <input
          type="text"
          id="name"
          v-model="userInfo.name"
          class="mt-1 p-2 w-full rounded-md outline-0 focus:ring-1 focus:ring-[var(--pb-c-blue)]"
          placeholder="Enter your full name"
          :class="{ error: error.nameError }"
        />
      </div> -->

      <div>
        <input
          type="email"
          id="email"
          v-model="userInfo.email"
          class="mt-5 p-2 w-full rounded-md outline-0 focus:ring-1 focus:ring-[var(--pb-c-blue)]"
          placeholder="Enter your email address"
          :class="{ error: error.emailError }"
        />
      </div>

      <button
        type="submit"
        class="mt-16 w-full cursor-pointer bg-[var(--pb-c-blue)] text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Continue
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, defineEmits } from 'vue';
import Api from '@/utils/api';

const { AUTH } = Api();

const userInfo = reactive({
  email: '',
});

const error = reactive({
  emailError: false,
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emit = defineEmits(['close']);

// Methods
const validateUserInfo = () => {
  error.emailError = userInfo.email === '' || !emailRegex.test(userInfo.email);
};

const handleSignUp = async () => {
  validateUserInfo();

  if (isUserInfoValidated.value) {
    try {
      const response = await fetch(AUTH, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userInfo.email,
        }),
      });

      const data = await response.json();

      console.log(data)

      if (response.ok) {
        emit('close');
        console.log(data.data.username);
      }

    } catch (error) {
      // Handle error
      alert('An error occurred during sign-up. Please try again.');
      console.error('Sign-Up error:', error);
    }

    return;
  }

  userInfo.email = '';
};

// Computed Properties
const isUserInfoValidated = computed(() => {
  return !error.emailError;
})
</script>

<style scoped>
.error {
  border-color: red;
}
</style>
