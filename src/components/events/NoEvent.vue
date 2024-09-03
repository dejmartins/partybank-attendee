<template>
    <div class="m-20 text-center flex flex-col items-center fixed right-0 left-0 top-56 my-20 text-lg">
        <img
          src="@/assets/images/EmptyState.png"
          class="h-32"
          alt="Phones Icons"
        />
        <p class="font-bold">No events</p>
        <p class="text-[#4A4A4A]">There are no events in {{ selectedCity }} at the moment</p>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    selectedCity: string
}>()
</script>