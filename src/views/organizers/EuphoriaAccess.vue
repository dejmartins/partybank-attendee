<template>
  <div class="container">
    <Header />
    <div class="content flex justify-center">
      <div class="login-container flex flex-col justify-center">
        <div class="title w-72">
          <img src="@/assets/images/ticket.gif" class="h-16 w-16 mb-3" alt="Ticket Gif" />
          <h3 class="font-bold text-[20px]">Welcome to Partybank</h3>
          <p class="text-[#5F7165] text-sm mb-5">Rave Experience Ticketting</p>
        </div>
        <form class="login-form" @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email" class="form-label">Email Address</label>
            <input type="email" id="email" v-model="email" class="form-input" required />
          </div>
          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <input type="password" id="password" v-model="password" class="form-input" required />
          </div>
          <Button
            :action="'Login'"
            :loading="isLoading"
            :disabled="isLoading"
            class="w-full my-5"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/layouts/HeaderBar.vue'
import Button from '@/components/buttons/RoundedMdButton.vue'
import { ref } from 'vue'
import { auth } from '@/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const email = ref('')
const password = ref('')
const errorMessage = ref<string | null>(null)
const isLoading = ref(false)
const router = useRouter()
const toast = useToast()

const handleLogin = () => {
  isLoading.value = true
  errorMessage.value = null

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user

      // @ts-ignore
      localStorage.setItem('user', user.email)

      console.log(user)
      router.push('/validate')
    })
    .catch((error) => {
      if (error.code === 'auth/network-request-failed') {
        toast.error('Poor network connectivity')
      } else if (error.code === 'auth/invalid-credential') {
        toast.error('Invalid Credentials')
      } else {
        toast.error('An error occurred. Please try again.')
      }
    })
    .finally(() => {
      isLoading.value = false
    })
}
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
  padding: 20px;
}

.login-container {
  width: 100%;
  max-width: 400px;
  padding: 40px;
  max-height: 480px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.logo {
  height: 40px;
  margin-bottom: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.form-label {
  margin-bottom: 5px;
  color: #333;
  font-weight: bold;
}

.form-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

.form-input:focus {
  border-color: #007bff;
  outline: none;
}

@media (max-width: 768px) {
  .content {
    padding: 15px;
  }

  .login-container {
    padding: 20px;
  }
}
</style>
