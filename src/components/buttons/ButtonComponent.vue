<template>
  <button
    :disabled="disabled"
    :class="['px-16 md:px-7 py-[14px] md:py-[12px] text-[color:var(--pb-c-white)] text-sm flex items-center justify-center', additionalClasses]"
    v-bind="$attrs"
  >
    <i class="mr-3 flex items-center">
      <slot></slot>
    </i>
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

<style scoped>
@media (max-width: 765px) {
  i {
    margin-right: 5px;
  }
}
</style>
