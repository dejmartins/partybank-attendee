<template>
    <div>
        <Modal>
            <div class="min-h-80 w-96 flex flex-col items-center w-full text-center px-6 py-3">
                <div class="mb-5">
                    <h3 class="font-[700] text-[28px]">Create Account</h3>
                    <p class="leading-5 text-sm">Please enter your details to create a partybank account</p>
                </div>
                <SignInForm />
            </div>
        </Modal>
    </div>
</template>

<script setup lang="ts">
import Modal from '@/components/modals/BaseModal.vue'
import SignInForm from './SignInForm.vue';
</script>