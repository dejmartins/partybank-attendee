<template>
    <div class="flex flex-col min-h-[100vh] bg-[var(--pb-c-soft-grey)] overflow-x-hidden">
        <Header additionalClasses="bg-[var(--pb-c-white)]" />

        <div class="flex-grow flex flex-col bg-[var(--pb-c-white)] overflow-y-auto mt-24 md:mx-6 rounded-t-[30px]">
            <div class="flex items-center gap-7 py-3 border-0 border-b-[3px] px-6 md:px-20 border-[var(--pb-c-soft-grey)]">
                <BackButton href="/discover" />
                <p class="text-[23px] md:text-[30px] font-[700]">Ticket Purchase</p>
            </div>

            <div class="flex-grow px-6 md:px-20 overflow-hidden">
                <TicketSummary />
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import BackButton from '@/components/buttons/BackButton.vue';
import Header from '@/components/ui/HeaderBar.vue';
import TicketSummary from '@/components/events/tickets/TicketSummary.vue';
</script>