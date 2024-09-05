<template>
    <div>
      <Modal>
        <div class="text-black min-h-72 md:min-h-80 w-[350px] md:w-[400px] flex flex-col items-center w-full text-center px-6 py-3">
            <div class="flex justify-end w-full">
                <fa-icon :icon="['fas', 'xmark']" style="color: var(--pb-c-white);" class="bg-[var(--pb-c-blue)] p-[5px] w-3 h-3 rounded-full cursor-pointer" @click="closeModal"/>
            </div>
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
    
            <p class="text-sm my-3">
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
import { ref, watch, defineProps, defineEmits } from 'vue';
import Modal from '@/components/modals/BaseModal.vue';
import SignUpForm from './CreateAccountForm.vue';
import SignInForm from './SignInForm.vue';

const props = defineProps<{ isSignUp: boolean }>();
const emit = defineEmits(['close']);

const isSignUp = ref(props.isSignUp);


watch(() => props.isSignUp, (newVal) => {
    isSignUp.value = newVal;
});

const toggleForm = () => {
    isSignUp.value = !isSignUp.value;
};

const closeModal = () => {
    emit('close');
};
</script>
