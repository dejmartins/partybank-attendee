<template>
  <button
    :disabled="disabled"
    :class="['px-5 py-3 border-[2px] rounded-[10px] flex items-center justify-center transition duration-[0.3s]', additionalClasses]"
  >
    <i :class="{ 'mr-3': hasSlotContent }">
      <slot></slot>
    </i>
    <span v-if="!loading" :class="textStyle">{{ action }}</span>
    <span v-else :class="['loader', additionalLoaderClasses]"></span>
  </button>
</template>
  
<script setup lang="ts">
import { computed, useSlots } from 'vue'
defineProps<{
  action: string
  loading: boolean
  disabled: boolean
  textStyle?: string
  additionalClasses?: string
  additionalLoaderClasses?: string
}>()

const slots = useSlots()

const hasSlotContent = computed(() => !!slots.default)
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
  