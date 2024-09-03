<template>
  <button
    :disabled="disabled"
    class="px-5 py-3 text-sm rounded-full flex items-center"
  >
    <i :class="{ 'mr-3': hasSlotContent }">
      <slot></slot>
    </i>
    {{ action }}
  </button>
</template>

<script setup lang="ts">
import { computed, defineProps, useSlots } from 'vue'

defineProps<{
  action: string
  disabled: boolean
}>()

const slots = useSlots()

const hasSlotContent = computed(() => !!slots.default)
</script>

<style scoped>
@media (max-width: 765px) {
  i {
    margin-right: 5px;
  }
}
</style>
