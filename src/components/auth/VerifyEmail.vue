<template>
  <transition appear v-if="isOpen">
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div
        class="fixed inset-0 bg-black"
        :class="{
          'opacity-0': !backgroundVisible,
          'opacity-100': backgroundVisible
        }"
        style="transition: opacity 1s ease-in-out;"
      ></div>

      <div class="flex items-center justify-center min-h-screen text-center">
        <transition
          enter-active-class="ease-out duration-300"
          enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to-class="opacity-100 translate-y-0 sm:scale-100"
          leave-active-class="ease-in duration-200"
          leave-from-class="opacity-100 translate-y-0 sm:scale-100"
          leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          class="inline-block align-bottom rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="flex flex-col items-center text-white p-10">
            <img src="/loader.png" alt="Partybank Loader" class="mb-4 animate-pulse h-28 w-28" />
            <p class="text-2xl font-bold">Verifying your email</p>
            <p>This will only take a few seconds</p>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const isOpen = ref(true);
const backgroundVisible = ref(false);
const authStore = useAuthStore();

// Methods
const decodeTokenFromUrl = () => {
  const router = useRouter();
  const token = router.currentRoute.value.query.token;

  if (token && typeof token === 'string') {
    const isValid = authStore.checkTokenValidity(token);

    if (isValid && authStore.email === authStore.decodedEmail) {
      console.log('Token is valid and email matches:', authStore.email);
      authStore.isAuthenticated = true;
    } else {
      console.log('Email:', authStore.email)
      console.log('Decoded Email:', authStore.decodedEmail)
      console.log('Token is invalid or email does not match');
      authStore.isAuthenticated = false;
      router.push('/')
    }
  } else {
    console.error('No token found in URL');
    authStore.isAuthenticated = false;
  }
};


onMounted(() => {
  setTimeout(() => {
    backgroundVisible.value = true;
  }, 100);

  decodeTokenFromUrl();
});
</script>

<style scoped>
</style>
