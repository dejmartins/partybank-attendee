<template>
    <div class="w-full">
      <form @submit.prevent="handleSignUp">
        <div class="">
          <input
            type="email"
            id="email"
            v-model="email"
            required
            class="mt-1 p-2 w-full rounded-md outline-0 focus:ring-1 focus:ring-[var(--pb-c-blue)]"
            placeholder="Enter your email"
          />
        </div>
  
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

        <RouterLink to="/forgotPassword">
            <p class="text-right text-sm text-[var(--pb-c-blue)] mb-32 hover:underline cursor-pointer">Forgot Password?</p>
        </RouterLink>
  
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
import { RouterLink } from 'vue-router';

const email = ref('');
const phone = ref('');
const password = ref('');
const confirmPassword = ref('');

const handleSignUp = () => {
    if (password.value !== confirmPassword.value) {
        alert('Passwords do not match!');
        return;
    }

    alert(`Sign-Up successful for ${email.value} with phone ${phone.value}!`);

    email.value = '';
    phone.value = '';
    password.value = '';
    confirmPassword.value = '';
};
</script>

<style scoped>
.sign-up-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
}
</style>
