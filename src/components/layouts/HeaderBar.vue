<template>
  <div :class="['w-full flex px-10 py-10 justify-center fixed top-0 md:px-20 z-50', additionalClasses]">
      <div class="border w-full flex justify-between items-center rounded-full p-2 px-7">
        <router-link to="/">
          <img class="h-10 z-50 cursor-pointer" src="@/assets/logo.svg" alt="Partybank Logo" />
        </router-link>

        <div class="flex items-center justify-center rounded-full h-9 w-9 bg-[#D1B44E] cursor-pointer">
          <P class="font-[700] text-[20px] text-white">D</P>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
  additionalClasses?: string
}>()
</script>
