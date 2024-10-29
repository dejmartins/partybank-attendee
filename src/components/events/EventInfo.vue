<template>
    <div class="flex flex-col md:flex-row w-full h-[calc(100vh-210px)] overflow-y-auto md:overflow-y-hidden rounded-[20px] bg-[#F9F7F7] p-6 md:p-10 mt-4 border border-[#F2EFEF] custom-scrollbar">
        <div class="md:w-1/3 md:sticky md:top-0 md:border-r md:border-[#DDE0E3] md:pr-6 px-0 md:px-2">
            <div class="relative w-full h-full flex flex-col text-left">
            <img :src="event?.image_url" alt="Event Image" class="w-full h-auto object-cover rounded-[20px] border border-[#DDE0E3]" />
            </div>
        </div>
  
        <div class="mt-5 md:mt-0 w-full md:w-2/3 px-0 md:px-2 md:pl-6 md:overflow-y-auto h-[calc(100vh-290px)] custom-scrollbar">
            <div class="border-b-[1px] pb-3">
                <div class="flex flex-col gap-2">
                    <p class="text-[19px] md:text-[23px] font-[700]">{{ event?.event_name }}</p>
                    <div class="flex flex-wrap items-center gap-x-10 gap-y-2">
                        <div class="flex items-center gap-2">
                            <div class="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--pb-c-white)]">
                                <MapPinIcon class="size-6" />
                            </div>
                            <div class="flex flex-col">
                                <p class="text-[17px] font-[500]">{{ event?.location.city }}, {{ event?.location.country }}</p>
                                <p class="text-[15px] font-[200] line-clamp-1">{{ event?.venue }}</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--pb-c-white)]">
                                <CalendarDaysIcon class="size-6" />
                            </div>
                            <p class="text-[15px] font-[200]">{{ event?.date }}</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--pb-c-white)]">
                                <ClockIcon class="size-6" />
                            </div>
                            <p class="text-[15px] font-[200]">{{ event?.time }}</p>
                        </div>
                    </div>
                </div>
            </div>
    
            <GetTickets :event="event" />

            <div class="mt-5 pb-3">
                <p class="text-[20px] md:text-[20px] font-[600]">About Event</p>
                <p class="mb-10">{{ event?.description ? event?.description : 'Event details not available' }}</p>
            </div>

            <!-- <div>{{ event?.tickets }}</div> -->

            <!-- <div class="mt-5">
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
            </div> -->
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
  
