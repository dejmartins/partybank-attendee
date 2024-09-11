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
import { jwtDecode } from "jwt-decode";

const isOpen = ref(true);
const backgroundVisible = ref(false);

const decodeTokenFromUrl = () => {
  const router = useRouter();
  const token = router.currentRoute.value.query.token;

  if (token && typeof token === 'string') {
    try {
      const decoded = jwtDecode(token);
      console.log('Decoded Token:', decoded);

      if (decoded.sub) {
        console.log('Email from token:', decoded.sub);
      }

      const currentTime = Date.now() / 1000;
      if (decoded.exp && decoded.exp < currentTime) {
        console.log('Token has expired');
      } else {
        console.log('Token is still valid');
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  } else {
    console.error('No token found in URL');
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
