<template>
    <button
      :disabled="disabled"
      class="px-5 py-3 text-sm rounded-md font-semibold flex items-center justify-center"
    >
      <span v-if="!loading">{{ action }}</span>
      <span v-else class="loader"></span>
    </button>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    action: string
    loading: boolean
    disabled: boolean
  }>()
  </script>
  
  <style scoped>
  button {
    background-color: transparent;
    color: var(--pb-c-white);
    border: 2px solid var(--pb-c-blue);
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: var(--pb-c-blue);
    color: var(--pb-c-white);
  }
  
  .loader {
    border: 3px solid #f3f3f3;
    border-top: 3px solid var(--pb-c-blue);
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
  