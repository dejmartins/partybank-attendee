<template>
    <main>
      <Header />
  
      <div class="relative pb-3 mb-20">
        <div class="relative flex items-center justify-center flex-col px-6 bg-[#FFF9FA]">
          <div class="flex justify-center mt-36">
            <p class="border inline-block border border-[#FBD1D9] rounded-[20px] bg-[#FBD1D933] p-2 px-3 font-[600]">
              About Us
            </p>
          </div>
  
          <p class="text-transparent bg-clip-text bg-gradient-to-r from-[#E91B41] to-[#9E3AC3] font-[400] text-[clamp(30px,10vw,150px)] mt-2">
            thepartybank
          </p>
  
          <p class="text-black text-lg mt-3 text-center leading-6 max-w-[1000px] mx-2">
            At Partybank, we&apos;re all about enhancing the way events like parties, festivals, concerts, and large gatherings are organized and experienced.
          </p>
          <p class="text-black text-lg mt-3 text-center leading-6 max-w-[900px] pb-16 mx-2">
            We are here to make every event more memorable by providing the tools to create smooth, hassle-free experiences for both organizers and guests.
          </p>
  
          <div class="absolute bottom-0 w-full h-2 mt-6 bg-gradient-to-r from-[#E91B41] to-[#9E3AC3]"></div>
        </div>
  
        <div class="container mx-auto px-3 md:px-6 mt-20">
          <div class="flex w-full flex-col md:flex-row gap-5">
            <div
              class="bg-[#F9F8F7] bg-cover rounded-[30px] p-3 w-full md:w-1/2 h-[500px] md:h-[700px]"
              style="background-image: url('https://res.cloudinary.com/drddoxnsi/image/upload/v1727074882/PARTYBANK/aliane-schwartzhaupt-2Y2NvdlSTls-unsplash_duizot.jpg');"
            ></div>
            <div class="flex flex-col gap-5 w-full md:w-1/2 h-[500px] md:h-[700px]">
              <div
                class="rounded-[30px] bg-cover bg-[#4E0916] p-6 flex-grow flex flex-col justify-center items-center"
                style="background-image: url('https://res.cloudinary.com/drddoxnsi/image/upload/v1727074880/PARTYBANK/abstral-official-YmARYcXP6xc-unsplash_vvijgq.jpg');"
              ></div>
              <div
                class="relative bg-[#4E0916] bg-cover rounded-[30px] p-6 flex flex-col flex-grow w-full justify-center items-center"
                style="background-image: url('https://res.cloudinary.com/drddoxnsi/image/upload/v1727074872/PARTYBANK/jeff-tumale-2vSYfLxQ6UE-unsplash_byxtoe.jpg'); background-position: center;"
              ></div>
            </div>
          </div>
        </div>
  
        <!-- Mission and Vision -->
        <div class="container mx-auto px-3 md:px-6 flex flex-col md:flex-row justify-between items-center gap-5 my-20">
          <div class="relative p-10 w-full md:w-1/2 bg-[#FFF9FA] md:h-[420px] lg:h-[350px]">
            <h2 class="absolute top-0 font-[400] text-[30px] md:text-[50px] md:text-[60px] bg-[#FBD1D933] left-0 px-10 py-2">
              Vision
            </h2>
            <p class="w-full lg:w-[80%] mt-14 md:mt-24">
              Our vision is to enhance the way people experience live entertainment through technology.
            </p>
            <div class="absolute left-0 bottom-0 w-full h-2 mt-6 bg-gradient-to-r from-[#E91B41] to-[#9E3AC3]"></div>
          </div>
          <div class="relative p-10 w-full md:w-1/2 bg-[#FFF9FA] md:h-[420px] lg:h-[350px]">
            <h2 class="absolute top-0 font-[400] text-[30px] md:text-[50px] md:text-[60px] bg-[#FBD1D933] left-0 px-10 py-2">
              Mission
            </h2>
            <p class="w-full lg:w-[80%] mt-14 md:mt-24">
              Our mission is to use technology to improve the way people experience live events, such as parties, festivals, and concerts.
            </p>
            <div class="absolute left-0 bottom-0 w-full h-2 mt-6 bg-gradient-to-r from-[#9E3AC3] to-[#E91B41]"></div>
          </div>
        </div>
  
        <!-- What we do -->
        <div class="container mx-auto px-3 md:px-6 flex flex-col justify-center items-center gap-6 my-5 px-6">
          <p class="font-[400] text-[clamp(30px,5vw,150px)]">
            What we do
          </p>
          <p class="mx-2">
            Partybank is designed for organizers of live entertainment events—whether it&apos;s a high-energy party, a massive music festival, or a packed concert.
          </p>
        </div>
  
        <div
          class="relative relative gap-16 bg-cover md:gap-10 px-6 py-20 z-50 px-16 w-full flex flex-col items-center justify-center mt-10 min-h-[800px] md:min-h-[500px]"
          style="background-image: url('/faq.svg');"
        >
          <!-- Toggle Buttons -->
          <div class="absolute top-16 col-span-1 md:col-span-4 flex justify-center space-x-4">
            <button
              @click="setIsOrganizer(true)"
              :class="{'border border-[#FBD1D9]': isOrganizer, 'border-none': !isOrganizer}"
              class="border inline-block rounded-[20px] p-2 px-3 text-white font-[600] bg-[#FBD1D933]"
            >
              For Organizers
            </button>
            <button
              @click="setIsOrganizer(false)"
              :class="{'border border-[#FBD1D9]': !isOrganizer, 'border-none': isOrganizer}"
              class="border inline-block rounded-[20px] p-2 px-3 text-white font-[600] bg-[#FBD1D933]"
            >
              For Attendees
            </button>
          </div>
  
          <!-- Content for Organizers -->
          <div v-if="isOrganizer" class="mt-16 grid gap-cols-1 md:grid-cols-2 gap-12 md:gap-6 gap-x-20 justify-center text-white">
            <div class="relative w-72 mx-auto" v-for="(text, index) in organizerText" :key="index">
              <p class="font-[700] mb-2">{{ text.title }}</p>
              <p>{{ text.description }}</p>
            </div>
          </div>
  
          <!-- Content for Attendees -->
          <div v-else class="mt-16 grid gap-cols-1 md:grid-cols-2 gap-12 md:gap-6 gap-x-20 justify-center text-white">
            <div class="relative w-72 mx-auto" v-for="(text, index) in attendeeText" :key="index">
              <p class="font-[700] mb-2">{{ text.title }}</p>
              <p>{{ text.description }}</p>
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
  
  const isOrganizer = ref(true);
  const setIsOrganizer = (value) => (isOrganizer.value = value);
  
  const organizerText = [
    {
      title: "Effortless Event Management",
      description: "With Partybank, creating and managing your event is fast and straightforward."
    },
    {
      title: "Real-Time Insights",
      description: "Track ticket sales, attendee engagement, and performance analytics in real time."
    },
    {
      title: "Quick Ticket Validation",
      description: "Use our web app to scan and validate tickets at your event, ensuring quick entry."
    },
    {
      title: "Flexible Payouts",
      description: "Request payouts at any time, or receive automatic payments shortly after."
    }
  ];
  
  const attendeeText = [
    {
      title: "Discover Events",
      description: "Easily find and explore events near you, tailored to your interests."
    },
    {
      title: "Seamless Ticket Purchase",
      description: "Purchase tickets securely and effortlessly through our platform."
    },
    {
      title: "Quick Entry",
      description: "Present your digital ticket and get in quickly with fast validation."
    },
    {
      title: "Stay Updated",
      description: "Get real-time updates and notifications for events you're attending."
    }
  ];
  </script>
  