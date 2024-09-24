<template>
    <div class="flex flex-col min-h-[100vh] bg-[var(--pb-c-soft-grey)] overflow-x-hidden">
        <Header additionalClasses="bg-[var(--pb-c-white)]" />
      
        <div class="flex-grow flex flex-col bg-[var(--pb-c-white)] overflow-y-auto mt-24 md:mx-6 rounded-t-[30px]">
          <RouterView />
        </div>
    </div>
</template>

<script setup lang="ts">
import Header from '@/components/ui/HeaderBar.vue'
import { RouterView } from 'vue-router';
</script>
  