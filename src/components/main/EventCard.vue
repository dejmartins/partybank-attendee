<template>
  <router-link :to="{ name: 'event-details', params: { eventReference: eventId } }">
    <div class="event-container relative flex flex-col border h-[300px] rounded-[10px]">
      <div class="event-image" :style="{ backgroundImage: `url(${imageUrl ? imageUrl : defaultImage})` }">
        <slot></slot>
      </div>
      <div class="mt-4 mx-3">
        <div class="w-full flex items-center justify-between pb-2">
          <p class="text-[15px] font-bold">{{ eventName }}</p>
        </div>
        <p class="text-gray-600 text-sm my-1">
          <fa-icon class="mr-1" :icon="['far', 'calendar']" style="color: #b0b0b0;" />
          {{ eventDate }}
        </p>
        <div class="pb-3 w-full flex justify-between items-center">
          <a href="https://maps.app.goo.gl/3fRgCyAeWZ6TxqWJ8" target="_blank" class="location text-gray-500 text-sm">
            <fa-icon class="mr-1" :icon="['fas', 'location-dot']" style="color: #b0b0b0;" />
            {{ location }}
          </a>
          <div
            class="profile-icon"
            :style="{ backgroundImage: `url(${series_logo})` }"
          ></div>
        </div>
        <p :class="clsx('event-status absolute top-0 left-3 border-2', {
          'text-[#FF0F00] bg-[#FFE3E1] border-[#FF0F00]' : status === 'Sold out',
          'text-[#084300] border-[#4CAF50] bg-[#ddf7da]' : status === 'Available',
          'text-[#FFA800] border-[#FFA800] bg-[#FFF5E2]' : status === 'Few tickets left',
        })" v-if="status">{{ status }}</p>
      </div>
    </div>
  </router-link>
</template>


<script setup lang="ts">
import clsx from 'clsx';
import defaultImage from '/defaultImage.png';

defineProps<{
  eventId: number;
  imageUrl?: string;
  eventDate: string;
  eventName: string;
  location: string;
  series_logo: string;
  status?: string;
}>();
</script>


<style scoped>
.event-container {
  transition: transform 0.2s, box-shadow 0.2s;
}

.event-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(130, 130, 130, 0.2);
}

.event-image {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  flex: 1;
}

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

@media (max-width: 765px) {
  .event-image {
    height: 200px;
  }

  .location:hover {
    color: rgb(0, 66, 0);
  }
}
</style>
