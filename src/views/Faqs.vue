<template>
    <main>
      <Header />
  
      <div class="relative pb-3 mb-56">
        <!-- FAQ Header -->
        <div
          class="h-[400px] bg-cover bg-center flex items-center justify-center flex-col px-3"
          style="background-image: url('/faq.svg');"
        >
          <div class="flex justify-center">
            <p class="border inline-block border border-[#FBD1D9] rounded-[20px] bg-[#FBD1D933] mb-10 p-2 px-3 text-white font-[600]">
              FAQs
            </p>
          </div>
          <p class="text-white text-2xl md:text-4xl font-bold">
            Every question has an answer
          </p>
          <p class="text-white text-lg mt-3 text-center leading-6">
            Have questions related to Partybank, we are here to provide the
            answers you need.
          </p>
        </div>
  
        <!-- FAQ List -->
        <div class="flex flex-col items-center mt-16 px-5">
          <h1 class="text-2xl md:text-4xl font-bold">
            Popular Questions and Answers
          </h1>
          <p class="max-w-[800px] text-center mt-2">
            Everything you need to know about Partybank product and how it works.
            If you need further help or assistance, or can&apos;t find a related
            question and answer here, please reach our customer channel.
          </p>
  
          <div class="w-full max-w-[800px] mt-16">
            <div
              v-for="(faq, index) in faqList"
              :key="index"
              class="border-b-4 border-[#080D18] py-3"
            >
              <div
                class="flex justify-between items-center cursor-pointer my-3"
                @click="toggleQuestion(index)"
              >
                <p class="text-xl font-[700]">{{ faq.question }}</p>
                <button class="text-xl">
                  <div class="p-2 rounded-[10px] bg-[#F3F5F5]">
                    <MinusIcon v-if="openQuestion === index" class="w-4 stroke-2" />
                    <PlusIcon v-else class="w-4 stroke-2" />
                  </div>
                </button>
              </div>
  
              <div v-if="openQuestion === index" class="border rounded-[10px] p-4 my-2">
                <p class="text-gray-600">{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <Footer />
    </main>
</template>
  
<script setup lang="ts">
import { ref } from "vue";
import Header from '@/components/home-page/Header.vue';
import Footer from '@/components/home-page/Footer.vue';
import { MinusIcon, PlusIcon } from "@heroicons/vue/24/outline";
import { faqList } from "@/utils/helpers";

const openQuestion = ref<number | null>(null);

const toggleQuestion = (index: number) => {
    openQuestion.value = openQuestion.value === index ? null : index;
};
</script>
  