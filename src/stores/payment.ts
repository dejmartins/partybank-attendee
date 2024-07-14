import { defineStore } from 'pinia'

export const usePaymentStore = defineStore('payment', {
    state: () => ({
        selectedTicket: '',
        ticketQuantities: {},
        isPaymentPopup: false
    }),
    actions: {
        updateTicketInfo(selectedTicket: string, ticketQuantities: { [key: string]: number }){
            this.selectedTicket = selectedTicket;
            this.ticketQuantities = ticketQuantities;
        },

        openPaymentPopup(){
            this.isPaymentPopup = true
        },

        resetTicketInfo(){
            this.selectedTicket = ''
            this.ticketQuantities = {},
            this.isPaymentPopup = false
        }
    }
})