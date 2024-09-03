<template>
    <div class="flex justify-center">
      <div class="event-container flex flex-col mb-10 w-full md:w-[80%]">
        <div class="event-detail flex flex-col">
          <div class="event-image-container">
            <div
              class="event-image w-full"
              :style="{
                backgroundImage:
                  'url(' + (event?.eventImage || '/defaultImage.png') + ')'
              }"
            ></div>
          </div>

          <div class="event-info mt-5">
            <p class="font-light">Hosted By</p>
            <hr class="mb-[10px]" />
            <p class="font-semibold">{{ event?.date }}</p>
            <a href="#" class="text-gray-400 text-sm font-bold block">Contact the Host</a>
          </div>
        </div>

        <div class="event-details flex-1">
          <p class="text-2xl md:text-3xl lg:text-4xl font-bold">{{ event?.event_name }}</p>

          <div>
            <div class="text-gray-500 mt-3 leading-7">
              <a
                :href="event?.mapUrl"
                target="_blank"
                class="location flex items-center"
              >
                <fa-icon class="pr-2" :icon="['fas', 'location-dot']" style="color: #b0b0b0" />
                {{ event?.venue }}
              </a>

              <p>
                <fa-icon class="mr-1" :icon="['far', 'calendar-days']" style="color: #b0b0b0" />
                {{ moment(event?.date).format('MMMM Do, YYYY') }}
              </p>

              <p>
                <fa-icon class="mr-1" :icon="['far', 'clock']" style="color: #b0b0b0" />
                {{ event?.time }}
              </p>
            </div>

            <div class="mt-4">
              <Tickets :event="event"/>
            </div>

            <div class="mt-4">
              <p class="text-lg font-semibold">About Event</p>
              <hr class="my-2" />
              <p class="text-gray-500 text-sm md:text-base">
                {{ event?.about }}
              </p>
            </div>
          
            <div class="mt-4">
              <p class="text-sm font-semibold">Location</p>
              <hr class="my-2" />
              <div class="mt-4">
                <iframe
                  :src="event?.mapEmbeddedUrl"
                  width="100%"
                  height="250"
                  style="border-radius: 10px"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { type Event } from '@/utils/types';
import Tickets from '@/components/layouts/GetTickets.vue'
import moment from 'moment';

defineProps<{
  event: Event | null
}>()
</script>

<style scoped>
.event-container {
  display: flex;
  flex-direction: row;
  max-width: 900px;
}

.event-detail {
  width: 50%;
  margin-right: 40px;
}

.event-image-container {
  width: 100%;
  text-align: center;
}

.event-image {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 15px;
  width: 100%;
  height: 480px;
}

@media (max-width: 765px) {
  .event-container {
    flex-direction: column;
  }

  .event-detail {
    width: 100%;
  }

  .event-details {
    margin-top: 20px;
  }

  .event-image {
    width: 100%;
    height: 420px;
  }
}
</style>
