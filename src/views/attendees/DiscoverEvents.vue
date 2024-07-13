<template>
  <div class="flex flex-col">
    <div class="fixed z-10 top-0 left-0 right-0 bg-white px-8 font-bold text-xl my-3 md:px-32">
      <div class="w-full fixed top-32 left-0 right-0 bg-white z-50 px-5 pt-3 md:px-20">
        <div class="flex justify-between items-center border-b-2 pb-2 px-6 md:px-10">
          <p class="font-bold whitespace-nowrap">Discover Events</p>
          <div class="flex items-center gap-[10px]">
            <!-- <button class="arrow left-arrow" @click="scrollLeft">&lt;</button> -->
            <div class="whitespace-nowrap flex gap-[10px] overflow-x-auto text-sm w-40 w-full md:text-lg">
              <Button
                v-for="city in visibleCities" 
                :key="city"  
                :action="city" 
                :disabled=false
                @click="selectCity(city)"
                :additionalClasses="`py-[4px] px-[9px] text-sm md:text-lg md:py-[7px] md:px-[18px] border rounded-[22px] text-[#797979] ${city === selectedCity ? 'bg-[#1E1E1E] border-[#1E1E1E] text-white' : 'border-[#797979] bg-[#FBFBFB]'}`"
              />
            </div>
            <!-- <button class="arrow right-arrow" @click="scrollRight">&gt;</button> -->
          </div>
        </div>
      </div>
    </div>

    <div class="content-container">
      <img
        v-if="isLoading"
        src="@/assets/images/explore-loader.gif"
        class="loader h-32 md:mt-20"
        alt="Explore Gif Loader"
      />

      <div v-if="!isLoading && filteredEvents.length === 0" class="m-20 text-center flex flex-col items-center fixed right-0 left-0 top-56 my-20 text-lg">
        <img
          src="@/assets/images/EmptyState.png"
          class="h-32"
          alt="Phones Icons"
        />
        <p class="font-bold">No events</p>
        <p class="text-[#4A4A4A]">There are no events in this location at the moment</p>
      </div>
      
      <div v-else class="flex justify-center mt-20 mb-10 flex-wrap">
        <EventCard
          v-for="event in filteredEvents"
          :key="event.eventReference"
          :eventId="event.eventReference"
          :imageUrl="event.eventImage"
          :creator="event.createdBy"
          :location="event.venue"
          :status="event.status"
          :eventName="event.eventName"
          :eventDate="event.eventDate"
        />
      </div>
    </div>
  </div>
</template>



<script setup lang="ts">
import EventCard from '@/components/main/EventCard.vue'
import { ref, onMounted, computed } from 'vue'
import Api from '@/utils/api'
import { useToast } from 'vue-toastification'
import Button from '@/components/buttons/ButtonComponent.vue'

type Event = {
  eventReference: string
  eventImage: string
  createdBy: string
  city: string
  status: string
  eventName: string
  eventDate: string
  venue: string
}

const toast = useToast()
const isLoading = ref(false)
const events = ref<Array<Event>>([])
const selectedCity = ref('Warri')
const cities = ref(['Warri', 'Asaba'])
const visibleCities = ref(cities.value.slice(0, 3))
const { GET_ALL_EVENTS } = Api()

// Methods
const selectCity = (city: string) => {
  selectedCity.value = city
}

const getEvents = async () => {
  isLoading.value = true

  await fetch(`${GET_ALL_EVENTS}`, {
    method: 'GET'
  })
    .then((res) => res.json())
    .then((response) => {
      events.value = response.data
      console.log(response.data)
      isLoading.value = false
    })
    .catch((error: any) => {
      toast.error('Error fetching event details')
      console.log(error)
      isLoading.value = false
    })
}

const scrollLeft = () => {
  const currentIndex = cities.value.indexOf(visibleCities.value[0])
  if (currentIndex > 0) {
    visibleCities.value = cities.value.slice(currentIndex - 1, currentIndex + 2)
  }
}

const scrollRight = () => {
  const currentIndex = cities.value.indexOf(visibleCities.value[0])
  if (currentIndex + 5 < cities.value.length) {
    visibleCities.value = cities.value.slice(currentIndex + 1, currentIndex + 4)
  }
}

const filteredEvents = computed(() => {
  return events.value.filter((event) => {
    return event.city === selectedCity.value;
    // return (
    //   event.location === selectedCity.value &&
    //   moment(event.eventDate, 'DD MMM, YYYY').isSameOrAfter(moment().subtract(1, 'day'), 'day')
    // )
  })
})

onMounted(() => {
  getEvents()
})
</script>

<style scoped>
.loader {
  position: absolute;
  bottom: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.content-container {
  flex: 1;
  overflow-y: auto;
  padding-top: 40px;
  padding-left: 20px;
  padding-right: 20px;
}

/* .arrow {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0 10px;
} */

@media (max-width: 765px) {
  .content-container {
    padding-top: 20px;
    padding-left: 10px;
    padding-right: 10px;
  }

  /* .arrow {
    padding: 0 5px;
  } */
}

@media (min-width: 766px) {
  .cities-container {
    margin-left: auto;
  }
}
</style>
