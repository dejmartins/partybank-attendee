<template>
    <div>
      <Modal>
        <div class="relative text-black min-h-72 md:min-h-80 w-[350px] md:w-[550px] flex flex-col items-center w-full text-center px-6 md:px-14 py-3 pb-10">
            <div class="absolute flex justify-start w-full">
                <fa-icon :icon="['fas', 'arrow-left']" style="color: black;" class="bg-[#F7F6F7] p-[7px] w-4 h-4 rounded-full cursor-pointer" @click="closeModal"/>
            </div>
            <div class="my-5">
                <h3 class="font-[700] text-[28px]">
                    Complete Your Purchase
                </h3>
                <p class="leading-5 text-sm">
                    Sign in your account to complete your ticket purchase.
                </p>
            </div>
  
            <div class="w-full">
                <SignInFormModal @email-sent="emailSent" @close="closeModal" />
            </div>
        </div>
      </Modal>
    </div>
</template>
  
<script setup lang="ts">
import { defineEmits } from 'vue';
import Modal from '@/components/modals/BaseModal.vue';
import SignInForm from '@/components/auth/SignInForm.vue';
import SignInFormModal from '@/components/auth/SignInFormModal.vue';

const emit = defineEmits(['close', 'email-sent']);

const closeModal = () => {
    emit('close');
};

const emailSent = () => {
    emit('email-sent');
};
</script>
