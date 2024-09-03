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

const email = ref('');

const handleSignUp = () => {
    email.value = '';
};
</script>

<style scoped>
.sign-up-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
}
</style>
