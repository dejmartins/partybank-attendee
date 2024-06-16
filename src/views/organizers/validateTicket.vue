<template>
  <div class="container">
    <Header />
    <div class="content">
      <p class="title">Validate Tickets</p>
      <div id="qr-code-full-region" class="scanner"></div>
      <div class="validate-form">
        <input type="text" v-model="ticketId" placeholder="Enter Ticket ID" class="ticket-input" />
        <button @click="validateTicket" class="validate-button">Validate Ticket</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/layouts/HeaderBar.vue'
import { Html5Qrcode } from 'html5-qrcode'
import { onMounted, ref } from 'vue'

const ticketId = ref('')
const scannerRef = ref<Html5Qrcode | null>(null)

// Methods
const createScanQrCodes = () => {
  const html5QrCodes = new Html5Qrcode('qr-code-full-region')
  scannerRef.value = html5QrCodes
  const config = { fps: 20, qrbox: { width: 250, height: 250 } }
  html5QrCodes.start({ facingMode: 'environment' }, config, onScanSuccess, onScanError)
}

const onScanSuccess = (decodedText: any, decodedResult: any) => {
  alert(`Code scanned: ${decodedText}`)
  console.log(decodedResult)
}

const onScanError = () => {
  // console.error(`Error scanning: ${error}`)
}

const validateTicket = () => {
  console.log(`Validating ticket ID: ${ticketId.value}`)
}

onMounted(() => {
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
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.scanner {
  width: 100%;
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
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
}

.validate-button:hover {
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
</style>
