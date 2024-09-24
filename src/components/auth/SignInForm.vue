<template>
  <div class="w-full">
    <form @submit.prevent="signIn">
      <div>
        <input
          type="email"
          id="email"
          v-model="userInfo.email"
          class="mt-5 p-2 w-full rounded-md outline-0 focus:ring-1 focus:ring-[var(--pb-c-blue)]"
          placeholder="Enter your email address"
          :class="{ error: error.emailError }"
        />
      </div>

      <Button 
        action="Continue" 
        :loading="isLoading" 
        :disabled="isLoading" 
        additional-classes="mt-10 text-white w-full bg-[var(--pb-c-blue)]"
        additionalLoaderClasses="border-2 border-t-[var(--pb-c-blue)]"
      />
    </form>

    <button @click="handleGoogleSuccess">Google Login</button>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, defineEmits, ref } from 'vue';
import Api from '@/utils/api';
import { useAuthStore } from '@/stores/auth';
import { handleSignIn } from './helpers/helper';
import { useRouter } from 'vue-router';
import Button from '../buttons/LoaderButton.vue';

const { AUTH, GOOGLE_AUTH } = Api();
const authStore = useAuthStore();
const router = useRouter();

const userInfo = reactive({
  email: '',
});

const error = reactive({
  emailError: false,
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emit = defineEmits(['emailSent', 'close']);
const isLoading = ref(false);

// Methods
const validateUserInfo = () => {
  error.emailError = userInfo.email === '' || !emailRegex.test(userInfo.email);
};

const signIn = async () => {
  validateUserInfo();

  if (isUserInfoValidated.value) {
    storeCurrentPage();
    
    isLoading.value = true;
    await handleSignIn(userInfo.email, AUTH, emit, authStore)
      .finally(() => {
        isLoading.value = false;
      });

    userInfo.email = '';
  }
};

const handleGoogleSuccess = async (response: any) => {
  try {
    console.log('Google login success:', response);
    storeCurrentPage();

    const res = await fetch(GOOGLE_AUTH, {
      method: 'GET',
    });

    const data = await res.json();
    console.log('Backend response:', data);

    window.location.href = data.data;

  } catch (error) {
    console.error('Error during Google login:', error);
  }
};

const handleGoogleFailure = (error: any) => {
  console.error('Google login failed:', error);
};

const handleLoginError = () => {
  console.error("Login failed");
};

const storeCurrentPage = () => {
  const currentPage = router.currentRoute.value.fullPath;
  localStorage.setItem('previousPage', currentPage);
};

// Computed Properties
const isUserInfoValidated = computed(() => {
  return !error.emailError;
})
</script>

<style scoped>
.error {
  border-color: red;
}
</style>
