import { defineStore } from 'pinia';

export const useEventStore = defineStore('event', {
  state: () => ({
    eventReference: '',
    eventImage: '',
    eventName: '',
    ticketQuantity: 0,
    ticketType: '',
    ticketAmount: 0,
    ticketPerks: [] as Array<string>,
    ticketReference: ''
  }),

  actions: {
    setTicketDetails(details: { eventImage: string; ticketReference: string; eventName: string; ticketQuantity: number; ticketType: string; ticketAmount: number, eventReference: string, ticketPerks: Array<string> }) {
      this.eventImage = details.eventImage;
      this.eventName = details.eventName;
      this.ticketQuantity = details.ticketQuantity;
      this.ticketType = details.ticketType;
      this.ticketAmount = details.ticketAmount;
      this.eventReference = details.eventReference;
      this.ticketPerks = details.ticketPerks;
      this.ticketReference = details.ticketReference;
    },

    resetTicketDetails() {
      this.eventImage = '';
      this.eventName = '';
      this.ticketQuantity = 0;
      this.ticketType = '';
      this.ticketAmount = 0;
      this.eventReference = '';
    }
  },

  persist: {
    storage: sessionStorage,
  }
});
