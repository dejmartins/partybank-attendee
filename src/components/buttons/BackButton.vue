<template>
     <RouterLink
        class="border cursor-pointer bg-[#F3F5F5] px-[10px] py-[5px] rounded-[15px]"
        :to="href"
    >
        <ArrowLongLeftIcon class="w-[20px] h-[30px] stroke-2"/>
     </RouterLink>
</template>

<script setup lang="ts">
import { ArrowLongLeftIcon } from '@heroicons/vue/24/solid';
import { RouterLink } from 'vue-router';

defineProps<{
    href: string
}>()
</script>
