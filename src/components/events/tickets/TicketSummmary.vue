<template>
  <div class="flex flex-col md:flex-row w-full h-[calc(100vh-210px)] overflow-y-auto md:overflow-y-hidden rounded-[20px] bg-[#F9F7F7] p-6 md:p-10 mt-4 border border-[#DDE0E3] custom-scrollbar">
    <div class="w-full md:w-1/3">
        <p class="font-[700] text-[30px]">My Info</p>
        <AttendeeInfo />
    </div>

    <div class="w-full md:w-2/3 px-0 md:px-8 md:overflow-y-auto h-[calc(100vh-290px)] custom-scrollbar">
        <p class="font-[700] text-[30px] mt-5 md:mt-0">Ticket Info</p>
        <div class="rounded-[20px] bg-[#FFFFFF] p-3 md:p-6">
            <div class="w-full mb-4">
                <img :src="eventStore.eventImage || '/defaultImage.png'" alt="Event Image" class="w-full h-[100px] md:h-[150px] object-cover rounded-[20px] border border-[#DDE0E3]" />
            </div>
            <div class="">
                <div :style="{ backgroundImage: `url(${eventStore.eventImage ? eventStore.eventImage : defaultImage})` }"></div>
                <div class="border-b pb-2">
                    <p class="font-[600] text-[27px]">{{ eventStore.eventName }}</p>
                    <p class="font-[400] text-[#B5BBC0] text-[20px]">{{ currentDate }}</p>
                </div>
    
                <div class="border-b pb-2">
                    <div class="flex justify-between text-[#B5BBC0] font-[400] text-[20px] my-3">
                        <p>Total Ticket</p>
                        <p>{{ eventStore.ticketQuantity }} x {{ eventStore.ticketType }}</p>
                    </div>
                    <div class="flex justify-between font-[400] text-[20px]">
                        <p class="text-[#B5BBC0]">Amount</p>
                        <p><span class="text-[12px]">NGN</span> {{ formatAmountWithCommas(eventStore.ticketAmount) }}</p>
                    </div>
                </div>
    
                <div class="flex justify-between mt-4 text-[22px] md:text-[28px]">
                    <p class="font-[700]">Total Payment</p>
                    <p class="font-[700]"><span class="text-[12px]">NGN</span> {{ formatAmountWithCommas(total) }}</p>
                </div>
            </div>
        </div>

        <div class="flex flex-col mt-4">
            <label class="flex items-center font-[200]">
                <input type="checkbox" class="w-[10px] h-[10px] md:w-[15px] md:h-[15px] mr-[10px] mt-[15px] text-[10px]" />
                    By checking this box, you agree that the information you provided is correct and valid, and you are above 18 years of age
            </label>
        </div>

        <Button 
            action="Proceed to Payment"
            :disabled="false"
            :loading="false"
            additional-classes="bg-[var(--pb-c-red)] border-[var(--pb-c-red)] text-[var(--pb-c-white)] w-full mt-5"
            text-style="text-[18px] font-[700]"
            additional-loader-classes="border-4 border-t-[var(--pb-c-red)]"
        />
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import defaultImage from '/defaultImage.png'
import Button from '@/components/buttons/LoaderButton.vue';
import { useEventStore } from '@/stores/event';
import { ref } from 'vue';
import AttendeeInfo from './AttendeeInfo.vue';
import { formatAmountWithCommas } from '@/utils/actions';

const eventStore = useEventStore();
const currentDate = ref(moment().format('MMMM Do, YYYY'))
const total = ref(eventStore.ticketQuantity * eventStore.ticketAmount)
</script>
