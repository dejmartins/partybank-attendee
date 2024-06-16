<template>
  <button class="px-5 py-2 text-sm rounded-full">{{ action }}</button>
</template>

<script setup lang="ts">
defineProps<{
  action: string
}>()
</script>

<style scoped>
button {
  background-color: var(--pb-c-blue);
}
</style>

<style scoped>
button {
  background-color: var(--pb-c-white);
  color: var(--pb-c-blue);
  border: 2px solid var(--pb-c-blue);
  transition: background-color 0.3s;
}

button:hover {
  background-color: var(--pb-c-blue);
  color: var(--pb-c-white);
}
</style>
