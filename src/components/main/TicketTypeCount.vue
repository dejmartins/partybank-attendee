<template>
    <div class="border border-2 border-[#C0C0C0] my-4 p-5 rounded-[22px]">
        <div class="flex justify-between itens-center">
            <p>{{ ticketType }}</p>
            <div :class="`rounded-full bg-${color}-500 w-6 h-6 flex items-center justify-center`"></div>
        </div>
        <p class="font-bold text-3xl">{{ totalTicketsValidated }}/{{ totalTicketsSold }}</p>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    ticketType: string
    totalTicketsValidated: number
    totalTicketsSold: number
    color: string
}>()
</script>