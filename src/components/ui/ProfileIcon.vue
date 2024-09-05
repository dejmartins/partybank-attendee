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
                <MenuItems class="flex flex-col absolute right-3 md:right-20 mt-2 p-4 rounded-[10px] w-56 origin-top-right divide-y divide-gray-100 z-50 bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <MenuItem
                        v-for="link in links"
                        :key="link.href"
                        :href="link.href"
                        as="a"
                        class="hover:bg-blue-500 p-3 rounded-[5px] hover:text-white ui-not-active:bg-white ui-not-active:text-black"
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

const links = [
    { href: '/resetPassword', label: 'Reset Password' },
    { href: '/', label: 'Sign out' }
]
</script>