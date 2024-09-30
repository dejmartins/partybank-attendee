<template>
    <div class="relative h-full mt-5 md:mt-2">
        <form class='text-left w-full' @submit.prevent="signIn">
            <label class="text-lg font-[500]">Email Address</label>
            <input 
                class="w-full rounded-[10px] p-[10px] mt-[8px] mb-[30px] md:mb-[15px] border border-[#F4F5F6] bg-[#FBFBFB] outline-none focus:ring-2 focus:ring-[var(--pb-c-red)] focus:border-[var(--pb-c-red)]" 
                placeholder="Enter your email address"
                v-model="userInfo.email"
                :class="{ error: error.emailError }"
            />
        
            <Button 
                action="Sign In"
                :disabled="isLoading"
                :loading="isLoading"
                additional-classes="bg-[var(--pb-c-red)] border-[var(--pb-c-red)] text-[var(--pb-c-white)] w-full"
                text-style="text-[18px] font-[700]"
                additional-loader-classes="border-4 border-t-[var(--pb-c-red)]"
            />
            <hr class="my-6 border-[1px]" />
        </form>
    
        <Button
            action="Continue with Google"
            additional-classes="bg-[#FBFBFB] border border-[#F4F5F6] w-full"
            text-style="text-[16px] font-[500]"
            :disabled="isLoadingGoogle"
            :loading="false"
            @click="handleGoogleSuccess"
            additional-loader-classes="border-4 border-t-[var(--pb-c-blue)]"
        >
            <img src="/google-icon.png" alt='Google Icon' class='w-[22px] h-[22px]' />
        </Button>
    
        <p className='text-[15px] leading-[20.81px] md:text-[18px] font-[200] md:leading-[23.81px] mt-8 md:mt-5'>By continuing, you agree to have read and accepted partybank <span className='text-[var(--pb-c-red)] font-[500] underline underline-offset-4 cursor-pointer'><RouterLink to="/termsandconditions">terms and conditions</RouterLink></span></p>
    </div>
</template>
  
<script setup lang="ts">
import Button from '../buttons/LoaderButton.vue';
import Api from '@/utils/api';
import { reactive, computed, defineEmits, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { handleSignIn } from '@/utils/actions';
import { useRouter } from 'vue-router';
import { isValidEmail } from '@/utils/actions';

const { AUTH, GOOGLE_AUTH } = Api();
const authStore = useAuthStore();
const router = useRouter();

const userInfo = reactive({
    email: '',
});

const error = reactive({
    emailError: false,
});

const emit = defineEmits(['emailSent', 'close']);
const isLoading = ref(false);
const isLoadingGoogle = ref(false);
  
// Methods
const validateUserInfo = () => {
    error.emailError = userInfo.email === '' || !isValidEmail(userInfo.email);
};

const storeCurrentPage = () => {
    const currentPage = router.currentRoute.value.fullPath;
    localStorage.setItem('previousPage', currentPage);
};

const signIn = async () => {
    validateUserInfo();

    if (isUserInfoValidated.value) {
        storeCurrentPage();
        
        isLoading.value = true;
        await handleSignIn(userInfo.email, AUTH, emit, authStore)
        .finally(() => {
            isLoading.value = false;
        });

        userInfo.email = '';
    }
};

const handleGoogleSuccess = async () => {
    try {
        console.log("Here")
        isLoadingGoogle.value = true;
        storeCurrentPage();

        const res = await fetch(GOOGLE_AUTH, {
            method: 'GET',
        });

        const data = await res.json();
        console.log('Backend response:', data);

        window.location.href = data.data;

    } catch (error) {
        console.error('Error during Google login:', error);
    } finally {
        isLoadingGoogle.value = false;
    }
};

// Computed Properties
const isUserInfoValidated = computed(() => {
    return !error.emailError;
})
</script>
  