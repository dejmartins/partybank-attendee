<template>
    <header class="fixed top-0 left-0 w-full bg-[#FFFFFF] border-b text-[#080D18] py-4 z-50">
        <div class="flex justify-between items-center px-6">
            <div class="flex items-center gap-10">
                <div>
                    <img
                        src="/pb-logo.png"
                        class="w-[65px]"
                        alt="Partybank Logo"
                    />
                </div>
    
                <nav class="hidden md:hidden space-x-6">
                    <a href="/about" class="hover:text-red-500 transition">About Us</a>
                    <a href="/faqs" class="hover:text-red-500 transition">FAQs</a>
                    <a href="/contact" class="hover:text-red-500 transition">Contact</a>
                </nav>
            </div>
  
            <div class="space-x-4">
                <a href="https://organizer.thepartybank.com/" class="">
                    <button class="bg-[var(--pb-c-red)] text-white font-[500] border-[2px] border-[#4E0916] p-3 rounded-[8px] px-10 font-[700]">
                    Create Event
                    </button>
                </a>
                <!-- <ProfileIcon v-if="isLoggedIn" />
                <RouterLink v-else to="/auth" class="bg-[var(--pb-c-red)] text-white font-[500] border-[2px] border-[#4E0916] p-3 rounded-[8px] px-10 font-[700]">Sign In</RouterLink> -->
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import ProfileIcon from '../ui/ProfileIcon.vue';

const authStore = useAuthStore();
console.log(authStore.isAuthenticated)

const isLoggedIn = computed(() => authStore.isAuthenticated);
</script>