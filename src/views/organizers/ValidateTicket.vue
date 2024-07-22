<template>
  <div class="container">
    <Header additionalClasses="bg-[#f0f4f8]" />
    <div class="mt-44 px-8 md:px-10">
      <p class="text-left text-2xl font-bold block md:hidden">Ticketter</p>
      <div class="flex justify-center items-center">
        <div class="content hidden md:flex">
          <p class="text-left text-2xl mb-2 font-bold">Ticketter</p>
          <div class="border border-2 rounded-[22px] border-[#C0C0C0] p-5 flex flex-col items-center p-4">
            <div class="h-[200px] w-[200px] mt-[20px] bg-[#F4F4F4] border-2 border-[#C0C0C0] flex items-center justify-center">
              <img src="@/assets/images/qr.png" alt="Scan Icon" />
            </div>
            <div class="validate-form border border-2 p-5 rounded-[22px]">
              <label class="text-sm">
                Ticket code
                <input type="text" v-model="ticketId" placeholder="Enter Ticket ID" class="ticket-input" />
              </label>
              <button @click="searchTicket" class="validate-button mb-5" :disabled="isSearching || !ticketId">
                <span v-if="!isSearching">Validate Ticket</span>
                <span v-else>
                  <Loader />
                </span>
              </button>
            </div>
          </div>
        </div>

        <div class="w-full md:w-[400px]">
          <div class="border border-2 border-[#C0C0C0] my-4 p-5 rounded-[22px]">
            <div class="flex justify-between items-center">
              <p>Scanned Tickets</p>
              <div class="rounded-full bg-[#B74CFF] w-10 h-10 flex items-center justify-center">
                <fa-icon :icon="['fas', 'qrcode']" style="color: #ffffff;" />
              </div>
            </div>
            <p class="font-bold text-3xl">{{ totalTicketsValidated }}/{{ totalTicketsSold }}</p>
          </div>

          <p class="font-bold">Ticket types</p>

          <div class="mb-32 md:mb-0">
            <TicketType
              v-for="ticket in ticketDetails"
              :key="ticket.ticket_type"
              :ticket-type="ticket.ticket_type"
              :total-tickets-validated="ticket.validated_count"
              :total-tickets-sold="ticket.sold_count"
              :color="ticket.colour"
            />
          </div>

          <div ref="mobileScanner" class="mobile-scanner md:hidden" :class="{ 'mobile-scanner-active': showMobileScanner }">
            <div class="flex flex-col items-center border-2 rounded-t-[22px] rounded-t-[22px] p-5">
              <div class="flex justify-end mb-4 w-full">
                <button @click="closeMobileScanner" class="text-white">
                  <fa-icon :icon="['fas', 'times']" style="color: #000000;" class="mr-3" size="xl" />
                </button>
              </div>
              <div id="qr-code-full-region" class="scanner"></div>
              <div class="validate-form border border-2 p-5 rounded-[22px]">
                <label class="text-sm">
                  Ticket code
                  <input type="text" v-model="ticketId" placeholder="Enter Ticket ID" class="ticket-input" />
                </label>
                <button @click="searchTicket" class="validate-button mb-5" :disabled="isSearching || !ticketId">
                  <span v-if="!isSearching">Validate Ticket</span>
                  <span v-else>
                    <Loader />
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div v-if="!showMobileScanner" class="fixed bottom-0 left-0 border-[#C0C0C0] bg-[#f0f4f8] right-0 p-5 border-2 rounded-t-[22px] md:hidden">
            <button @click="openMobileScanner" class="bg-purple-600 p-4 rounded-[15px] w-full text-white text-lg md:hidden">Scan Tickets</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import Header from '@/components/layouts/HeaderBar.vue'
import Loader from '@/components/loaders/SpinLoader.vue'
import { Html5Qrcode } from 'html5-qrcode'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import Api from '@/utils/api'
import { type TicketDetail } from '@/utils/types'
import TicketType from '@/components/main/TicketTypeCount.vue'

const { SEARCH_TICKET, VALIDATE_TICKET, GET_PURCHASED_TICKETS } = Api()

const ticketId = ref('')
const isSearching = ref(false)
const ticketDetails = ref<Array<TicketDetail>>([])
const totalTicketsSold = ref<number>(0)
const totalTicketsValidated = ref<number>(0)
const showMobileScanner = ref(false)
const scannerRef = ref<Html5Qrcode | null>(null)
const mobileScannerRef = ref<HTMLElement | null>(null)
const toast = useToast()
const route = useRoute()

const reference = route.params.eventReference

const createScanQrCodes = () => {
  const html5QrCodes = new Html5Qrcode('qr-code-full-region')
  scannerRef.value = html5QrCodes
  const config = { fps: 20, qrbox: { width: 150, height: 150 } }
  html5QrCodes.start({ facingMode: 'environment' }, config, onScanSuccess, onScanError)
}

const stopScanQrCodes = () => {
  if (scannerRef.value) {
    scannerRef.value.stop().catch(console.error)
  }
}

const ticketsData = async () => {
  await fetch(`${GET_PURCHASED_TICKETS}/${reference}`, {
    method: 'GET'
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response.data)
      ticketDetails.value = response.data.ticketDetails
      totalTicketsSold.value = response.data.totalTicketsSold
      totalTicketsValidated.value = response.data.totalTicketsValidated
    })
    .catch((error: any) => {
      toast.error('Error fetching ticket details')
    })
}

const onScanSuccess = (decodedText: any, decodedResult: any) => {
  ticketId.value = decodedText
  stopScanQrCodes()
}

const onScanError = () => {
  // Handle scan error
}

const searchTicket = async () => {
  if (!ticketId.value) {
    toast.error('Please enter a ticket ID')
    return
  }

  isSearching.value = true

  const payload = {
    eventReference: reference,
    ticketNumber: ticketId.value
  }

  try {
    const response = await fetch(`${SEARCH_TICKET}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    const result = await response.json()

    if (!response.ok) {
      if (result.error) {
        toast.error(result.error)
      } else {
        throw new Error(result.error || `HTTP error! status: ${response.status}`)
      }
    }

    if (result.data) {
      await validateTicket(payload)
    }

  } catch (error) {
    toast.error('Error searching for ticket')
  } finally {
    isSearching.value = false
    ticketId.value = ''
    createScanQrCodes()
  }
}

const validateTicket = async (validatePayload: any) => {
  try {
    const response = await fetch(`${VALIDATE_TICKET}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(validatePayload)
    })

    const result = await response.json()

    if (!response.ok) {
      if (result.error) {
        toast.error(result.error)
      } else {
        throw new Error(result.error || `HTTP error! status: ${response.status}`)
      }
    }

    if (result.data) {
      toast.success('Ticket validated successfully')
    }

  } catch (error) {
    toast.error('Failed to validate ticket')
    console.error('Error:', error)
  }
}

const openMobileScanner = async () => {
  showMobileScanner.value = true
  await nextTick()
  const height = mobileScannerRef.value?.scrollHeight
  mobileScannerRef.value?.style.setProperty('height', `${height}px`)
  createScanQrCodes()
}

const closeMobileScanner = () => {
  showMobileScanner.value = false
  mobileScannerRef.value?.style.setProperty('height', '0')
  stopScanQrCodes()
}

onMounted(() => {
  ticketsData()
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100vw;
  background-color: #f0f4f8;
}

.content {
  flex-direction: column;
  padding: 20px;
  width: 400px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.scanner {
  width: 70%;
  max-width: 100%;
  margin: 20px 0;
  border: 1px solid #ccc;
  height: auto;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}

.validate-form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 400px;
}

.ticket-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
}

.validate-button {
  padding: 12px 20px;
  background-color: #303030;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.validate-button:disabled {
  background-color: #C0C0C0;
  cursor: not-allowed;
}

.validate-button:hover:not(:disabled) {
  background-color: #45a049;
}

.mobile-scanner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 1000;
  overflow: hidden;
  transition: height 0.9s ease-out;
  transform: translateY(100%);
  border-radius: 22px;
}

.mobile-scanner-active {
  transform: translateY(0);
}

.mobile-scanner-transition-enter-active,
.mobile-scanner-transition-leave-active {
  transition: height 0.9s ease-out;
}

.mobile-scanner-transition-enter,
.mobile-scanner-transition-leave-to {
  height: 0;
  overflow: hidden;
}

</style>
