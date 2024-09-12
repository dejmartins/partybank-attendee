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

      <button
        type="submit"
        class="mt-16 w-full cursor-pointer bg-[var(--pb-c-blue)] text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Continue
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, defineEmits } from 'vue';
import Api from '@/utils/api';
import { useAuthStore } from '@/stores/auth';
import { handleSignIn } from './helpers/helper';
import { useRouter } from 'vue-router';

const { AUTH } = Api();

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

// Methods
const validateUserInfo = () => {
  error.emailError = userInfo.email === '' || !emailRegex.test(userInfo.email);
};

const signIn = async () => {
  validateUserInfo();

  if (isUserInfoValidated.value) {
    storeCurrentPage();
    
    await handleSignIn(userInfo.email, AUTH, emit, authStore)

    userInfo.email = '';
    return;
  }
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
