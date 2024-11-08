<template>
  <div class="mt-4 border-b-[1px] pb-3">
    <p class="text-[20px] md:text-[24px] font-[700]">Get Tickets</p>

    <p class="text-[16px] font-[200]">Which ticket type are you going for?</p>

    <div v-if="event?.tickets && event.tickets.length > 0" class="ticket-grid mt-4 bg-[#FFFFFF] p-3 rounded-[25px]">
      <div 
        v-for="ticket in processedTickets"
        :key="ticket.name"
        class="ticket-item"
        :class="{ selected: selectedTicket === ticket.name }"
      >
        <button
          class="border flex flex-col border-gray-300 w-full p-4 rounded-[20px] hover:border-gray-500"
          @click="selectTicket(ticket.name)"
          :disabled="!ticket.isAvailable"
        >
          <div class="flex justify-between w-full">
            <div class="leading-4 flex flex-col gap-2">
              <p :class="['font-[600] text-[18px]', selectedTicket === ticket.name ? 'text-[var(--pb-c-red)]' : '']">
                {{ ticket.name[0].toUpperCase() + ticket.name.slice(1) }}
              </p>
              <p class="font-[300] text-[16px]"  v-if="ticket.price || ticket.ticket_type !== 'Free'">
                <span class="text-[12px]">NGN</span> {{ formatAmountWithCommas(ticket.price) }}
                <span v-if="ticket.category == 'Group'"> | </span><span class="text-[12px]" v-if="ticket.category == 'Group'">GROUP - <span>{{ ticket.group_ticket_capacity }}</span></span>
              </p>
              <p class="font-[300] text-[16px]" v-if="!ticket.price && ticket.ticket_type == 'Free'">
                <span class="text-[12px]">NO FEE</span> 
                <span v-if="ticket.category == 'Group'"> | </span><span class="text-[12px]" v-if="ticket.category == 'Group'">GROUP - <span>{{ ticket.group_ticket_capacity }}</span></span>
              </p>
              <p class="font-[300] text-[16px]"></p>
            </div>

            <div v-if="ticket.ticket_type !== 'Free' && ticket.category !== 'Group'" class="ticket-qty flex items-center bg-[#FFFFFF] rounded-[20px] px-[3px]" :class="selectedTicket === ticket.name ? 'flex' : 'hidden'">
              <button
                @click.stop="decrementTicket(ticket.name)"
                class="w-8 h-8 flex items-center justify-center rounded-full"
              >
                <MinusCircleIcon class="size-6" />
              </button>
              <span class="mx-2 text-[var(--pb-c-red)]">{{ ticketQuantities[ticket.name] || 0 }}</span>
              <button
                @click.stop="incrementTicket(ticket.name)"
                class="w-8 h-8 flex items-center justify-center rounded-full"
              >
                <PlusCircleIcon class="size-6" />
              </button>
            </div>
          </div>
        </button>
      </div>
    </div>

    <GetTicket 
      action="Get Ticket" 
      :disabled="isReserving"
      :loading="isReserving"
      @click="proceedToPay"
      text-style="text-[18px] font-[700] text-[var(--pb-c-white)]"
      additional-classes="bg-[var(--pb-c-red)] border-[var(--pb-c-red)] w-full px-5 py-3 mt-3"
      additional-loader-classes="border-4 border-t-[var(--pb-c-red)]"
    />

    <SignInModal v-if="showSignInModal" @close="toggleSignInModal" @email-sent="emailModalToggle" />
    <EmailSentModal v-if="showEmailSentModal" @close="emailModalToggle" />

    <p v-if="reserveError" class="text-red-600 mt-4">{{ reserveError }}</p>
  </div>
</template>

<script setup lang="ts">
import GetTicket from '@/components/buttons/LoaderButton.vue';
import SignInModal from '@/views/auth/SignInModal.vue';
import EmailSentModal from '@/components/auth/CheckEmailModal.vue';
import Api from '@/utils/api';
import { onMounted, ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { usePaymentStore } from '@/stores/payment';
import { useEventStore } from '@/stores/event';
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/vue/24/outline';
import { formatAmountWithCommas } from '@/utils/actions';
import { useRouter } from 'vue-router';
import type { Event, Ticket } from '@/utils/types';

const { RESERVE_TICKET } = Api();
const authStore = useAuthStore();
const paymentStore = usePaymentStore();
const eventStore = useEventStore();
const router = useRouter();

const { event } = defineProps<{
  event: Event | null;
}>();

const selectedTicket = ref<string>('');
const ticketQuantities = ref<{ [key: string]: number }>({});
const showSignInModal = ref(false);
const showEmailSentModal = ref(false);
const isReserving = ref(false); 
const reserveError = ref('');


const toggleSignInModal = () => {
  showSignInModal.value = !showSignInModal.value;
};

const emailModalToggle = () => {
  showEmailSentModal.value = !showEmailSentModal.value;
};

const selectTicket = (ticketName: string) => {
  // if (selectedTicket.value === ticketName) {
  //   selectedTicket.value = '';
  // } else {
    selectedTicket.value = ticketName;
    ticketQuantities.value[ticketName] = 1;
  // }
};

const incrementTicket = (ticketName: string) => {
  const currentQuantity = ticketQuantities.value[ticketName] || 0;
  if (currentQuantity < 5) {
    ticketQuantities.value[ticketName] = currentQuantity + 1;
  }
};

const decrementTicket = (ticketName: string) => {
  if (ticketQuantities.value[ticketName] && ticketQuantities.value[ticketName] > 1) {
    ticketQuantities.value[ticketName] -= 1;
  }
};

const selectTicketByDefault = () => {
  if (!event?.tickets || event.tickets.length === 0) {
    console.log('No tickets available.');
    return;
  }

  const firstAvailableTicket = processedTickets.value?.find(ticket => ticket.isAvailable);

  if (firstAvailableTicket) {
    selectedTicket.value = firstAvailableTicket.name;
    ticketQuantities.value[firstAvailableTicket.name] = 1;
  } else {
    console.log('No tickets available for selection.');
  }
};

const processedTickets = computed(() => {
  const currentDate = new Date();

  return event?.tickets
    .map((ticket) => {
      const startDateTime = new Date(`${reformatDate(ticket.ticket_sale_start_date)}T${convertTimeTo24HourFormat(ticket.ticket_sale_start_time)}`);
      const endDateTime = new Date(`${reformatDate(ticket.ticket_sale_end_date)}T${convertTimeTo24HourFormat(ticket.ticket_sales_end_time)}`);

      const isAvailable = currentDate >= startDateTime && currentDate <= endDateTime;
      return { ...ticket, isAvailable };
    })
    .sort((a, b) => (a.isAvailable === b.isAvailable ? 0 : a.isAvailable ? -1 : 1));
});


const reformatDate = (dateStr: string): string => {
  const [day, month, year] = dateStr.split('-');
  return `${year}-${month}-${day}`;
};

const convertTimeTo24HourFormat = (timeStr: string): string => {
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':');
  
  if (hours === '12') {
    hours = '00';
  }
  if (modifier === 'PM') {
    hours = (parseInt(hours, 10) + 12).toString();
  }

  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
};


const proceedToPay = async () => {
  // if (authStore.isAuthenticated && authStore.checkTokenValidity(authStore.token)) {
    // const success = await reserveTicket(); 

    if (true) {
      const currentPage = router.currentRoute.value.fullPath;
      localStorage.setItem('previousPage', currentPage);

      const selectedTicketData = event?.tickets.find(ticket => ticket.name === selectedTicket.value);
      if (!selectedTicketData) {
        console.error('No selected ticket data found');
        return;
      }

      eventStore.setTicketDetails({
        eventImage: event?.image_url || '/defaultImage.png',
        eventName: event?.event_name || 'Unknown Event',
        ticketQuantity: ticketQuantities.value[selectedTicket.value],
        ticketType: selectedTicketData.name[0] + selectedTicketData.name.slice(1),
        ticketAmount: selectedTicketData.price,
        eventReference: event?.event_reference || '',
        ticketPerks: selectedTicketData.ticket_perks
      });

      router.push('/purchase');
      paymentStore.openPaymentPopup();
    } else {
      console.log(reserveError.value);
    }
  // } else {
  //   toggleSignInModal();
  // }
  
    // router.push('/purchase');
};

onMounted(() => {
  selectTicketByDefault();
});
</script>


<style scoped>
.ticket-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
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
  border-color: var(--pb-c-red);
  background-color: #FFF2F4;
}

.ticket-item.selected button:hover {
  background-color: #f7e6e6;
}

.ticket-item button:disabled {
  color: gray;
  background-color: #F3F4F4;
  border: none;
  cursor: not-allowed;
}

.ticket-item.selected .ticket-qty button {
  background-color: #F7F4F4;
}

@media (min-width: 768px) {
  .ticket-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
