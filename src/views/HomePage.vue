<template>
    <main>
        <Header />

        <div class="px-2 md:px-3 bg-[#FFF3F5]">
            <HeroSection />
            <MoreThanMemories />
            <HaveAnEvent />
        </div>
    </main>
</template>

<script setup lang="ts">
import Header from '@/components/home-page/Header.vue';
import HeroSection from '@/components/home-page/HeroSection.vue';
import MoreThanMemories from '@/components/home-page/MoreThanMemories.vue';
import HaveAnEvent from '@/components/home-page/HaveAnEvent.vue';
</script>