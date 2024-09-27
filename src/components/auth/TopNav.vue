<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
    <div className="bg-[var(--pb-c-white)] h-[64px] w-full px-[24px] py-[16px]">
        <RouterLink to="/">
            <img
                src="/pb-logo.png"
                class="w-[65px]"
                alt="Partybank Logo"
            />
        </RouterLink>
    </div>
</template>