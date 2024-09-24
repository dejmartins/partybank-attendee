<template>
    <div class="flex flex-col min-h-[100vh] bg-[var(--pb-c-soft-grey)] overflow-x-hidden">
        <Header additionalClasses="bg-[var(--pb-c-white)]" />
      
        <div class="mt-24">
          <RouterView />
        </div>
    </div>
</template>

<script setup lang="ts">
import Header from '@/components/ui/HeaderBar.vue'
import { RouterView } from 'vue-router';
</script>
  