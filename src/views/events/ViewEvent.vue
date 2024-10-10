<template>
  <main class="w-full flex flex-col border-[var(--pb-c-soft-grey)] rounded-t-[40px]">
    <div class="flex items-center gap-7 py-3 border-0 border-b-[3px] px-6 lg:px-20 border-[var(--pb-c-soft-grey)]">
      <BackButton href="/discover" />
      <p class="text-[23px] md:text-[30px] font-[700]">View Event</p>
    </div>

    <div class="flex-grow px-6 lg:px-20 overflow-hidden">
      <div v-if="isLoading">
        <EventInfoSkeleton />
      </div>

      <div v-else-if="errorOccurred" class="flex flex-col items-center text-center py-6">
        <p class="text-lg text-red-600 mt-[50px]">Failed to fetch event details. Please try again.</p>
        <button
          class="mt-4 bg-[var(--pb-c-red)] text-white py-2 px-4 rounded-lg"
          @click="getEvents"
        >
          Retry
        </button>
      </div>

      <EventInfo
        v-else
        :event-reference="eventReference"
        :event="event"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import BackButton from '@/components/buttons/BackButton.vue';
import EventInfo from '@/components/events/EventInfo.vue';
import EventInfoSkeleton from '@/components/ui/skeletons/EventInfoSkeleton.vue';
import Api from '@/utils/api';
import type { Event } from '@/utils/types';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';

const { GET_EVENT_BY_REFERENCE } = Api();

const route = useRoute();
const toast = useToast();
const event = ref<Event | null>(null);
const isLoading = ref(true);
const errorOccurred = ref(false);
const eventReference = route.params.eventReference;

onMounted(async () => {
  await getEvents();
});

const getEvents = async () => {
  isLoading.value = true;
  errorOccurred.value = false;

  await fetch(`${GET_EVENT_BY_REFERENCE}/${eventReference}`, {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((response) => {
      if (response) {
        event.value = response;
        isLoading.value = false;
      } else {
        throw new Error('No data returned');
      }
    })
    .catch(() => {
      errorOccurred.value = true;
      isLoading.value = false;
    });
};
</script>
