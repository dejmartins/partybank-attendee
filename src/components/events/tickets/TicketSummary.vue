<template>
  <div class="flex flex-col md:flex-row w-full h-[calc(100vh-210px)] overflow-y-auto md:overflow-y-hidden rounded-[20px] bg-[#F9F7F7] p-6 md:p-10 mt-4 border border-[#DDE0E3] custom-scrollbar">
    <div class="w-full md:w-1/2 px-0 md:px-2 ">
      <p class="font-[700] text-[24px] md:text-[30px] mb-2 md:mb-0">My Info</p>
      <form class="form-container p-3 md:p-6 rounded-[20px]">
        <div class="form-group">
          <label class="font-[600] text-[15px] md:text-[18px]">Where are you based?</label>
          <Listbox v-model="selectedLocation">
            <div class="relative mt-1">
              <ListboxButton class="relative w-full flex items-center cursor-default rounded-lg border border-[#F4F5F6] h-[56px] py-2 pl-3 pr-10 text-left text-black">
                <span class="absolute flex items-center justify-center left-2 rounded-[8px] px-6 h-[70%] bg-[#F8F9F9] font-[400] text-[#080D18]">NG</span>
                <span class="block truncate ml-20 text-[#DDE0E3]">{{ selectedLocation.name }}</span>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <fa-icon :icon="['fas', 'chevron-down']" style="color: black;" />
                </span>
              </ListboxButton>

              <ListboxOptions class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 z-50">
                <ListboxOption
                  v-for="location in locations"
                  :key="location.name"
                  :value="location"
                  as="template"
                >
                  <li :class="['relative cursor-default select-none py-2 pl-10 pr-4', selectedLocation === location ? 'bg-[#FFF2F4] text-[var(--pb-c-red)]' : 'text-gray-900']">
                    <span class="block truncate">{{ location.name }}</span>
                    <span v-if="selectedLocation === location" class="absolute inset-y-0 left-0 flex items-center pl-3 text-[var(--pb-c-red)]">
                      <fa-icon :icon="['fas', 'check']" />
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </div>
          </Listbox>
        </div>

        <div class="relative">
          <label class="font-[600] w-full text-[15px] md:text-[18px]">Phone Number:</label>
          <div class="relative">
            <span class="absolute inset-y-0 top-2 left-2 h-[58%] flex items-center justify-center rounded-[8px] px-6 bg-[#F8F9F9] font-[400] text-[#080D18]">+234</span>
            <input
              v-model="userInfo.phoneNumber"
              type="tel"
              class="form-input w-full pl-28 h-[56px] "
              placeholder="704 3946 3386"
              maxlength="11"
              @input="filterNonDigits"
            />
          </div>
          <p v-if="error.phoneError" class="text-red-600 text-sm">Invalid phone number format.</p>
        </div>
      </form>
    </div>

    <!-- Ticket Info -->
    <div class="w-full md:w-1/2 px-0 md:px-2 md:overflow-y-auto h-[calc(100vh-290px)] custom-scrollbar">
      <p class="font-[700] text-[24px] md:text-[30px] mt-5 md:mt-0 mb-2 md:mb-0">Ticket Info</p>
      <div class="rounded-[20px] bg-[#FFFFFF] p-3 md:p-6">
        <div class="w-full mb-4">
          <img :src="eventStore.eventImage || '/defaultImage.png'" alt="Event Image" class="w-full h-[100px] md:h-[150px] object-cover rounded-[20px] border border-[#DDE0E3]" />
        </div>
        <div class="">
          <div class="border-b pb-2">
            <p class="font-[600] text-[24px] md:text-[27px]">{{ eventStore.eventName }}</p>
            <p class="font-[400] text-[#B5BBC0] text-[16px] md:text-[20px]">{{ currentDate }}</p>
          </div>

          <div class="border-b pb-2">
            <div class="flex justify-between text-[#B5BBC0] font-[400] text-[16px] md:text-[20px] my-3">
              <p>Total Ticket</p>
              <p>{{ eventStore.ticketQuantity }} x {{ eventStore.ticketType }}</p>
            </div>
            <div class="flex justify-between font-[400] text-[16px] md:text-[20px]">
              <p class="text-[#B5BBC0]">Amount</p>
              <p><span class="text-[12px]">NGN</span> {{ formatAmountWithCommas(eventStore.ticketAmount) }}</p>
            </div>
          </div>

          <div class="flex justify-between mt-4 text-[20px] md:text-[22px] md:text-[28px]">
            <p class="font-[700]">Total Payment</p>
            <p class="font-[700]"><span class="text-[12px]">NGN</span> {{ formatAmountWithCommas(total) }}</p>
          </div>
        </div>
      </div>

      <div class="flex flex-col mt-4">
        <label class="flex items-center font-[200]">
          <input v-model="termsAccepted" type="checkbox" class="w-[10px] h-[10px] md:w-[15px] md:h-[15px] mr-[10px] mt-[15px]" />
          By checking this box, you agree that the information you provided is correct and valid, and you are above 18 years of age
        </label>
        <p v-if="error.termsError" class="text-red-600 text-sm">You must accept the terms.</p>
      </div>

      <Button 
        action="Proceed to Payment"
        :disabled="disabled"
        :loading="disabled"
        additional-classes="bg-[var(--pb-c-red)] border-[var(--pb-c-red)] text-[var(--pb-c-white)] w-full my-5"
        text-style="text-[18px] font-[700]"
        additional-loader-classes="border-4 border-t-[var(--pb-c-red)]"
        @click="handleProceedToPayment"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import Button from '@/components/buttons/LoaderButton.vue';
import Api from '@/utils/api';
import { useEventStore } from '@/stores/event';
import { ref, computed } from 'vue';
import { formatAmountWithCommas, formatPhoneNumber } from '@/utils/actions';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'vue-toastification';
import { isValidPhoneNumber } from '@/utils/actions';

const { PAY } = Api();
const eventStore = useEventStore();
const authStore = useAuthStore();
const toast = useToast();

const currentDate = ref(moment().format('MMMM Do, YYYY'))
const total = ref(eventStore.ticketQuantity * eventStore.ticketAmount);

const locations = ref([
  { name: 'Warri' },
  { name: 'Benin' },
  { name: 'PortHarcourt' },
  { name: 'Asaba' },
  { name: 'Calabar' }
]);
const selectedLocation = ref(locations.value[0]);
const userInfo = ref({ phoneNumber: '' });
const termsAccepted = ref(false);
const disabled = ref(false);

const error = ref({
  phoneError: false,
  termsError: false
});

// Methods
const filterNonDigits = (event: Event) => {
  const input = event.target as HTMLInputElement;
  input.value = input.value.replace(/[^+\d]/g, '');
  userInfo.value.phoneNumber = input.value;
};

const validateForm = () => {
  error.value.phoneError = !isValidPhoneNumber(userInfo.value.phoneNumber);
  error.value.termsError = !termsAccepted.value;
  return !error.value.phoneError && !error.value.termsError;
};

const isFormValid = computed(() => validateForm());

const pay = async (value: any) => {
  const payload = {
    email: authStore.decodedEmail,
    phoneNumber: formatPhoneNumber(value.phoneNumber),
    city: value.location,
    emailValidated: true,
    termsAndConditionsAccepted: value.termsAccepted,
    numberOfTickets: eventStore.ticketQuantity,
    discountRecorded: false,
    discounted: false,
    ticketType: eventStore.ticketType,
    eventReference: eventStore.eventReference
  };

  console.log(payload);

  try {
    const response = await fetch(PAY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
      const res = response.json();
      res.then((r) => console.log(r))
    } else {
      const res = await response.json();
      if (res.data.url) {
        window.location.href = res.data.url;
      } else {
        toast.success('Ticket sent successfully');
      }
    }
  } catch (error) {
    toast.error('Payment Unsuccessful');
  } finally {
    disabled.value = false;
  }
};

const handleProceedToPayment = () => {
  if (isFormValid.value) {
      disabled.value = true;

      pay({
          location: selectedLocation.value.name,
          phoneNumber: userInfo.value.phoneNumber,
          termsAccepted: termsAccepted.value
      });
  } else {
      toast.error("Please complete all required fields correctly.");
  }
};
</script>

<style scoped>
.form-container {
  background-color: #FFFFFF;
}

.form-group {
  margin-bottom: 20px;
}

.form-input {
  border: 1px solid #F4F5F6;
  background-color: transparent;
  border-radius: 5px;
  transition: border-color 0.3s;
}

.form-input:focus {
  border-color: var(--pb-c-red);
  outline: none;
}
</style>
