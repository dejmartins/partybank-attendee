<template>
  <BaseModal>
    <div class="p-5">
      <div class="w-full flex justify-between items-center">
        <img src="@/assets/images/ticketSent.gif" class="h-12 w-12 mb-5" alt="TicketSent Gif" />
        <fa-icon
          class="cursor-pointer"
          :icon="['fas', 'xmark']"
          style="color: aliceblue;"
          @click="closeModal"
        />
      </div>
      <div>
        <div class="w-72">
          <h3 class="font-bold text-[18px]">Your ticket is on its way!</h3>
          <div class="mt-5">
            <p class="font-semibold text-sm">Digital Ticket</p>
            <div class="flex items-center mt-3">
              <img :src="eventImage" class="h-12 w-12 mr-3" alt="Ticket Image" />
              <p>{{ eventName }}</p>
            </div>
            <p class="mt-3">To: <span class="font-semibold">{{ attendeeEmail }}</span></p>
          </div>
        </div>
        <Button
          class="my-5 flex items-center justify-center w-full"
          action="Back to Tickets"
          :disabled="isDisabled"
          :loading="isDisabled"
          @click="closeModal"
        ></Button>
      </div>
    </div>
  </BaseModal>
</template>

  
<script setup lang="ts">
import BaseModal from './BaseModal.vue'
import Button from '@/components/buttons/RoundedMdButton.vue'
import { ref } from 'vue'

const props = defineProps({
  eventImage: String,
  eventName: String,
  attendeeEmail: String
})

const emit = defineEmits(['close'])

const isDisabled = ref(false)

// Methods
const closeModal = () => {
  emit('close')
}
</script>

<style scoped>
h3 {
  color: #333;
}

p {
  color: #555;
}

.flex img {
  border-radius: 10px;
  object-fit: cover;
}
</style>
