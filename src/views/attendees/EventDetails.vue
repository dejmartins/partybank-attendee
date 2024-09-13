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

      <div class="flex flex-col-reverse md:flex-row md:justify-center text-white justify-center md:justify-start">
        <div class="mt-8 md:mt-0 md:mr-8">
          <p class="text-lg md:text-xl font-bold mb-4">Your Info</p>
          <Info @proceed="checkAuthAndProceed" />
        </div>
        <div>
          <p class="text-lg md:text-xl font-bold mb-4">Ticket Summary</p>
          <Summary
            :eventImage="event?.image_url || ''"
            :eventName="event?.event_name || ''"
            :ticketQuantity="ticketQuantities[selectedTicket] || 0"
            :ticketType="selectedTicket || ''"
            :ticketAmount="
              selectedTicket
                ? event?.tickets.find((t) => t.name === selectedTicket)?.price || 0
                : 0
            "
          />
        </div>
      </div>
    </Modal>
  </transition>

  <SignInModal
    v-if="showSignInModal"
    @close="toggleSignInModal"
    @email-sent="emailModalToggle"
  />

  <EmailSentModal v-if="showEmailSentModal" @close="emailModalToggle" />

  <TicketSent
    @close="ticketSentModal"
    v-if="isTicketSent"
    :eventImage="event?.image_url"
    :eventName="event?.event_name"
    :attendeeEmail="emailAddress"
  />
</template>

<script setup lang="ts">
import Modal from '@/components/modals/PaymentModal.vue';
import { ref, onMounted } from 'vue';
import Info from '@/components/events/tickets/AttendeeInfo.vue';
import Summary from '@/components/events/tickets/TicketSummary.vue';
import { useRoute } from 'vue-router';
import Api from '@/utils/api';
import { useToast } from 'vue-toastification';
import TicketSent from '@/components/modals/TicketSent.vue';
import { type Event, type UserInfo } from '@/utils/types';
import EventInfo from '@/components/events/EventInfo.vue';
import { watch } from 'vue';
import { usePaymentStore } from '@/stores/payment';
import { useAuthStore } from '@/stores/auth';
import SignInModal from '@/components/auth/SignIn.vue';
import EmailSentModal from '@/components/auth/EmailCheck.vue';

const route = useRoute();
const toast = useToast();
const { PAY, GET_EVENT_BY_REFERENCE } = Api();

const event = ref<Event | null>(null);
const isPayTime = ref(false);
const isLoading = ref(true);
const isTicketSent = ref(false);
const emailAddress = ref('');
const selectedTicket = ref<string>('');
const ticketQuantities = ref<{ [key: string]: number }>({});
const showSignInModal = ref(false);
const showEmailSentModal = ref(false);

const eventReference = route.params.eventReference;
const paymentStore = usePaymentStore();
const authStore = useAuthStore();

// Methods
const togglePaymentPopup = () => {
  isPayTime.value = !isPayTime.value;
};

const toggleSignInModal = () => {
  showSignInModal.value = !showSignInModal.value;
  isPayTime.value = false;
};

const emailModalToggle = () => {
  showEmailSentModal.value = !showEmailSentModal.value;
};

watch(
  () => paymentStore.isPaymentPopup,
  (newValue) => {
    if (newValue) {
      selectedTicket.value = paymentStore.selectedTicket;
      ticketQuantities.value = paymentStore.ticketQuantities;
      togglePaymentPopup();
      paymentStore.resetTicketInfo();
    }
  }
);

const ticketSentModal = () => {
  isTicketSent.value = !isTicketSent.value;
};

const getEvents = async () => {
  isLoading.value = true;

  await fetch(`${GET_EVENT_BY_REFERENCE}/${eventReference}`, {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((response) => {
      event.value = response;
      isLoading.value = false;
    })
    .catch((error: any) => {
      toast.error('Error fetching event details');
      isLoading.value = false;
    });
};

const checkAuthAndProceed = (value: UserInfo) => {
  if (authStore.isAuthenticated && authStore.checkTokenValidity(authStore.token)) {
    pay(value);
  } else {
    toggleSignInModal();
  }
};

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
    eventReference: eventReference,
  };

  try {
    const response = await fetch(`${PAY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      response.json().then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        } else {
          emailAddress.value = value.emailAddress;
          isTicketSent.value = true;
        }
        togglePaymentPopup();
      });
    }
  } catch (error) {
    toast.error('Payment Unsuccessful');
    togglePaymentPopup();
  }
};

onMounted(async () => {
  await getEvents();
});
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
