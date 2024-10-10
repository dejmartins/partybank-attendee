<template>
    <div>
      <Modal>
        <div class="mb-5 text-black min-h-72 md:min-h-80 w-[350px] md:w-[400px] flex flex-col items-center w-full text-center px-6 py-3">
            <div class="flex justify-start w-full">
                <fa-icon :icon="['fas', 'arrow-left']" style="color: black;" class="bg-[#F7F6F7] p-[7px] w-4 h-4 rounded-full cursor-pointer" @click="closeModal"/>
            </div>
            <div class="mb-5 flex flex-col items-center">
                <img src="../../assets/images/subscribe.gif" alt="email icon" class="h-16 w-16"/>
                <h3 class="font-[700] text-[23px] mb-2">
                    Check Your Email
                </h3>
                <p class="leading-5 text-[16px] font-[400]">
                    We've sent an authentication link to the email address you provided. Please check your email and click the link to continue.
                </p>
            </div>
  
            <div class="w-full">
                <p class="text-sm mb-4">
                    If you haven't received the email, check your spam folder or <button class="text-[var(--pb-c-red)] font-[600] underline" @click="resendAuthEmail">click here to resend</button>.
                </p>
            </div>
        </div>
      </Modal>
    </div>
</template>
  
<script setup lang="ts">
import { defineEmits } from 'vue';
import Modal from '@/components/modals/BaseModal.vue';
import { handleSignIn } from '@/utils/actions';
import { useAuthStore } from '@/stores/auth';
import Api from '@/utils/api';

const { AUTH } = Api();
const authStore = useAuthStore();
const emit = defineEmits(['close']);

const closeModal = () => {
    emit('close');
};

const resendAuthEmail = async () => {
  const email = authStore.email;
  if (email) {
    await handleSignIn(email, AUTH, emit, authStore);
  } else {
    console.log('No email found to resend the link.');
  }
};
</script>
