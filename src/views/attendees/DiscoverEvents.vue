<template>
  <div class="main-container">
    <div class="header-container px-8 font-bold text-xl my-3 md:px-32">
      <div class="w-full fixed top-32 left-0 right-0 bg-white z-50 px-5 pt-3 md:px-20">
        <div class="flex justify-between items-center border-b-2 pb-2 px-6 md:px-10">
          <p class="font-bold">Discover Events</p>
          <div class="cities-container">
            <!-- <button class="arrow left-arrow" @click="scrollLeft">&lt;</button> -->
            <div class="cities text-sm md:text-lg">
              <button
                v-for="city in visibleCities"
                :key="city"
                @click="selectCity(city)"
                :class="['city-button', { active: city === selectedCity }]"
              >
                {{ city }}
              </button>
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
        class="loader h-32 mt-20"
        alt="Explore Gif Loader"
      />

      <div v-if="!isLoading && filteredEvents.length === 0" class="no-events-message text-center fixed right-0 left-0 top-56 my-20">
        No events for this city.
      </div>
      <div v-else class="event-card mt-20">
        <EventCard
          v-for="event in filteredEvents"
          :key="event.eventReference"
          :eventId="event.eventReference"
          :imageUrl="event.eventImage"
          :creator="event.createdBy"
          :location="event.location"
          :status="event.status"
          :eventName="event.eventName"
          :startTime="event.startTime"
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
import moment from 'moment'
import { eventsData } from '@/utils/helpers'

type Event = {
  eventReference: string
  eventImage: string
  createdBy: string
  location: string
  status: string
  eventName: string
  startTime: string
  eventDate: string
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
      // events.value = response.data
      events.value = eventsData
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
    return event.location === selectedCity.value;
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
.main-container {
  display: flex;
  flex-direction: column;
  /* height: 100vh; */
}

.header-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 10;
}

.loader {
  position: absolute;
  bottom: 50%;
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

.event-card {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.cities-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cities {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  white-space: nowrap;
}

.city-button {
  padding: 7px 18px;
  background-color: #FBFBFB;
  border: 1px solid #797979;
  border-radius: 22px;
  cursor: pointer;
  color: #797979;
}

.city-button.active {
  background-color: #1E1E1E;
  color: white;
  border-color: #1E1E1E;
}

.arrow {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0 10px;
}

.no-events-message {
  font-size: 1.2rem;
  color: #ff0000;
  margin: 20px;
}

@media (max-width: 765px) {
  .content-container {
    padding-top: 20px;
    padding-left: 10px;
    padding-right: 10px;
  }

  .event-card {
    flex-direction: column;
    align-items: center;
  }

  .city-button {
    padding: 8px 10px;
    font-size: 0.875rem;
  }

  .arrow {
    padding: 0 5px;
  }
}

@media (min-width: 766px) {
  .cities-container {
    margin-left: auto;
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
