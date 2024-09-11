<template>
  <div :class="['w-full flex px-10 py-10 justify-center fixed top-0 md:px-20 z-50', additionalClasses]">
    <div class="border w-full flex justify-between items-center rounded-full p-2 px-7">
      <router-link to="/">
        <img class="h-10 z-50 cursor-pointer" src="@/assets/logo.svg" alt="Partybank Logo" />
      </router-link>

      <ProfileIcon v-if="isLoggedIn" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import ProfileIcon from './ProfileIcon.vue';

defineProps<{
  additionalClasses?: string
}>();

const authStore = useAuthStore();

const isLoggedIn = computed(() => !!authStore.email);
</script>
