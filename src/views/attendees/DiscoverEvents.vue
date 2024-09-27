<template>
  <div class="flex flex-col">
    <div class="fixed z-10 top-0 left-0 right-0 bg-white px-8 font-bold text-xl my-3 md:px-32">
      <div class="w-full fixed top-32 left-0 right-0 bg-white z-50 px-5 pt-3 md:px-20">
        <div class="flex justify-between items-center border-b-2 pb-2 px-6 md:px-10">
          <p class="font-bold whitespace-nowrap">Discover Events</p>

          <div class="flex items-center gap-[10px]">
            <div class="whitespace-nowrap flex gap-[10px] overflow-x-auto text-sm w-40 w-full md:text-lg">
              <Button
                v-for="city in visibleCities" 
                :key="city"  
                :action="city" 
                :disabled=false
                @click="selectCity(city)"
                :additionalClasses="`py-[4px] px-[9px] text-sm md:text-lg md:py-[7px] md:px-[18px] border rounded-[22px] text-[#797979] 
                          ${city === selectedCity ? 'bg-[var(--pb-c-red)] border-[#4E0916] text-white' : 'border-[#797979] bg-[#FBFBFB]'}`"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="p-8">
      <img
        v-if="isLoading"
        src="@/assets/images/explore-loader.gif"
        class="absolute bottom-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-32 md:mt-20"
        alt="Explore Gif Loader"
      />

      <NoEvent v-if="!isLoading && filteredEvents.length === 0" :selected-state='selectedCity' />
      
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 mt-20 mb-10 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
        <EventCard
          v-for="event in filteredEvents"
          :key="event.id"
          :eventId="event.event_reference"
          :imageUrl="event.image_url"
          :series_logo="event.series_logo"
          :location="event.location"
          :venue="event.venue"
          :time="event.time"
          :status="event.status"
          :eventName="event.event_name"
          :eventDate="moment(event.date).format('MMMM Do, YYYY')"
        />
      </div>
    </div>
  </div>
</template>



<script setup lang="ts">
import EventCard from '@/components/events/EventCard.vue'
import NoEvent from '@/components/events/NoEvent.vue'
import { ref, onMounted, computed } from 'vue'
import Api from '@/utils/api'
import Button from '@/components/buttons/Button.vue'
import { type Event } from '@/utils/types'
import moment from 'moment'

const isLoading = ref(false)
const events = ref<Array<Event>>([])
const selectedCity = ref('Asaba')
const cities = ref(['Asaba', 'Port-Harcourt'])
const visibleCities = ref(cities.value.slice(0, 3))
const { DISCOVER_EVENTS } = Api()

// Methods
const selectCity = (city: string) => {
  selectedCity.value = city
}

const getEvents = async () => {
  isLoading.value = true

  await fetch(`${DISCOVER_EVENTS}?page=1&size=90`, {
    method: 'GET'
  })
    .then((res) => res.json())
    .then((response) => {
      events.value = response
      console.log(response)
      isLoading.value = false
    })
    .catch((error: any) => {
      // toast.error('Error fetching event details')
      console.log(error)
      isLoading.value = false
    })
}

const filteredEvents = computed(() => {
  return events.value.filter((event) => {
    return event.location.city === selectedCity.value;
    // return (
    //   event.location.city === selectedCity.value &&
    //   moment(event.date, 'DD MMM, YYYY').isSameOrAfter(moment().subtract(1, 'day'), 'day')
    // )
  })
})

onMounted(() => {
  getEvents()
})
</script>
