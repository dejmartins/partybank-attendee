<template>
  <div class="popup">
    <div class="inner-popup">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.96);
  display: flex;
  justify-content: center;
  overflow-y: auto;
  padding: 20px;
}

.inner-popup {
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
}
</style>
