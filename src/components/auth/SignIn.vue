<template>
    <div>
      <Modal>
        <div class="min-h-80 w-96 flex flex-col items-center w-full text-center px-6 py-3">
          <div class="mb-5">
            <h3 class="font-[700] text-[28px]">
              {{ isSignUp ? 'Create Account' : 'Sign In' }}
            </h3>
            <p class="leading-5 text-sm">
              {{ isSignUp ? 'Please enter your details to create a Partybank account' : 'Welcome back! Please sign in to your account' }}
            </p>
          </div>
  
          <div v-if="isSignUp" class="w-full">
            <SignUpForm />
          </div>
          <div v-else class="w-full">
            <SignInForm />
          </div>
  
          <p>
            {{ isSignUp ? 'Already have an account?' : "Don't have an account?" }}
            <span
              @click="toggleForm"
              class="text-blue-500 cursor-pointer hover:underline"
            >
              {{ isSignUp ? 'Sign In' : 'Sign Up' }}
            </span>
          </p>
        </div>
      </Modal>
    </div>
  </template>
  
<script setup lang="ts">
import { ref } from 'vue';
import Modal from '@/components/modals/BaseModal.vue';
import SignUpForm from './CreateAccountForm.vue';
import SignInForm from './SignInForm.vue';
  
const isSignUp = ref(true);


const toggleForm = () => {
    isSignUp.value = !isSignUp.value;
};
</script>
  
  <style scoped>
  /* Add any additional styling here */
  </style>
  