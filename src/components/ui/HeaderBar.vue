<template>
  <header class="fixed top-0 left-0 w-full bg-[#FFFFFF] border-b text-[#080D18] py-4 z-50">
    <div class="flex justify-between items-center px-6">
          <RouterLink to="/">
              <img
                  src="/pb-logo.png"
                  class="w-[65px]"
                  alt="Partybank Logo"
              />
          </RouterLink>
        <ProfileIcon/>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import ProfileIcon from './ProfileIcon.vue';
import { RouterLink } from 'vue-router';

defineProps<{
  additionalClasses?: string
}>();

const authStore = useAuthStore();

const isLoggedIn = computed(() => authStore.isAuthenticated);
</script>
