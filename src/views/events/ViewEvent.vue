<template>
    <main class="fixed w-full flex flex-col h-screen border-[var(--pb-c-soft-grey)] rounded-t-[40px]">
      <div class="flex items-center gap-7 py-3 border-0 border-b-[3px] px-6 md:px-20 border-[var(--pb-c-soft-grey)]">
        <BackButton href="/discover" />
        <p class="text-[23px] md:text-[30px] font-[700]">View Event</p>
      </div>
  
      <div class="flex-grow px-6 md:px-20 overflow-hidden">
        <p>{{ eventReference }}</p>
      </div>
    </main>
</template>

<script setup lang="ts">
import BackButton from '@/components/buttons/BackButton.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const eventReference = route.params.eventReference;
</script>