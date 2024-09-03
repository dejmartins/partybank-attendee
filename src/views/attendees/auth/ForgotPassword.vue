<template>
    <Header additionalClasses="" />
  
    <div class="mt-36 flex flex-col items-center">
      <div class="w-[600px] border text-center p-12 rounded-[30px]">
        <div class="mb-10">
          <h3 class="font-[700] text-[28px]">Forgot Password</h3>
          <p class="leading-5 text-sm">Please enter email address to reset password</p>
        </div>

        <ForgotPasswordForm />
      </div>
    </div>
</template>

<script setup lang="ts">
import Header from '@/components/layouts/HeaderBar.vue'
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm.vue';
</script>