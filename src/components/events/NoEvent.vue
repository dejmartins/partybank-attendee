<template>
    <div class="text-center flex flex-col items-center text-lg">
        <div class="flex justify-center items-center bg-[#F3F4F4] rounded-[60px] p-3 h-[200px] w-[200px]">
            <img
              src="@/assets/images/EmptyState.png"
              class="h-[100px]"
              alt="Phones Icons"
            />
        </div>
        <p class="font-bold mt-5">No events found!</p>
        <p class="text-[#4A4A4A]">Currently, there are no events in {{ selectedState }}.</p>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    selectedState: string
}>()
</script>