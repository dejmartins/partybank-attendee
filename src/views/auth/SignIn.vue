<template>
    <div className="flex flex-col items-center justify-between text-center bg-[var(--pb-c-soft-grey)] h-full rounded-[40px] py-8 px-6 md:p-12 text-[#080D18]">
        <div>
          <h3 className='text-[23px] md:text-[32px] font-[700] leading-[35.34px] md:leading-[42.34px]'>Welcome to Partybank</h3>
          <p className='text-[15px] leading-[20.81px] md:text-[18px] font-[200] leading-[23.81px] mb-6'>Sign in to experience the best events around you!</p>
        </div>

        <SignInForm @close="closeModal" @email-sent="emailModalToggle" />

        <p className='text-[15px] leading-[20.81px] md:text-[18px] font-[200] md:leading-[23.81px] mt-8'>By continuing, you agree to have read and accepted partybank <span className='text-[var(--pb-c-red)] font-[500] underline underline-offset-4 cursor-pointer'><RouterLink to="/termsandconditions">terms and conditions</RouterLink></span></p>
    </div>

    <CheckEmailModal v-if="showEmailSentModal" @close="emailModalToggle" />
</template>

<script setup lang="ts">
import SignInForm from '@/components/auth/SignInForms.vue';
import CheckEmailModal from '@/components/auth/CheckEmailModal.vue';
import { RouterLink } from 'vue-router';
import { ref } from 'vue';

const showModal = ref(false);
const showEmailSentModal = ref(false);

// Methods
const closeModal = () => {
  showModal.value = false;
};

const emailModalToggle = () => {
  showEmailSentModal.value = !showEmailSentModal.value;
};
</script>