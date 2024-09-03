<template>
    <div class="w-full">
      <form @submit.prevent="handleResetPassword">
        <div class="">
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="mt-1 p-2 w-full rounded-md outline-0 focus:ring-1 focus:ring-[var(--pb-c-blue)]"
            placeholder="Enter your password"
          />
        </div>
  
        <div class="mb-4">
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            required
            class="mt-1 p-2 w-full rounded-md outline-0 focus:ring-1 focus:ring-[var(--pb-c-blue)]"
            placeholder="Confirm your password"
          />
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
import { ref } from 'vue';

const password = ref('');
const confirmPassword = ref('');

const handleResetPassword = () => {
    password.value = '';
    confirmPassword.value = '';
};
</script>
