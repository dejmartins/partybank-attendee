<template>
  <div class="mt-4">
    <p class="text-lg font-semibold">Get tickets</p>
    
    <div v-if="event && hasPerks">
      <h3 class="text-md font-semibold">Ticket Perks:</h3>
      <ul>
        <li v-for="ticket in event.tickets" :key="ticket.name">
          <div v-if="ticket?.ticket_perks?.length > 0">
            <h4 class="text-sm font-bold">{{ ticket.name }}</h4>
            <ul class="ml-4">
              <li v-for="perk in ticket.ticket_perks" :key="perk" class="text-xs list-disc">
                {{ perk }}
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>

    <p class="text-sm font-bold mt-4">Which ticket type are you going for?</p>

    <div v-if="event?.tickets && event.tickets.length > 0" class="ticket mt-2">
      <ul>
        <li
          v-for="ticket in event?.tickets"
          :key="ticket.name"
          class="ticket-item"
          :class="{ selected: selectedTicket === ticket.name }"
        >
          <button
            class="border flex flex-col border-gray-300 w-full p-2 mb-2 rounded-md hover:border-gray-500"
            @click="selectTicket(ticket.name)"
            :disabled="!isTicketAvailable(ticket)"
          >
            <div class="flex justify-between w-full">
              <span class="font-medium">{{ ticket.name }}</span>
              <div v-if="ticket.name !== 'FREE'" class="flex items-center">
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

    <GetTicket 
      action="Get Ticket" 
      :disabled="false"
      @click="togglePaymentPopup"
      additional-classes="bg-[var(--pb-c-blue)] text-white w-full py-2 mt-4 rounded-md"
    />

    <SignInModal
      v-if="showSignInModal"
      @close="toggleSignInModal"
      @email-sent="emailModalToggle"
    />

    <EmailSentModal v-if="showEmailSentModal" @close="emailModalToggle" />
  </div>
</template>

  
<script setup lang="ts">
import { ref, computed } from 'vue';
import { type Event, type Ticket } from '@/utils/types';
import { onMounted } from 'vue';
import GetTicket from '@/components/buttons/ButtonComponent.vue';
import { usePaymentStore } from '@/stores/payment';
import { useAuthStore } from '@/stores/auth';
import Api from '@/utils/api';
import SignInModal from '@/components/auth/SignIn.vue';
import EmailSentModal from '@/components/auth/CheckEmailModal.vue';

const { RESERVE_TICKET } = Api();
const authStore = useAuthStore();

// Props
const { event } = defineProps<{
    event: Event | null;
}>();

const selectedTicket = ref<string>('');
const ticketQuantities = ref<{ [key: string]: number }>({});
const showSignInModal = ref(false);
const showEmailSentModal = ref(false);
const paymentStore = usePaymentStore();

const hasPerks = computed(() => {
  return event?.tickets.some(ticket => ticket.ticket_perks && ticket.ticket_perks.length > 0);
});

const isTicketAvailable = (ticket: Ticket) => {
  const currentDate = new Date();

  const saleStartDate = new Date(`${ticket.ticket_sale_start_date}T${ticket.ticket_sale_start_time}`);
  const saleEndDate = new Date(`${ticket.ticket_sale_end_date}T${ticket.ticket_sales_end_time}`);

  return currentDate >= saleStartDate && currentDate <= saleEndDate;
};

const toggleSignInModal = () => {
  showSignInModal.value = !showSignInModal.value;
};

const emailModalToggle = () => {
  showEmailSentModal.value = !showEmailSentModal.value;
};

const selectTicket = (ticketName: string) => {
  if (selectedTicket.value === ticketName) {
    selectedTicket.value = '';
  } else {
    selectedTicket.value = ticketName;
    ticketQuantities.value[ticketName] = 1;
  }
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
  if (event?.tickets && event.tickets.length > 0) {
    const currentDate = new Date();

    const availableTickets = event.tickets.filter((ticket) => {
      const startDate = new Date(ticket.ticket_sale_start_date);
      const endDate = new Date(ticket.ticket_sale_end_date);
      
      return currentDate >= startDate && currentDate <= endDate;
    });

    if (availableTickets.length > 0) {
      const firstTicket = availableTickets[0];
      selectedTicket.value = firstTicket.name;
      ticketQuantities.value[firstTicket.name] = 1;
    } else {
      console.log('No tickets available for selection.');
    }
  }
};


const reserveTicket = async () => {
  await fetch(RESERVE_TICKET, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: authStore.decodedEmail,
        numberOfTickets: ticketQuantities.value[selectedTicket.value],
        ticketType: selectedTicket.value,
        eventReference: event?.event_reference
      }),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log({
        email: authStore.decodedEmail,
        numberOfTickets: ticketQuantities.value[selectedTicket.value],
        ticketType: selectedTicket.value,
        eventReference: event?.event_reference
      }, 'payload')
      console.log(response)
    })
}

onMounted(() => {
  selectTicketByDefault();
});

const togglePaymentPopup = () => {
  if (authStore.isAuthenticated && authStore.checkTokenValidity(authStore.token)) {
    reserveTicket();
  
    updateTicketInfo();
    paymentStore.openPaymentPopup();
  } else {
    toggleSignInModal();
  }
};

const updateTicketInfo = () => {
  paymentStore.updateTicketInfo(selectedTicket.value, ticketQuantities.value);
};
</script>
  
<style scoped>
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

.ticket-item button.disabled {
  background-color: #d3d3d3;
  cursor: not-allowed;
  border-color: #d3d3d3;
}

.ticket-item button:disabled {
  background-color: #f0f0f0;
  border-color: #d3d3d3;
  color: #a9a9a9;
  cursor: not-allowed;
}

.ticket-item button:disabled:hover {
  background-color: #d3d3d3;
}
</style>
