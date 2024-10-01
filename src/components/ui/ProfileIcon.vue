<template>
    <div>
        <Menu>
            <MenuButton>
                <div class="flex items-center gap-3 cursor-pointer">
                    <div class="flex items-center gap-2">
                        <div class="relative w-8 h-8 rounded-full overflow-hidden">
                            <div class="absolute inset-0  bg-gradient-to-b from-[#E91B41] to-[#9E3AC3]"></div>
                            <div class="absolute inset-[4px] bg-white rounded-full flex items-center justify-center">
                                <UserCircleIcon class="w-7 stroke-black stroke-1" />
                            </div>
                        </div>

                        <p class="hidden md:flex font-[500] text-sm">{{ authStore.decodedEmail }}</p>
                    </div>
                    <ChevronDownIcon class="hidden md:flex w-5 stroke-black stroke-1" />
                </div>
            </MenuButton>
            <transition
                enter-active-class="transition duration-150 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-out"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0" >
                <MenuItems class="flex flex-col absolute border border-[#FDFBFB] right-3 md:right-3 mt-2 p-4 rounded-[10px] w-72 origin-top-right divide-y divide-gray-100 z-50 bg-[#F9F7F7] shadow-lg ring-1 ring-black/5 focus:outline-none gap-3">
                    <MenuItem
                        v-for="link in links"
                        :key="link.label"
                        as="button"
                        class="flex gap-2 items-center bg-[#FAF9F9] border border-[#ECE7E7] rounded-[500px] text-left p-[10px] rounded-[5px] hover:text-white hover:bg-black ui-not-active:bg-white ui-not-active:text-black"
                        @click="handleClick(link)"
                    >
                        <component :is="link.icon" class="w-6" />
                        {{ link.label }}
                    </MenuItem>
                </MenuItems>
            </transition>
        </Menu>
    </div>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ChevronDownIcon, UserCircleIcon } from '@heroicons/vue/24/solid';
import { ArrowRightOnRectangleIcon, UserIcon } from '@heroicons/vue/24/outline';

const authStore = useAuthStore();
const router = useRouter();

const links = [
    { label: 'My Profile', to: '/profile', icon: UserIcon },
    { label: 'Sign out', action: 'signOut', icon: ArrowRightOnRectangleIcon },
];

// Methods
const handleClick = (link: { label: string, to?: string, action?: string }) => {
    const currentPage = router.currentRoute.value.fullPath;
    localStorage.setItem('previousPage', currentPage);
    
    if (link.to) {
        router.push(link.to);
    } else if (link.action === 'signOut') {
        handleSignOut();
    }
};

const handleSignOut = () => {
    authStore.clearAuth();
    // router.push('/');
};
</script>
