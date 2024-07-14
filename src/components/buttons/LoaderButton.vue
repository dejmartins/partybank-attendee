<template>
  <button
    :disabled="disabled"
    :class="['px-5 py-3 text-sm border-[2px] rounded-md font-semibold flex items-center justify-center transition duration-[0.3s]', additionalClasses]"
  >
    <span v-if="!loading">{{ action }}</span>
    <span v-else :class="['loader', additionalLoaderClasses]"></span>
  </button>
</template>
  
<script setup lang="ts">
defineProps<{
  action: string
  loading: boolean
  disabled: boolean
  additionalClasses?: string
  additionalLoaderClasses?: string
}>()
</script>
  
<style scoped>  
.loader {
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
  