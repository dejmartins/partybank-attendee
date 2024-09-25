<template>
    <div class="flex flex-col md:flex-row w-full h-[calc(100vh-260px)] rounded-[20px] bg-[#F9F7F7] p-6 md:p-10 mt-2">
      <div class="hidden md:block md:w-1/3 sticky top-0">
        <div class="relative w-full h-full flex flex-col text-left">
          <img :src="stateImage" alt="State Image" class="w-full aspect-square object-cover rounded-[20px]" />
          <div class="mt-4 text-left">
            <h2 class="text-2xl font-bold">{{ selectedState }}, Nigeria</h2>
            <p class="text-lg text-gray-600 mt-2 italic">{{ stateSlogan }}</p>
          </div>
        </div>
      </div>
  
      <div class="w-full md:w-2/3 px-0 md:px-8 overflow-y-auto h-[calc(100vh-340px)] custom-scrollbar">
        <div v-if="isLoading" class="text-center py-6">Loading events...</div>
  
        <div v-else-if="filteredEvents.length === 0" class="text-center py-6">
          <p>No events found for {{ selectedState }}.</p>
        </div>
  
        <div v-else class="">
          <div v-for="event in filteredEvents" :key="event.id" class="p-4 border rounded-lg">
            <img :src="event.image_url || '/default-event-image.png'" alt="Event Image" class="w-full h-[150px] object-cover rounded-md mb-2" />
            <h3 class="text-xl font-bold">{{ event.event_name }}</h3>
            <p class="text-sm text-gray-600">{{ event.location.city }}, {{ event.date }}</p>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script setup lang="ts">
import Api from '@/utils/api';
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
const isLoading = ref(false);

const stateImage = computed(() => {
    const stateImages = {
        Lagos: '',
        Rivers: '',
        Edo: '',
        Delta: ''
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
