<template>
    <button 
      @click="navigateBack" 
      class="border cursor-pointer bg-[#F3F5F5] px-[10px] py-[5px] rounded-[15px]"
    >
      <ArrowLongLeftIcon class="w-[20px] h-[30px] stroke-2"/>
    </button>
</template>
  
<script setup lang="ts">
import { ArrowLongLeftIcon } from '@heroicons/vue/24/solid';
import { useRouter } from 'vue-router';

const props = defineProps<{
    href: string
}>();

const router = useRouter();

const navigateBack = () => {
    const previousPage = localStorage.getItem('previousPage');

    if (previousPage) {
        router.push(previousPage); 
        localStorage.removeItem('previousPage');
    } else {
        router.push(props.href);
    }
};
</script>
