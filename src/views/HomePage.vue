<template>
    <main>
        <Header />

        <div class="px-2 md:px-3 bg-[#FFF3F5] pb-10">
            <HeroSection />
            <MoreThanMemories />
            <HaveAnEvent />
        </div>

        <Footer />
    </main>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const Header = defineAsyncComponent(() => import('@/components/home-page/Header.vue'));
const HeroSection = defineAsyncComponent(() => import('@/components/home-page/HeroSection.vue'));
const MoreThanMemories = defineAsyncComponent(() => import('@/components/home-page/MoreThanMemories.vue'));
const HaveAnEvent = defineAsyncComponent(() => import('@/components/home-page/HaveAnEvent.vue'));
const Footer = defineAsyncComponent(() => import('@/components/home-page/Footer.vue'));
</script>