<template>
  <div class="main-container px-8">
    <div class="py-5">
      <router-link to="/discover">
        <fa-icon :icon="['fas', 'arrow-left']" style="color: #000000" />
      </router-link>
    </div>

    <img v-if="isLoading" src="@/assets/images/bottles.gif" class="loader h-32" alt="Bottles Gif" />

    <div v-if="!isLoading" class="flex justify-center">
      <div class="event-container flex flex-col mb-10">
        <div class="event-detail flex flex-col">
          <div class="event-image-container">
            <div
              class="event-image w-full"
              :style="{
                backgroundImage:
                  'url(' + (event?.eventImage || '@/assets/images/defaultImage.jpeg') + ')'
              }"
            ></div>
          </div>

          <div class="event-info mt-5">
            <p class="font-light">Hosted By</p>
            <hr class="image-hr" />
            <p class="font-semibold">{{ event?.createdBy }}</p>
            <a href="#" class="text-gray-400 text-sm font-bold block">Contact the Host</a>
          </div>
        </div>

        <div class="event-details flex-1">
          <p class="text-2xl md:text-3xl lg:text-4xl font-bold">{{ event?.eventName }}</p>

          <div>
            <div class="text-gray-500 mt-3 leading-7">
              <a
                href="https://maps.app.goo.gl/3fRgCyAeWZ6TxqWJ8"
                target="_blank"
                class="location flex items-center"
              >
                <fa-icon class="pr-2" :icon="['fas', 'location-dot']" style="color: #b0b0b0" />
                {{ event?.location }}
              </a>

              <p>
                <fa-icon class="mr-1" :icon="['far', 'calendar-days']" style="color: #b0b0b0" />
                {{ event?.eventDate }}
              </p>

              <p>
                <fa-icon class="mr-1" :icon="['far', 'clock']" style="color: #b0b0b0" />
                {{ event?.timeFrame }}
              </p>
            </div>

            <div class="mt-4">
              <p class="text-lg font-semibold">Get tickets</p>
              <p class="text-sm font-bold">Which ticket type are you going for?</p>
              <div v-if="event?.ticketTypes && event.ticketTypes.length > 0" class="ticket mt-2">
                <ul>
                  <li
                    v-for="ticket in event.ticketTypes"
                    :key="ticket.name"
                    class="ticket-item"
                    :class="{ selected: selectedTicket === ticket.name }"
                  >
                    <button
                      class="border flex flex-col border-gray-300 w-full p-2 mb-2 rounded-md hover:border-gray-500"
                      @click="selectTicket(ticket.name)"
                    >
                      <div class="flex justify-between w-full">
                        <span>{{ ticket.name }}</span>
                        <div class="flex items-center">
                          <button
                            @click.stop="decrementTicket(ticket.name)"
                            class="border border-gray-300 mx-1 w-6 h-6 flex justify-center items-center rounded hover:border-gray-500 hover:bg-gray-200"
                          >
                            -
                          </button>
                          <span class="mx-2">{{ ticketQuantities[ticket.name] || 0 }}</span>
                          <button
                            @click.stop="incrementTicket(ticket.name)"
                            class="border border-gray-300 mx-1 w-6 h-6 flex justify-center items-center rounded hover:border-gray-500 hover:bg-gray-200"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <span class="mt-2 text-right"><fa-icon :icon="['fas', 'naira-sign']" style="color: #000000" />{{ ticket.price }}</span>
                    </button>
                  </li>
                </ul>
              </div>
              <button
                @click="togglePaymentPopup"
                class="bg-[var(--pb-c-blue)] text-white w-full py-2 mt-4 rounded-md"
              >
                Get Ticket
              </button>
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.419913439578!2d6.686333875217679!3d6.208214126746435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1043f39e1f3a543b%3A0xab2e21c8c5d16ecb!2sCloud%20Vista!5e0!3m2!1sen!2sng!4v1718474615966!5m2!1sen!2sng"
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
  </div>

  <transition name="modal-fade">
    <Modal v-if="isPayTime">
      <div class="flex justify-end mb-6">
        <fa-icon
          @click="togglePaymentPopup"
          class="cursor-pointer"
          :icon="['fas', 'xmark']"
          style="color: #ffffff"
          size="xl"
        />
      </div>

      <div
        class="flex flex-col-reverse md:flex-row md:justify-center text-white justify-center md:justify-start"
      >
        <div class="mt-8 md:mt-0 md:mr-8">
          <p class="text-lg md:text-xl font-bold mb-4">Your Info</p>
          <Info @proceed="pay" />
        </div>
        <div>
          <p class="text-lg md:text-xl font-bold mb-4">Ticket Summary</p>
          <Summary
            :eventImage="event?.eventImage || ''"
            :eventName="event?.eventName || ''"
            :ticketQuantity="ticketQuantities[selectedTicket] || 0"
            :ticketType="selectedTicket || ''"
            :ticketAmount="
              selectedTicket
                ? event?.ticketTypes.find((t) => t.name === selectedTicket)?.price || 0
                : 0
            "
          />
        </div>
      </div>
    </Modal>
  </transition>
</template>

<script setup lang="ts">
import Modal from '@/components/modals/PaymentModal.vue'
import { ref, onMounted } from 'vue'
import Info from '@/components/main/AttendeeInfo.vue'
import Summary from '@/components/main/TicketSummary.vue'
import { useRoute } from 'vue-router'
import Api from '@/utils/api'
import { useToast } from 'vue-toastification'

type UserInfo = {
  emailAddress: string
  phoneNumber: string
  location: string
}

type Ticket = {
  name: string
  price: number
}

type Event = {
  eventImage: string
  createdBy: string
  eventName: string
  location: string
  eventDate: string
  timeFrame: string
  ticketTypes: Array<Ticket>
  about: string
}

const route = useRoute()
const toast = useToast()
const { GET_EVENT, PAY } = Api()

const event = ref<Event | null>(null)
const isPayTime = ref(false)
const isLoading = ref(true)
const selectedTicket = ref<string>('')
const ticketQuantities = ref<{ [key: string]: number }>({})

const eventReference = route.params.eventReference

const selectTicket = (ticketName: string) => {
  if (selectedTicket.value === ticketName) {
    // selectedTicket.value = ''
    // ticketQuantities.value[ticketName] = 0
  } else {
    selectedTicket.value = ticketName
    ticketQuantities.value[ticketName] = 1
  }
}

const incrementTicket = (ticketName: string) => {
  if (!ticketQuantities.value[ticketName]) {
    ticketQuantities.value[ticketName] = 1
  } else {
    ticketQuantities.value[ticketName] += 1
  }
}

const decrementTicket = (ticketName: string) => {
  if (ticketQuantities.value[ticketName] && ticketQuantities.value[ticketName] > 1) {
    ticketQuantities.value[ticketName] -= 1
  }
}

const togglePaymentPopup = () => {
  isPayTime.value = !isPayTime.value
}

const getEvents = async () => {
  isLoading.value = true

  await fetch(`${GET_EVENT}/${eventReference}`, {
    method: 'GET'
  })
    .then((res) => res.json())
    .then((response) => {
      event.value = response.data
      console.log(response.data)
      isLoading.value = false
    })
    .catch((error: any) => {
      toast.error('Error fetching event details')
      console.log(error)
      isLoading.value = false
    })
}

const selectTicketByDefault = () => {
  if (event.value?.ticketTypes && event.value.ticketTypes.length > 0) {
    const firstTicket = event.value.ticketTypes[0]
    selectedTicket.value = firstTicket.name
    ticketQuantities.value[firstTicket.name] = 1
  }
}

const pay = async (value: UserInfo) => {
  const payload = {
    email: value.emailAddress,
    phoneNumber: value.phoneNumber,
    city: value.location,
    numberOfTickets: ticketQuantities.value[selectedTicket.value],
    discountRecorded: false,
    discountRecordReference: false,
    discounted: false,
    ticketType: selectedTicket.value,
    eventReference: eventReference
  }

  try {
    const response = await fetch(`${PAY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    } else {
      // @ts-ignore
      response.json().then((res) => {
        window.location.href = res.data.url
        togglePaymentPopup();
      })
    }
  } catch (error) {
    toast.error('Payment Unsuccessful')
    console.error('Payment failed', error)
    togglePaymentPopup()
  } finally {
    // isDisabled.value = false
    // emit('close')
  }
}

onMounted(async () => {
  await getEvents()
  selectTicketByDefault()
})
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
  background-image: url('@/assets/images/defaultImage.jpeg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 15px;
  width: 100%;
  height: 350px;
}

.image-hr {
  width: 100%;
  margin-bottom: 10px;
}

.ticket ul {
  list-style-type: none;
  padding: 0;
}

.ticket-item {
  margin-bottom: 10px;
}

.ticket-item button {
  text-align: left;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.2s;
}

.ticket-item button:hover {
  background-color: #f0f0f0;
}

.ticket-item.selected button {
  border-color: var(--pb-c-blue);
  background-color: #e0f7ff;
}

.ticket-item.selected button:hover {
  background-color: #cceeff;
}

.ticket-item button .hover-border {
  border-color: var(--pb-c-blue);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.loader {
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
    height: 400px;
  }
}
</style>
