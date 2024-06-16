<template>
  <div class="main-container">
    <div class="px-8 font-bold text-xl my-3">
      <p class="font-bold">Discover Events</p>
      <img
        v-if="isLoading"
        src="@/assets/images/explore-loader.gif"
        class="loader h-32"
        alt="Explore Gif Loader"
      />

      <div class="content-container">
        <div class="event-card">
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

        <div v-if="!isLoading" class="location h-44 w-44 text-sm px-4">
          <img src="@/assets/images/asaba.gif" class="h-16" alt="Flower Gif" />
          <p class="font-bold text-[20px] leading-8">Asaba</p>
          <p>
            Discover the hottest events in Asaba, and get notified of new events before they sell
            out.
          </p>

          <Button @click="handleSubscribe" action="Subscribe" class="w-full mt-3" />
        </div>

        <transition name="modal-fade">
          <Subscribe @close="handleSubscribe" v-if="isSubscribe" location="Asaba" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EventCard from '@/components/main/EventCard.vue'
import Button from '@/components/buttons/PlainSubscribe.vue'
import Subscribe from '@/components/modals/SubscribeModal.vue'
import { ref, onMounted, computed } from 'vue'
import Api from '@/utils/api'
import { useToast } from 'vue-toastification'
import moment from 'moment'

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
const isSubscribe = ref(false)
const events = ref<Array<Event>>([])
const { GET_ALL_EVENTS } = Api()

// Methods
const handleSubscribe = () => {
  isSubscribe.value = !isSubscribe.value
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

const filteredEvents = computed(() => {
  return events.value.filter((event) => {
    return moment(event.eventDate, 'DD MMM, YYYY').isSameOrAfter(moment().subtract(1, 'day'), 'day')
  })
})

onMounted(() => {
  getEvents()
})
</script>

<style scoped>
.loader {
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.content-container {
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: center;
}

.event-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 20px;
}

@media (max-width: 765px) {
  .content-container {
    flex-direction: column-reverse;
  }

  .logo {
    height: 3rem;
  }

  .location {
    width: 100%;
    margin-bottom: 30px;
  }

  .event-card {
    width: 100%;
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
