<template>
    <Header additionalClasses="" />
  
    <div class="mt-36 flex flex-col items-center mx-5 md:mx-20">
      <div class="w-full flex justify-start mb-8">
        <router-link to="/" class="flex items-center">
          <fa-icon :icon="['fas', 'arrow-left']" style="color: #000000" class="mr-3 border h-4 w-4 p-2 rounded-full bg-[#F7F6F7]" />
          <p class="hidden md:block">Back</p>
        </router-link>
      </div>
  
      <div class="w-full md:w-[600px] border text-center p-6 md:p-12 rounded-[30px]">
        <div class="mb-10 flex flex-col items-center">
          <h3 class="font-[700] text-[28px]">Reset Password</h3>
          <p class="leading-5 text-md w-[300px]">Please enter new password for your account</p>
        </div>
  
        <ResetPasswordForm />
      </div>
    </div>
</template>
  
<script setup lang="ts">
import Header from '@/components/layouts/HeaderBar.vue'
import ResetPasswordForm from '@/components/auth/ResetPasswordForm.vue';
</script>
  