<template>
  <form class="form-container" @submit.prevent="handleProceedToPayment">
    <div class="form-group">
      <label class="form-label font-bold">Where are you based?</label>
      <Listbox v-model="selectedLocation">
        <div class="relative mt-1">
          <ListboxButton
            class="relative w-full cursor-default rounded-lg border border-[#ccc] py-3 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
          >
            <span class="block truncate">{{ selectedLocation.name }}</span>
            <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <fa-icon :icon="['fas', 'chevron-down']" style="color: #ffffff;" />
            </span>
          </ListboxButton>

          <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ListboxOptions
              class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
            >
              <ListboxOption
                v-slot="{ active, selected }"
                v-for="location in locations"
                :key="location.name"
                :value="location"
                :disabled="location.unavailable"
                as="template"
              >
                <li
                  :class="[
                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                    'relative cursor-default select-none py-2 pl-10 pr-4'
                  ]"
                >
                  <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{ location.name }}</span>
                  <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                  >
                    <fa-icon :icon="['fas', 'check']" style="color: #FFBF00;" />
                  </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
    </div>

    <div class="flex flex-col">
      <label class="flex items-center text-gray-300">
        <input type="checkbox" v-model="isAdult" class="w-[10px] h-[10px] md:w-[15px] md:h-[15px] mr-[10px] mt-[15px] text-[10px]" />
        I confirm I am 18 years old or older
      </label>
    </div>

    <PaymentButton 
      action="Proceed to Payment" 
      :loading="isDisabled" 
      :disabled="isDisabled"
      additionalClasses="hover:bg-[var(--pb-c-blue)] border-[var(--pb-c-blue)]"
      additionalLoaderClasses="border-2 border-t-[var(--pb-c-blue)]"
    />

  </form>
  <SignIn v-if="showSignInModal" @close="closeModal" :is-sign-up="false"/>
</template>

<script setup lang="ts">
import PaymentButton from '@/components/buttons/LoaderButton.vue'
import SignIn from '@/components/auth/SignIn.vue';
import { ref, computed } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'

const locations = [
  { id: 1, name: 'Warri', unavailable: false },
  { id: 2, name: 'Benin', unavailable: false },
  { id: 3, name: 'PortHarcourt', unavailable: false },
  { id: 4, name: 'Asaba', unavailable: false },
  { id: 5, name: 'Calabar', unavailable: false }
]
const selectedLocation = ref(locations[0])
const emit = defineEmits(['proceed'])
const isDisabled = ref<boolean>(false)
const isAdult = ref<boolean>(false)
const showSignInModal = ref(false);


const isUserLoggedIn = () => {
  return false; 
}

const handleProceedToPayment = () => {
  if (!isUserLoggedIn()) {
    showSignInModal.value = true; 
  } else {
    proceedToPayment(); 
  }
}

const proceedToPayment = () => {
  if (isUserInfoValidated.value) {
    isDisabled.value = true
    emit('proceed', { 
      location: selectedLocation.value.name, 
      termsAndConditionsAccepted: isAdult.value 
    })
  }
}

const closeModal = () => {
  showSignInModal.value = false;
};

// Computed Properties
const isUserInfoValidated = computed(() => {
  return isAdult.value;
})
</script>


<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
  background-color: transparent;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: white;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  margin-bottom: 8px;
  color: #cfcfcf;
}

.form-input {
  padding: 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  background-color: transparent;
  border-radius: 5px;
  width: 300px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

.form-input:focus {
  border-color: var(--pb-c-blue);
  outline: none;
}

.error input {
  border-color: red;
}

@media (max-width: 768px) {
  .form-input {
    width: 100%;
  }
}
</style>
