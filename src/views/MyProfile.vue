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
                            <div
                                ref="nameInput"
                                contenteditable="true"
                                class="text-[30px] font-[700] border-0 bg-transparent outline-none"
                                :class="{ 'border-gray-300': isEditing }"
                                :tabindex="isEditing ? '0' : '-1'"
                                @input="handleInput"
                                @keydown.enter.prevent="saveName"
                                @blur="saveName"
                                v-text="name"
                            ></div>
                            <button @click="toggleEditMode">
                                <PencilSquareIcon v-if="!isEditing" class="w-6 h-6 cursor-pointer" />
                                <!-- <CheckIcon v-else class="w-6 h-6 cursor-pointer text-[var(--pb-c-red)]" /> -->
                                <p v-else class="w-6 h-6 cursor-pointer text-[var(--pb-c-red)]">Save</p>
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
import Api from '@/utils/api';
import { UserCircleIcon, PencilSquareIcon, CheckIcon } from '@heroicons/vue/24/solid';
import { useAuthStore } from '@/stores/auth';
import { ref, nextTick } from 'vue';

const authStore = useAuthStore();
const { UPDATE_USER_INFO } = Api();

const isEditing = ref(false);
const name = ref(authStore.name || 'No name');
const nameInput = ref<HTMLElement | null>(null);

const toggleEditMode = () => {
  isEditing.value = !isEditing.value;

  if (isEditing.value) {
    nextTick(() => {
      nameInput.value?.focus();
    });
  }
};

const handleInput = (event: Event) => {
  name.value = (event.target as HTMLElement).innerText;
};

const saveName = async () => {
  if (name.value) {
    try {
      const response = await fetch(`${UPDATE_USER_INFO}/${authStore.decodedEmail}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authStore.token,
        },
        body: JSON.stringify({
          full_name: name.value,
          phone_number: ""
        })
      });
      
    } catch (error) {
      console.log(error);
    }
  }

  authStore.setName(name.value);
  isEditing.value = false;
};
</script>
