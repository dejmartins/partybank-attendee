<template>
    <div>
      <Modal>
        <div class="text-black min-h-72 md:min-h-80 w-[350px] md:w-[400px] flex flex-col items-center w-full text-center px-6 py-3">
            <div class="flex justify-end w-full">
                <fa-icon :icon="['fas', 'xmark']" style="color: var(--pb-c-white);" class="bg-[var(--pb-c-blue)] p-[5px] w-3 h-3 rounded-full cursor-pointer" @click="closeModal"/>
            </div>
            <div class="mb-5 flex flex-col items-center">
                <img src="../../assets/images/subscribe.gif" alt="email icon" class="h-16 w-16"/>
                <h3 class="font-[700] text-[23px] mb-2">
                    Check Your Email
                </h3>
                <p class="leading-5 text-sm">
                    We've sent a verification email to the address you provided. Please check your email and click on the verification link to proceed with authentication.
                </p>
            </div>
  
            <div class="w-full">
                <p class="text-xs mb-4">
                    If you haven't received the email, check your spam folder or <button class="text-blue-600 underline" @click="resendVerificationEmail">click here to resend</button>.
                </p>
            </div>
        </div>
      </Modal>
    </div>
</template>
  
<script setup lang="ts">
import { defineEmits } from 'vue';
import Modal from '@/components/modals/BaseModal.vue';

const emit = defineEmits(['close', 'resendVerificationEmail']);

const closeModal = () => {
    emit('close');
};

const resendVerificationEmail = () => {
    emit('resendVerificationEmail');
};
</script>
