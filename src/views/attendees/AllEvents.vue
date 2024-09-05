<template>
  <Header additionalClasses="bg-[var(--pb-c-white)]" />

  <div class="pt-32">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/ui/HeaderBar.vue'
</script>
