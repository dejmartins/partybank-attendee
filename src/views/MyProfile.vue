<template>
    <div class="flex flex-col min-h-[100vh] bg-[var(--pb-c-soft-grey)] overflow-x-hidden">
        <Header additionalClasses="bg-[var(--pb-c-white)]" />
      
        <div class="flex-grow flex flex-col bg-[var(--pb-c-white)] overflow-y-auto mt-24 md:mx-6 rounded-t-[30px]">
            <div class="flex items-center gap-7 py-3 border-0 border-b-[3px] px-6 md:px-20 border-[var(--pb-c-soft-grey)]">
                <BackButton href="/" />
                <p class="text-[23px] md:text-[30px] font-[700]">My Profile</p>
            </div>
            
            <div class="flex-grow px-6 md:px-20 mt-5">
                <div class="flex items-center gap-5">
                    <div class="relative min-w-20 min-h-20 md:min-w-28 md:min-h-28 rounded-full overflow-hidden">
                        <div class="absolute inset-0  bg-gradient-to-b from-[#E91B41] to-[#9E3AC3]"></div>
                        <div class="absolute inset-[10px] md:inset-[12px] bg-white rounded-full flex items-center justify-center">
                            <UserCircleIcon class="w-20 md:w-28 stroke-black stroke-1" />
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center gap-2">
                            <input
                                v-if="isEditing"
                                v-model="name"
                                class="text-lg font-[500] rounded-none border-0 border-b-2 border-gray-300 focus:outline-none focus:border-[#E91B41]"
                            />
                            <p v-else class="font-[700] text-[30px]">
                                {{ name ? name : 'No name' }}
                            </p>
                            <button @click="toggleEditMode">
                                <PencilSquareIcon v-if="!isEditing" class="w-6 h-6 cursor-pointer" />
                                <CheckIcon v-else class="w-6 h-6 cursor-pointer text-[var(--pb-c-red)]" @click="saveName" />
                            </button>
                        </div>
                        <p class="font-[300] text-[16px] md:text-[20px]">{{ authStore.decodedEmail }}</p>
                    </div>
                </div>

                <hr class="my-8">

                <div>
                    <p class="text-[23px] md:text-[25px] font-[700]">My Activities</p>

                    <div class="w-full flex items-center justify-center mt-8">
                        <p>No Activities yet!</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import BackButton from '@/components/buttons/BackButton.vue';
import Header from '@/components/ui/HeaderBar.vue';
import { UserCircleIcon, PencilSquareIcon, CheckIcon } from '@heroicons/vue/24/solid';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';

const authStore = useAuthStore();

const isEditing = ref(false);
const name = ref(authStore.name || '');

const toggleEditMode = () => {
  isEditing.value = !isEditing.value;
};

const saveName = () => {
  if (name.value) {
    authStore.name = name.value;
  }
  isEditing.value = false;
};
</script>
  