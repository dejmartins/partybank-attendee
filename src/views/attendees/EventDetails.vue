<template>
  <div class="main-container px-8">
    <div class="py-5">
      <router-link to="/discover">
        <div class="flex items-center">
          <fa-icon :icon="['fas', 'arrow-left']" style="color: #000000" class="mr-3" />
          <p>Back</p>
        </div>
      </router-link>
    </div>

    <img v-if="isLoading" src="@/assets/images/bottles.gif" class="loader h-32" alt="Bottles Gif" />

    <div>
      <EventInfo v-if="!isLoading" :event="event" />
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

  <TicketSent @close="ticketSentModal" v-if="isTicketSent":eventImage="event?.eventImage" :eventName="event?.eventName" :attendeeEmail="emailAddress" />
</template>

<script setup lang="ts">
import Modal from '@/components/modals/PaymentModal.vue'
import { ref, onMounted } from 'vue'
import Info from '@/components/main/AttendeeInfo.vue'
import Summary from '@/components/main/TicketSummary.vue'
import { useRoute } from 'vue-router'
import Api from '@/utils/api'
import { useToast } from 'vue-toastification'
import TicketSent from '@/components/modals/TicketSent.vue'
import { type Event, type UserInfo } from '@/utils/types'
import EventInfo from '@/components/layouts/EventInfo.vue'
import { watch } from 'vue'
import { usePaymentStore } from '@/stores/payment'

const route = useRoute()
const toast = useToast()
const { GET_EVENT, PAY } = Api()

const event = ref<Event | null>(null)
const isPayTime = ref(false)
const isLoading = ref(true)
const isTicketSent = ref(false)
const emailAddress = ref('')
const selectedTicket = ref<string>('')
const ticketQuantities = ref<{ [key: string]: number }>({})

const eventReference = route.params.eventReference
const paymentStore = usePaymentStore();

const togglePaymentPopup = () => {
  isPayTime.value = !isPayTime.value
}

watch(() => paymentStore.isPaymentPopup, (newValue, oldValue) => {
  if(newValue) {
    selectedTicket.value = paymentStore.selectedTicket
    ticketQuantities.value = paymentStore.ticketQuantities
    
    togglePaymentPopup();
    paymentStore.resetTicketInfo();
  }
})

const ticketSentModal = () => {
  isTicketSent.value = !isTicketSent.value
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
    emailValidated: value.emailValidated,
    termsAndConditionsAccepted: value.termsAndConditionsAccepted,
    numberOfTickets: ticketQuantities.value[selectedTicket.value],
    discountRecorded: false,
    discountRecordReference: false,
    discounted: false,
    ticketType: selectedTicket.value,
    eventReference: eventReference
  }

  console.log(payload);

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
        if(res.data.url){
          window.location.href = res.data.url
        } else {
          emailAddress.value = value.emailAddress;
          isTicketSent.value = true;
        }
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
</style>