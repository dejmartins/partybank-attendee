import { defineStore } from 'pinia';

export const useEventStore = defineStore('event', {
  state: () => ({
    eventImage: '',
    eventName: 'Rave',
    ticketQuantity: 0,
    ticketType: 'Early Bird',
    ticketAmount: 10000,
  }),

  actions: {
    setTicketDetails(details: { eventImage: string; eventName: string; ticketQuantity: number; ticketType: string; ticketAmount: number }) {
      this.eventImage = details.eventImage;
      this.eventName = details.eventName;
      this.ticketQuantity = details.ticketQuantity;
      this.ticketType = details.ticketType;
      this.ticketAmount = details.ticketAmount;
    },

    resetTicketDetails() {
      this.eventImage = '';
      this.eventName = '';
      this.ticketQuantity = 0;
      this.ticketType = '';
      this.ticketAmount = 0;
    }
  }
});
