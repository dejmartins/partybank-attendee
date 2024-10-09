<template>
  <div class="flex flex-col md:flex-row w-full h-[calc(100vh-270px)] overflow-y-auto md:overflow-y-hidden rounded-[20px] bg-[#F9F7F7] p-6 md:p-10 mt-2 border border-[#F2EFEF] custom-scrollbar">
    <div class="md:w-1/3 md:sticky md:top-0 md:border-r md:border-[#DDE0E3] md:pr-6 px-0 md:px-2">
      <div class="relative w-full h-full flex flex-col text-left">
        <img :src="stateImage" alt="State Image" class="w-full aspect-square object-cover rounded-[20px] border border-[#DDE0E3]" />
        <div class="mt-3 text-left">
          <h2 class="text-[24px] font-[400]">{{ selectedState }}<span class="font-[600] italic">, Nigeria</span></h2>
          <p class="font-[400] text-[18px]">{{ stateSlogan }}</p>
        </div>
      </div>
    </div>

    <div class="w-full md:w-2/3 px-0 md:px-2 md:pl-6 md:overflow-y-auto h-[calc(100vh-340px)] custom-scrollbar">
      <div v-if="isLoading" class="flex flex-col gap-4 mt-5 md:mt-0">
        <EventCardSkeleton v-for="i in 5" :key="i" />
      </div>

      <div v-else-if="filteredEvents.length === 0" class="flex justify-center items-center text-center py-6">
        <NoEvent :selected-state="selectedState" />
      </div>

      <div v-else class="flex flex-col gap-4 mt-5 md:mt-0">
        <EventCard
          v-for="event in filteredEvents"
          :key="event.event_reference"
          :eventId="event.event_reference"
          :imageUrl="event.image_url"
          :location="event.location"
          :venue="event.venue"
          :time="event.time"
          :eventName="event.event_name"
          :eventDate="moment(event.date).format('MMMM Do, YYYY')"
        />
      </div>
    </div>
  </div>
</template>

  
<script setup lang="ts">
import Api from '@/utils/api';
import EventCard from './EventCard.vue';
import moment from 'moment';
import NoEvent from './NoEvent.vue';
import EventCardSkeleton from '../ui/skeletons/EventCardSkeleton.vue';
import type { Event } from '@/utils/types';
import { ref, computed, onMounted } from 'vue';

const { DISCOVER_EVENTS } = Api();

const props = defineProps({
    selectedState: {
        type: String,
        required: true
    }
});

const events = ref<Array<Event>>([]);
const isLoading = ref(true);

const stateImage = computed(() => {
    const stateImages = {
        Lagos: 'https://res.cloudinary.com/drddoxnsi/image/upload/v1727310997/PARTYBANK/image_6_cvzkev.png',
        Rivers: 'https://res.cloudinary.com/drddoxnsi/image/upload/v1727805865/PARTYBANK/rivers-state1_hqequz.jpg',
        Edo: 'https://res.cloudinary.com/drddoxnsi/image/upload/v1727805717/PARTYBANK/benin-city-gremio-herreros_kgogkf.jpg',
        Delta: 'https://res.cloudinary.com/drddoxnsi/image/upload/v1727311013/PARTYBANK/asaba-2_fxxbxy.jpg'
    };
    // @ts-ignore
    return stateImages[props.selectedState] || '/defaultImage.png';
});

const stateSlogan = computed(() => {
    const stateSlogans = {
        Lagos: 'Centre of Excellence',
        Rivers: 'Treasure Base of the Nation',
        Edo: 'Heartbeat of the Nation',
        Delta: 'The Big Heart'
    };
    // @ts-ignore
    return stateSlogans[props.selectedState] || 'Explore the beauty!';
});

const getEvents = async () => {
    isLoading.value = true;
    try {
        const res = await fetch(`${DISCOVER_EVENTS}?page=1&size=90`);
        const data = await res.json();
        console.log(data);
        events.value = data;
    } catch (error) {
        console.error('Error fetching event details:', error);
    } finally {
        isLoading.value = false;
    }
};

const filteredEvents = computed(() => {
    return events.value.filter((event) => event.location.state === props.selectedState);
});

onMounted(() => {
    getEvents();
});
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
