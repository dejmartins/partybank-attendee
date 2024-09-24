<template>
  <main class="flex flex-col border-[var(--pb-c-soft-grey)] rounded-t-[40px]">
    <div class="flex items-center gap-7 py-3 border-0 border-b-[3px] px-6 md:px-20 border-[var(--pb-c-soft-grey)]">
      <BackButton href="/" />
      <p class="text-[23px] md:text-[30px] font-[700]">Discover Events</p>
    </div>

    <div class="px-6 md:px-20">
      <StateDropDown 
        :states="states"
        v-model="selectedState"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import BackButton from '@/components/buttons/BackButton.vue';
import StateDropDown from '@/components/events/StateDropDown.vue';
import { ref } from 'vue';

const selectedState = ref('Lagos');
const states = ref(['Lagos', 'Rivers', 'Edo', 'Delta']);
</script>
