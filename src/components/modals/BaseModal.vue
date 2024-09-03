<template>
  <div class="popup">
    <div :class="['inner-popup', additionalClasses]">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  additionalClasses?: string
}>()
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}

.inner-popup {
  background-color: white;
  padding: 25px;
  border-radius: 30px;
  border: 1px solid rgb(178, 178, 178);
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
}
</style>
