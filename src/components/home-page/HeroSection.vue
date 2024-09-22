<template>
    <section class="relative bg-cover bg-center h-screen flex flex-col justify-center items-center text-white rounded-b-[20px]"
        :style="{ backgroundImage: `url(${bgImageSrc})` }"
      >
        <div class="absolute inset-0 bg-black opacity-80 rounded-b-[30px]"></div>
  
        <div class="relative z-10 text-center flex flex-col items-center">
            <h1 class="text-4xl md:text-6xl mb-8 transform rotate-[-1deg]">
                <span class="font-bold inline-block">Celebrations secured,</span> <br />
                <span class="block mt-3 font-bold text-3xl md:text-6xl">
                    Best 
                    <span 
                        class="relative inline-block text-[var(--pb-c-red)] italic" 
                        style="box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); background: linear-gradient(to right, #E6787800 0%, #CD284366 40%, #80434300 100%); border-radius: 4px;">
                        memories
                    </span> 
                    deposited
                </span>
            </h1>
  
            <p class="text-lg md:text-xl mb-12 max-w-lg mx-auto">
                Where every ticket holds a celebration
            </p>
  
            <div class="flex gap-4">
                <RouterLink to="/discover" class="bg-[var(--pb-c-red)] text-white font-[500] border-[2px] border-[#4E0916] p-3 rounded-[8px] px-10 font-[700]">
                Explore Events
                </RouterLink>
            </div>

            <div class="organizer-core bg-[color:var(--pb-c-white)] w-[50vw] flex justify-between items-center rounded-full p-3 px-8 mt-16">
                <div class="flex mr-2 profile-container">
                    <div
                        class="profile-icon"
                        v-lazy:background-image="'https://res.cloudinary.com/drddoxnsi/image/upload/v1718653091/PARTYBANK/EUPHORIA_ASABA_drzuhq.avif'"
                    ></div>
                    <div
                        class="profile-icon"
                        v-lazy:background-image="'https://res.cloudinary.com/drddoxnsi/image/upload/v1718653098/PARTYBANK/Rave_Experience_Port-Harcourt_c5redm.avif'"
                        style="margin-left: -10px;"
                    ></div>
                    <div
                        class="profile-icon"
                        v-lazy:background-image="'https://res.cloudinary.com/drddoxnsi/image/upload/v1718653097/PARTYBANK/euphoria_jds29k_o4spxf.avif'"
                        style="margin-left: -10px;"
                    ></div>
                </div>

                <p class="text-[color:var(--pb-c-black-soft)]">
                    Experience seamless access to your favorite event tickets, nationwide.
                </p>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

const bgImageSrc = 'https://res.cloudinary.com/drddoxnsi/image/upload/v1718653091/PARTYBANK/attendee-landing-bg_pbptyw.avif';
</script>

<style scoped>
.profile-icon {
  display: flex;
  height: 35px;
  width: 35px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 2px solid var(--pb-c-white);
  background-position: center;
  background-size: cover;
  color: var(--pb-c-white);
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  letter-spacing: 0%;
  font-size: 13px;
}

@media (max-width: 765px) {

  .organizer-core {
    font-weight: 100;
    display: flex;
    flex-direction: column;
    width: 80vw;
    font-size: 10px;
    text-align: center;
  }
}
</style>