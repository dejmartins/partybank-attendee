<template>
    <div class="border border-2 border-[#C0C0C0] my-4 p-5 rounded-[22px]">
      <div class="flex justify-between items-center">
        <p>{{ ticketType }}</p>
        <div :class="`rounded-full ${getColorClass(color)} w-5 h-5 flex items-center justify-center`"></div>
      </div>
      <p class="font-bold text-3xl">{{ totalTicketsValidated }}/{{ totalTicketsSold }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue'
  
  const props = defineProps<{
    ticketType: string
    totalTicketsValidated: number
    totalTicketsSold: number
    color: string
  }>()
  
  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      white: 'bg-white border border-black',
      yellow: 'bg-yellow-500',
      red: 'bg-red-500',
    }
  
    return colorMap[color] || 'bg-green-500'
  }
  </script>
  