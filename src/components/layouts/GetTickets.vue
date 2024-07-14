<template>
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
    </div>
  </template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { type Event } from '@/utils/types';
import { onMounted } from 'vue';
import GetTicket from '@/components/buttons/ButtonComponent.vue'
import { usePaymentStore } from '@/stores/payment';

const { event } = defineProps<{
    event: Event | null
}>()

const selectedTicket = ref<string>('');
const ticketQuantities = ref<{ [key: string]: number }>({});
const paymentStore = usePaymentStore();

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
  if (event?.ticketTypes && event.ticketTypes.length > 0) {
    const firstTicket = event.ticketTypes[0]
    selectedTicket.value = firstTicket.name
    ticketQuantities.value[firstTicket.name] = 1
  }
}

onMounted(() => {
    selectTicketByDefault()
})
  
const togglePaymentPopup = () => {
    updateTicketInfo()
    paymentStore.openPaymentPopup();
};

const updateTicketInfo = () => {
  paymentStore.updateTicketInfo(selectedTicket.value, ticketQuantities.value)
}
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

.ticket-item button .hover-border {
border-color: var(--pb-c-blue);
}
</style>
  