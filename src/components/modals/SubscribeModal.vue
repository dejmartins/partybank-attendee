<template>
  <BaseModal>
    <div class="p-5">
      <img src="@/assets/images/subscribe.gif" class="h-12 w-12 mb-3" alt="Subscribe Gif" />
      <div>
        <div class="w-72">
          <h3 class="font-bold text-[18px]">Don't miss out!</h3>
          <p class="text-[#5F7165] text-sm mb-5">
            Be the first to know about exclusive events, parties, and happenings in {{ location }}.
          </p>
        </div>

        <form @submit.prevent="subscribe" class="text-lg">
          <div class="animated-input" :class="{ error: error.nameError }">
            <label class="font-semibold">Name</label>
            <input v-model="user.fullName" placeholder="Leemon" />
          </div>
          <div :class="{ error: error.emailError }">
            <label class="font-semibold">Email Address</label>
            <input v-model="user.email" placeholder="lee@thepartybank.com" />
          </div>
          <Button
            class="my-5 flex items-center justify-center w-full"
            action="Subscribe"
            :disabled="isDisabled"
            :loading="isDisabled"
          ></Button>
        </form>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from './BaseModal.vue'
import Button from '@/components/buttons/RoundedMdButton.vue'
import Api from '@/utils/api'
import { ref, reactive, computed } from 'vue'
import { useToast } from 'vue-toastification'

defineProps<{
  location: string
}>()

const emit = defineEmits(['close'])

let emailRegex = ref(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
const isDisabled = ref(false)
const { SUBSCRIBE } = Api()
const toast = useToast()

const user = reactive({
  fullName: '',
  email: ''
})

const error = reactive({
  nameError: false,
  emailError: false
})

// Methods
const validateUserDetails = () => {
  error.nameError = user.fullName === ''
  error.emailError = user.email === '' || !emailRegex.value.test(user.email)
}

const subscribe = async () => {
  validateUserDetails()

  if (isUserDetailsValidated.value) {
    isDisabled.value = true
    try {
      const response = await fetch(SUBSCRIBE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      } else {
        toast.info('Successful Subscription')
      }
    } catch (error) {
      toast.error('Subscription Failed')
      console.error('Subscription failed', error)
    } finally {
      isDisabled.value = false
      emit('close')
    }
  }
}

// Computed Properties
const isUserDetailsValidated = computed(() => {
  return !error.emailError && !error.nameError
})
</script>
