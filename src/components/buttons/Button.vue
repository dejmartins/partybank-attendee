<template>
    <button
      :disabled="disabled"
      :class="['flex items-center justify-center rounded-[10px]', additionalClasses]"
      v-bind="$attrs"
    >
      {{ action }}
    </button>
  </template>
    
  <script setup lang="ts">
  import { defineProps } from 'vue';
  
  defineProps<{
    action: string,
    disabled: boolean,
    additionalClasses?: string
  }>()
  </script>