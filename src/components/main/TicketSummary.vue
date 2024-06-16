<template>
    <div class="ticket-summary-container">
      <div class="event-details">
        <div class="event-image" :style="{ backgroundImage: `url(${eventImage})` }"></div>
        <div class="event-info">
          <p class="event-name">{{ eventName }}</p>
          <p class="event-date">{{ currentDate }}</p>
        </div>
      </div>
  
      <div class="tickets-section">
        <p class="section-title">Tickets</p>
        <div class="ticket-item">
          <p>{{ ticketQuantity }}x {{ ticketType }}</p>
          <p><fa-icon :icon="['fas', 'naira-sign']" style="color: #000000" />{{ ticketAmount }}</p>
        </div>
      </div>
  
      <div class="summary-section">
        <!-- <p class="section-title">Summary</p> -->
        <div class="flex justify-between items-center w-full px-[10px]">
          <p class="text-gray-500">Subtotal:</p>
          <p class="text-gray-500">
            <fa-icon :icon="['fas', 'naira-sign']" style="color: gray" />{{ subtotal }}
          </p>
        </div>
  
        <!-- <button @click="toggleDiscountInput" class="discount-button mt-2 font-bold">
          Add Discount
        </button>
        <div v-if="showDiscountInput" class="discount-input my-[10px]">
          <input type="text" v-model="discountCode" placeholder="Enter discount code" />
          <button @click="applyDiscount" class="apply-button">Apply</button>
        </div> -->
  
        <div class="flex w-full justify-between mt-4">
          <p class="text-black mx-[10px]">Total</p>
          <p class="text-black mx-[10px] font-bold text-[20px]">
            <fa-icon :icon="['fas', 'naira-sign']" style="color: #000000" />{{ total }}
          </p>
        </div>
      </div>
    </div>
    <!-- <button class="cta-button w-full" @click="proceedToPayment">Proceed to Payment</button> -->
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue'
  import moment from 'moment'
  
  // Props
  const props = defineProps({
    eventImage: String,
    eventName: String,
    ticketQuantity: Number,
    ticketType: String,
    ticketAmount: Number
  })
  
  const currentDate = ref(moment().format('MMMM Do, YYYY'))
  
  // @ts-ignore
  const subtotal = ref(props.ticketQuantity * props.ticketAmount)
  const discountCode = ref('')
  const showDiscountInput = ref(false)
  
  const toggleDiscountInput = () => {
    showDiscountInput.value = !showDiscountInput.value
  }
  
  const applyDiscount = () => {
    if (discountCode.value === 'DISCOUNT10') {
      subtotal.value = subtotal.value * 0.9
    }
  }
  
  const total = ref(subtotal.value)
  
  watch(subtotal, (newSubtotal) => {
    total.value = newSubtotal
  })
  </script>
  
  <style scoped>
  .ticket-summary-container {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #ffffff;
  }
  
  .event-details {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .event-image {
    width: 100px;
    height: 100px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    margin-right: 20px;
    border-radius: 10px;
  }
  
  .event-info {
    display: flex;
    flex-direction: column;
  }
  
  .event-name {
    font-size: 20px;
    font-weight: bold;
    color: #333;
  }
  
  .event-date {
    color: #777;
  }
  
  .section-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
  }
  
  .tickets-section {
    margin-bottom: 20px;
  }
  
  .ticket-item {
    display: flex;
    justify-content: space-between;
    background-color: #f8f8f8;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    color: black;
  }
  
  .summary-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .apply-button {
    padding: 5px 10px;
    background-color: var(--pb-c-blue);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .discount-button {
    padding: 5px 10px;
    background-color: transparent;
    color: rgb(222, 51, 51);
    border: none;
    cursor: pointer;
  }
  
  .apply-button:hover {
    background-color: #0056b3;
  }
  
  .discount-input {
    width: 100%;
    display: flex;
    align-items: center;
  }
  
  .discount-input input {
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-right: 10px;
    margin-bottom: 0;
  }
  
  .cta-button {
    margin-top: 20px;
    padding: 15px 30px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
  
  .cta-button:hover {
    background-color: #218838;
  }
  
  @media (max-width: 768px) {
    .ticket-summary-container {
      padding: 15px;
    }
  
    .event-image {
      width: 80px;
      height: 80px;
    }
  
    .event-name {
      font-size: 16px;
    }
  
    .event-date {
      font-size: 14px;
    }
  
    .ticket-item p {
      margin-bottom: 5px;
    }
  
    .cta-button {
      font-size: 14px;
      padding: 10px 20px;
    }
  }
  </style>
  