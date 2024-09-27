<template>
    <div class="flex flex-col md:flex-row w-full h-[calc(100vh-210px)] overflow-y-auto md:overflow-y-hidden rounded-[20px] bg-[#F9F7F7] p-6 md:p-10 mt-4 border border-[#DDE0E3] custom-scrollbar">
        <div class="md:w-1/3 md:sticky md:top-0 md:border-r-2 md:border-[#DDE0E3] md:pr-6">
            <div class="relative w-full h-full flex flex-col text-left">
            <img :src="event?.image_url" alt="Event Image" class="w-full aspect-square object-cover rounded-[20px] border border-[#DDE0E3]" />
            </div>
        </div>
  
        <div class="mt-5 md:mt-0 w-full md:w-2/3 px-0 md:px-8 md:overflow-y-auto h-[calc(100vh-290px)] custom-scrollbar">
            <div class="border-b-2 pb-3">
                <div class="max-w-[70%] flex flex-col gap-3">
                    <p class="text-[24px] md:text-[24px] font-[600]">{{ event?.event_name }}</p>
                    <div class="flex flex-wrap justify-between gap-2 md:gap-4">
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 flex items-center justify-center rounded-full bg-[#F7F4F4]">
                            <MapPinIcon class="size-6" />
                        </div>
                        <div class="flex flex-col">
                            <p class="text-[17px] font-[500]">{{ event?.location.city }}, {{ event?.location.country }}</p>
                            <p class="text-[15px] font-[200] line-clamp-1">{{ event?.venue }}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 flex items-center justify-center rounded-full bg-[#F7F4F4]">
                            <CalendarDaysIcon class="size-6" />
                        </div>
                        <p class="text-[15px] font-[200]">{{ event?.date }}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 flex items-center justify-center rounded-full bg-[#F7F4F4]">
                            <ClockIcon class="size-6" />
                        </div>
                        <p class="text-[15px] font-[200]">{{ moment(event?.time, 'H:mm').format('LT') }}</p>
                    </div>
                    </div>
                </div>
            </div>
    
            <GetTickets :event="event" />

            <div class="mt-5 border-b-2 pb-3">
                <p class="text-[20px] md:text-[20px] font-[600]">About Event</p>
                <p>{{ event?.about }}</p>
            </div>

            <div class="mt-5">
                <p class="text-[20px] md:text-[20px] font-[600]">Location</p>
                <div class="mt-4">
                <iframe
                  :src="event?.map_embedded_url"
                  width="100%"
                  height="300"
                  style="border-radius: 10px"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import GetTickets from './tickets/GetTickets.vue';
import { CalendarDaysIcon, ClockIcon, MapPinIcon } from '@heroicons/vue/24/outline';
import moment from 'moment';
import { defineProps } from 'vue';
import type { Event } from '@/utils/types';

defineProps<{
    event: Event | null;
}>();
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 10px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #4E0916;
    border-radius: 10px;
    border: 3px solid white;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #E91B41;
}

.custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #4E0916 #f1f1f1;
}
</style>
  
