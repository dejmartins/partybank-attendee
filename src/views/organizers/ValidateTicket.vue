<!-- <template>
  <div class="container">
    <Header addtionalClasses="bg-[#f0f4f8]" />
    <div class="mt-44 px-8 md:px-10">
      <p class="text-left text-2xl font-bold block md:hidden">Ticketter</p>
      <div class="flex justify-center items-center">
        <div class="content hidden md:flex">
          <p class="text-left text-2xl mb-2 font-bold">Ticketter</p>
          <div class="border  border-2 rounded-[22px] border-[#C0C0C0] p-5 flex flex-col items-center p-4">
            <div id="qr-code-full-region" class="scanner"></div>
            <div class="validate-form border border-2 p-5 rounded-[22px]">
              <label class="text-sm">
                Ticket code
                <input type="text" v-model="ticketId" placeholder="Enter Ticket ID" class="ticket-input" />
              </label>
              <button @click="searchTicket" class="validate-button mb-5" :disabled="isSearching">
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
            <div class="flex justify-between itens-center">
              <p>Scanned Tickets</p>
              <div class="rounded-full bg-[#B74CFF] w-10 h-10 flex items-center justify-center">
                <fa-icon :icon="['fas', 'qrcode']" style="color: #ffffff;" />
              </div>
            </div>
            <p class="font-bold text-3xl">{{ totalTicketsValidated }}/{{ totalTicketsSold }}</p>
          </div>

          <p>Ticket types</p>
          
          <div class="mb-32 md:mb-0">
            <TicketType 
              v-for="ticket in ticketDetails"
              :ticket-type="ticket.ticket_type"
              :total-tickets-validated="ticket.attendees_count"
              :total-tickets-sold="ticket.max_seats"
              color="green"
            />
          </div>

          <div class="mobile-scanner flex flex-col fixed border border-2 border-t-black border-x-black rounded-t-[22px] bottom-0 left-0 right-0 w-full p-5 md:hidden">
            <button class="bg-purple-600 p-5 rounded-[15px] text-white text-lg">Scan Tickets</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import Header from '@/components/layouts/HeaderBar.vue'
import Loader from '@/components/loaders/SpinLoader.vue'
import { Html5Qrcode } from 'html5-qrcode'
import { onMounted, ref } from 'vue'
import Api from '@/utils/api'
import { useToast } from 'vue-toastification'
import { useRoute } from 'vue-router'
import { type TicketDetail } from '@/utils/types'
import TicketType from '@/components/main/TicketTypeCount.vue'

const { SEARCH_TICKET, VALIDATE_TICKET, GET_PURCHASED_TICKETS } = Api()

const ticketId = ref('')
const isSearching = ref(false)
const scannerRef = ref<Html5Qrcode | null>(null)
const ticketDetails = ref<Array<TicketDetail>>([])
const totalTicketsSold = ref<number>(0)
const totalTicketsValidated = ref<number>(0)

const toast = useToast()
const route = useRoute();

const reference = route.params.eventReference;

// Methods
const createScanQrCodes = () => {
  const html5QrCodes = new Html5Qrcode('qr-code-full-region')
  scannerRef.value = html5QrCodes
  const config = { fps: 20, qrbox: { width: 150, height: 150 } }
  html5QrCodes.start({ facingMode: 'environment' }, config, onScanSuccess, onScanError)
}

const ticketsData = async () => {
  // isLoading.value = true

  await fetch(`${GET_PURCHASED_TICKETS}/${reference}`, {
    method: 'GET'
  })
    .then((res) => res.json())
    .then((response) => {
      ticketDetails.value = response.data.ticketDetails
      totalTicketsSold.value = response.data.totalTicketsSold
      totalTicketsValidated.value = response.data.totalTicketsValidated
      console.log(response.data)
    })
    .catch((error: any) => {
      toast.error('Error fetching ticket details')
      console.log(error)
      // isLoading.value = false
    })
}

const onScanSuccess = (decodedText: any, decodedResult: any) => {
  ticketId.value = decodedText
  searchTicket()
}

const onScanError = () => {
  // console.log(route);
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
      console.log(result.data)
      validateTicket(payload)
    }

  } catch (error) {
    toast.error('Error searching for ticket')
    // console.error('Error:', error)
  } finally {
    isSearching.value = false
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
      ticketId.value = ''
    }

  } catch (error) {
    toast.error('Failed to validate ticket')
    console.error('Error:', error)
  }
}

onMounted(() => {
  ticketsData()
  createScanQrCodes()
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
  width: 80%;
  max-width: 400px;
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

@media (max-width: 768px) {
  .content {
    padding: 15px;
  }

  .scanner {
    max-width: 100%;
  }

  .ticket-input,
  .validate-button {
    width: 100%;
  }
}
</style> -->

<!-- <template>
  <div class="container">
    <Header additionalClasses="bg-[#f0f4f8]" />
    <div class="mt-44 px-8 md:px-10">
      <p class="text-left text-2xl font-bold block md:hidden">Ticketter</p>
      <div class="flex justify-center items-center">
        <div class="content hidden md:flex">
          <p class="text-left text-2xl mb-2 font-bold">Ticketter</p>
          <div class="border border-2 rounded-[22px] border-[#C0C0C0] p-5 flex flex-col items-center p-4">
            <div id="qr-code-full-region" class="scanner"></div>
            <div class="validate-form border border-2 p-5 rounded-[22px]">
              <label class="text-sm">
                Ticket code
                <input type="text" v-model="ticketId" placeholder="Enter Ticket ID" class="ticket-input" />
              </label>
              <button @click="searchTicket" class="validate-button mb-5" :disabled="isSearching">
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

          <p>Ticket types</p>
          
          <div class="mb-32 md:mb-0">
            <TicketType 
              v-for="ticket in ticketDetails"
              :key="ticket.ticket_type"
              :ticket-type="ticket.ticket_type"
              :total-tickets-validated="ticket.attendees_count"
              :total-tickets-sold="ticket.max_seats"
              color="green"
            />
          </div>

          <div class="mobile-scanner flex flex-col fixed bottom-0 left-0 right-0 w-full">
            <transition name="mobile-scanner-transition">
              <div v-if="showMobileScanner" class="border border-2 border-t-black border-x-black rounded-t-[22px] p-5 md:hidden">
                <div class="flex justify-between items-center mb-4">
                  <p class="text-white">Scan Tickets</p>
                  <button @click="closeMobileScanner" class="text-white">
                    <fa-icon :icon="['fas', 'times']" />
                  </button>
                </div>
                <div id="mobile-scanner-content" class="scanner-content">
                  
                  <div class="border border-2 rounded-[22px] border-[#C0C0C0] p-5 flex flex-col items-center p-4">
                    <div id="qr-code-full-region" class="scanner"></div>
                    <div class="validate-form border border-2 p-5 rounded-[22px]">
                      <label class="text-sm">
                        Ticket code
                        <input type="text" v-model="ticketId" placeholder="Enter Ticket ID" class="ticket-input" />
                      </label>
                      <button @click="searchTicket" class="validate-button mb-5" :disabled="isSearching">
                        <span v-if="!isSearching">Validate Ticket</span>
                        <span v-else>
                          <Loader />
                        </span>
                      </button>
                    </div>
                  </div>
                 
                </div>
              </div>
            </transition>
            <button @click="openMobileScanner" v-if="!showMobileScanner" class="bg-purple-600 p-5 rounded-[15px] text-white text-lg md:hidden">Scan Tickets</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> -->

<template>
  <div class="container">
    <Header additionalClasses="bg-[#f0f4f8]" />
    <div class="mt-44 px-8 md:px-10">
      <p class="text-left text-2xl font-bold block md:hidden">Ticketter</p>
      <div class="flex justify-center items-center">
        <div class="content hidden md:flex">
          <p class="text-left text-2xl mb-2 font-bold">Ticketter</p>
          <div class="border border-2 rounded-[22px] border-[#C0C0C0] p-5 flex flex-col items-center p-4">
            <div id="qr-code-full-region" class="scanner"></div>
            <div class="validate-form border border-2 p-5 rounded-[22px]">
              <label class="text-sm">
                Ticket code
                <input type="text" v-model="ticketId" placeholder="Enter Ticket ID" class="ticket-input" />
              </label>
              <button @click="searchTicket" class="validate-button mb-5" :disabled="isSearching">
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

          <p>Ticket types</p>
          
          <div class="mb-32 md:mb-0">
            <TicketType 
              v-for="ticket in ticketDetails"
              :key="ticket.ticket_type"
              :ticket-type="ticket.ticket_type"
              :total-tickets-validated="ticket.attendees_count"
              :total-tickets-sold="ticket.max_seats"
              color="green"
            />
          </div>

          <div class="mobile-scanner flex flex-col fixed bottom-0 left-0 right-0 w-full">
            <transition name="mobile-scanner-transition">
              <div v-if="showMobileScanner" class="border border-2 border-t-black border-x-black rounded-t-[22px] p-5 md:hidden">
                <div class="flex justify-between items-center mb-4">
                  <p class="text-white">Scan Tickets</p>
                  <button @click="closeMobileScanner" class="text-white">
                    <fa-icon :icon="['fas', 'times']" />
                  </button>
                </div>
                <div id="mobile-scanner-content" class="scanner-content">
                  <!-- Modal content starts here -->
                  <div class="border border-2 rounded-[22px] border-[#C0C0C0] p-5 flex flex-col items-center p-4">
                    <div id="qr-code-full-region-mobile" class="scanner"></div>
                    <div class="validate-form border border-2 p-5 rounded-[22px]">
                      <label class="text-sm">
                        Ticket code
                        <input type="text" v-model="ticketId" placeholder="Enter Ticket ID" class="ticket-input" />
                      </label>
                      <button @click="searchTicket" class="validate-button mb-5" :disabled="isSearching">
                        <span v-if="!isSearching">Validate Ticket</span>
                        <span v-else>
                          <Loader />
                        </span>
                      </button>
                    </div>
                  </div>
                  <!-- Modal content ends here -->
                </div>
              </div>
            </transition>
            <button @click="openMobileScanner" v-if="!showMobileScanner" class="bg-purple-600 p-5 rounded-[15px] text-white text-lg md:hidden">Scan Tickets</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/layouts/HeaderBar.vue'
import Loader from '@/components/loaders/SpinLoader.vue'
import { Html5Qrcode } from 'html5-qrcode'
import { onMounted, ref } from 'vue'
import Api from '@/utils/api'
import { useToast } from 'vue-toastification'
import { useRoute } from 'vue-router'
import { type TicketDetail } from '@/utils/types'
import TicketType from '@/components/main/TicketTypeCount.vue'

const { SEARCH_TICKET, VALIDATE_TICKET, GET_PURCHASED_TICKETS } = Api()

const ticketId = ref('')
const isSearching = ref(false)
const scannerRef = ref<Html5Qrcode | null>(null)
const ticketDetails = ref<Array<TicketDetail>>([])
const totalTicketsSold = ref<number>(0)
const totalTicketsValidated = ref<number>(0)
const showMobileScanner = ref(false)

const toast = useToast()
const route = useRoute();

const reference = route.params.eventReference;

// Methods
const createScanQrCodes = () => {
  const html5QrCodes = new Html5Qrcode('qr-code-full-region')
  scannerRef.value = html5QrCodes
  const config = { fps: 20, qrbox: { width: 150, height: 150 } }
  html5QrCodes.start({ facingMode: 'environment' }, config, onScanSuccess, onScanError)
}

const ticketsData = async () => {
  await fetch(`${GET_PURCHASED_TICKETS}/${reference}`, {
    method: 'GET'
  })
    .then((res) => res.json())
    .then((response) => {
      ticketDetails.value = response.data.ticketDetails
      totalTicketsSold.value = response.data.totalTicketsSold
      totalTicketsValidated.value = response.data.totalTicketsValidated
    })
    .catch((error: any) => {
      toast.error('Error fetching ticket details')
      // console.error(error)
    })
}

const onScanSuccess = (decodedText: any, decodedResult: any) => {
  ticketId.value = decodedText
  searchTicket()
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
      validateTicket(payload)
    }

  } catch (error) {
    toast.error('Error searching for ticket')
  } finally {
    isSearching.value = false
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
      ticketId.value = ''
    }

  } catch (error) {
    toast.error('Failed to validate ticket')
    console.error('Error:', error)
  }
}

const openMobileScanner = () => {
  showMobileScanner.value = true
  // Initialize scanner on mobile modal open
  const html5QrCodes = new Html5Qrcode('qr-code-full-region-mobile')
  scannerRef.value = html5QrCodes
  const config = { fps: 20, qrbox: { width: 80, height: 80 } }
  html5QrCodes.start({ facingMode: 'environment' }, config, onScanSuccess, onScanError)
}

const closeMobileScanner = () => {
  showMobileScanner.value = false
  // Stop scanner and clear any ongoing scan process
  if (scannerRef.value) {
    scannerRef.value.stop()
  }
}

onMounted(() => {
  ticketsData()
  createScanQrCodes()
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
  width: 80%;
  max-width: 400px;
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

@media (max-width: 768px) {
  .content {
    padding: 15px;
  }

  .scanner {
    max-width: 100%;
  }

  .ticket-input,
  .validate-button {
    width: 100%;
  }

  .mobile-scanner {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    z-index: 1000;
    overflow: hidden;
    transition: height 0.3s ease-out;
  }

  .mobile-scanner-transition-enter-active,
  .mobile-scanner-transition-leave-active {
    transition: height 0.3s ease-out;
  }

  .mobile-scanner-transition-enter,
  .mobile-scanner-transition-leave-to {
    height: 0;
    overflow: hidden;
  }

  .scanner-content {
    margin-top: 10px;
  }
}
</style>
