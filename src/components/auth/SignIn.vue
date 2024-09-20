<template>
    <div>
      <Modal>
        <div class="text-black min-h-72 md:min-h-80 w-[350px] md:w-[400px] flex flex-col items-center w-full text-center px-6 py-3">
            <div class="flex justify-end w-full">
                <fa-icon :icon="['fas', 'xmark']" style="color: var(--pb-c-white);" class="bg-[var(--pb-c-blue)] p-[5px] w-3 h-3 rounded-full cursor-pointer" @click="closeModal"/>
            </div>
            <div class="mb-5">
                <h3 class="font-[700] text-[28px]">
                    Sign In
                </h3>
                <p class="leading-5 text-sm">
                    Welcome back! Please sign in to your account
                </p>
            </div>
  
            <div class="w-full">
                <SignInForm @email-sent="emailSent" @close="closeModal" />
            </div>
        </div>
      </Modal>
    </div>
</template>
  
<script setup lang="ts">
import { defineEmits } from 'vue';
import Modal from '@/components/modals/BaseModal.vue';
import SignInForm from './SignInForm.vue';

const emit = defineEmits(['close', 'email-sent']);

const closeModal = () => {
    emit('close');
};

const emailSent = () => {
    emit('email-sent');
};
</script>
