<template>
  <Header />

  <div class="pt-32">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/layouts/HeaderBar.vue'
</script>
