<template>
    <div>
        <div v-if="!isMobile" class="flex items-center border border-[#DDE0E3] h-[56px] rounded-[10px] mt-4 bg-[#F9F7F7]">
            <div class="whitespace-nowrap flex gap-[10px] p-2">
            <Button
                v-for="state in states"
                :key="state"
                :action="state"
                :disabled="false"
                @click="selectState(state)"
                :additionalClasses="`py-[4px] px-[9px] text-sm md:text-lg md:py-[7px] md:px-[18px] border rounded-[10px] 
                ${state === selectedState ? 'bg-[var(--pb-c-red)] border-[#4E0916] border-2 text-white' : 'text-black'}`"
            />
            </div>
        </div>
  
        <div v-else class="relative mt-4">
            <Menu>
                <MenuButton class="flex justify-between items-center border border-[#DDE0E3] h-[56px] w-full rounded-[10px] px-4 bg-[#F9F7F7]">
                    <span>{{ selectedState }}</span>
                    <ChevronDownIcon class="w-5 h-5" />
                </MenuButton>
                <transition
                    enter-active-class="transition duration-150 ease-out"
                    enter-from-class="transform scale-95 opacity-0"
                    enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-75 ease-out"
                    leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0"
                >
                    <MenuItems class="absolute z-50 w-full mt-2 origin-top-right bg-white shadow-lg rounded-[10px] focus:outline-none">
                    <MenuItem
                        v-for="state in states"
                        :key="state"
                        as="div"
                        class="cursor-pointer hover:bg-gray-100 px-4 py-2 text-left text-black"
                        @click="selectState(state)">
                        {{ state }}
                    </MenuItem>
                    </MenuItems>
                </transition>
            </Menu>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, watchEffect, onMounted, onUnmounted } from 'vue';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import Button from '@/components/buttons/Button.vue';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';

// Props
const props = defineProps({
    states: {
        type: Array as () => string[],
        required: true,
    },
    modelValue: {
        type: String,
        required: true,
    },
});

const emit = defineEmits(['update:modelValue']);

const selectedState = ref(props.modelValue);

watchEffect(() => {
    selectedState.value = props.modelValue;
});

const isMobile = ref(window.innerWidth <= 768);

const checkMobileScreen = () => {
    isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
    window.addEventListener('resize', checkMobileScreen);
});

onUnmounted(() => {
    window.removeEventListener('resize', checkMobileScreen);
});

// Methods
const selectState = (state: string) => {
    selectedState.value = state;
    emit('update:modelValue', state);
};
</script>
