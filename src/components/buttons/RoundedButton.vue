<template>
  <button
    :disabled="disabled"
    class="px-5 py-3 text-[color:var(--pb-c-white)] text-sm rounded-full flex items-center"
  >
    <i class="mr-3">
      <slot></slot>
    </i>
    {{ action }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  action: string
  disabled: boolean
}>()
</script>

<style scoped>
button {
  background-color: var(--pb-c-blue);
}

@media (max-width: 765px) {
  i {
    margin-right: 5px;
  }
}
</style>
