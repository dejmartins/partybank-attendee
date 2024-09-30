<template>
  <router-link :to="{ name: 'event-details', params: { eventReference: eventId } }">
    <div class="border flex items-start md:items-center p-3 rounded-[10px] gap-3 bg-[#FAF9F9]">
      <div class="min-w-[100px] min-h-[100px] border bg-cover bg-center rounded-[10px] overflow-hidden" :style="{ backgroundImage: `url(${imageUrl ? imageUrl : defaultImage})` }">
        <slot></slot>
      </div>
      
      <div>
        <div class="w-full flex items-center justify-between pb-2">
          <p class="text-[20px] md:text-[24px] font-[600]">{{ eventName }}</p>
        </div>

        <div class="flex flex-wrap justify-between gap-2 md:gap-4">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 flex items-center justify-center rounded-full bg-[#F7F4F4]">
              <MapPinIcon class="size-6" />
            </div>
            <div>
              <p class="text-[15px] md:text-[17px] font-[500]">
                {{ location.city }}, {{ location.country }}
              </p>
              <p className="text-[14px] md:text-[15px] font-[400] line-clamp-1">{{ venue }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 flex items-center justify-center rounded-full bg-[#F7F4F4] p-2">
              <CalendarDaysIcon class="size-6" />
            </div>
            <p className="text-[14px] md:text-[15px] line-clamp-2 font-[400]">{{ eventDate }}</p>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 flex items-center justify-center rounded-full bg-[#F7F4F4]">
              <ClockIcon class="size-6" />
            </div>
            <p class="text-[14px] md:text-[15px] line-clamp-2 font-[400]">{{ moment(time, 'H:mm').format('LT') }}</p>
          </div>
        </div>

        <!-- <p :class="clsx('event-status absolute top-0 left-3 border-2', {
          'text-[#FF0F00] bg-[#FFE3E1] border-[#FF0F00]' : status === 'PAST',
          'text-[#084300] border-[#4CAF50] bg-[#ddf7da]' : status === 'ACTIVE',
          'text-[#FFA800] border-[#FFA800] bg-[#FFF5E2]' : status === 'UPCOMING',
        })" v-if="status">{{ status }}</p> -->
      </div>
    </div>
  </router-link>
</template>


<script setup lang="ts">
import defaultImage from '/defaultImage.png';
import { CalendarDaysIcon, ClockIcon, MapPinIcon } from '@heroicons/vue/24/outline';
import moment from 'moment';

defineProps<{
  eventId: string;
  imageUrl?: string;
  eventDate: string;
  eventName: string;
  location: { city: string, country: string };
  status?: string;
  time: string;
  venue: string
}>();
</script>


<style scoped>
.event-status {
  padding: 3px 10px;
  font-weight: bold;
  border-radius: 10px;
  text-align: center;
  margin-top: 10px;
  width: fit-content;
  align-self: center;
  font-size: 12px;
}

.profile-icon {
  display: flex;
  height: 35px;
  width: 35px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 2px solid var(--pb-c-white);
  background-position: center;
  background-size: cover;
  color: var(--pb-c-white);
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  letter-spacing: 0%;
  font-size: 13px;
}
</style>
