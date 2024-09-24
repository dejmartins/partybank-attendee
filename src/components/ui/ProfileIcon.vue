<template>
    <div>
        <Menu>
            <MenuButton>
                <div class="flex items-center justify-center rounded-full h-9 w-9 bg-[#D1B44E] cursor-pointer">
                    <p class="font-[700] text-[20px] text-white">D</p>
                </div>
            </MenuButton>
            <transition
                enter-active-class="transition duration-150 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-out"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0" >
                <MenuItems class="flex flex-col absolute right-3 md:right-20 mt-2 p-4 rounded-[10px] w-72 origin-top-right divide-y divide-gray-100 z-50 bg-white shadow-lg ring-1 ring-black/5 focus:outline-none gap-3">
                    <MenuItem
                        v-for="link in links"
                        :key="link.label"
                        as="button"
                        class="bg-[#EDF1FF] rounded-[500px] text-[var(--pb-c-blue)] text-center py-[10px] rounded-[5px] hover:text-white hover:bg-[var(--pb-c-blue)] ui-not-active:bg-white ui-not-active:text-black"
                        @click="handleSignOut"
                    >
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

const authStore = useAuthStore();

const links = [
    { label: 'Sign out' }
];

// Methods
const handleSignOut = () => {
    authStore.clearAuth();
};
</script>
