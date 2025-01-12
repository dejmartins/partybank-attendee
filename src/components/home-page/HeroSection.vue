<template>
    <section class="relative bg-cover bg-center min-h-screen flex flex-col justify-center text-white rounded-b-[20px]"
        :style="{ backgroundImage: `url(${bgImageSrc})` }"
      >
        <div class="absolute inset-0 bg-black opacity-70 rounded-b-[30px]"></div>
  
        <div class="z-10 text-center flex flex-col items-center mt-28 mb-10">
            <h1 class="text-3xl md:text-6xl mb-8 transform md:rotate-[-2deg]">
                <span class="font-bold inline-block">Celebrations secured,</span> <br />
                <span class="block mt-3 font-bold text-[28px] md:text-6xl">
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
                <RouterLink to="/discover" @click="trackMixpanelEvent('Buy Ticket')" class="bg-[var(--pb-c-red)] text-white font-[500] border-[2px] border-[#4E0916] p-3 rounded-[8px] px-10 font-[700]">
                    Buy Tickets
                </RouterLink>
            </div>

            <div class="organizer-core bg-[color:var(--pb-c-white)] w-[80vw] md:w-[50vw] flex flex-col md:flex-row justify-between items-center rounded-full p-3 px-8 mt-24">
                <div class="flex mr-2 profile-container mb-3 md:mb-0">
                    <div
                        class="profile-icon"
                        v-lazy:background-image="'https://res.cloudinary.com/dp1zblmv4/image/upload/v1736715299/Attendee/ny1kvwk2xkpfi4z53pnq.avif'"
                    ></div>
                    <div
                        class="profile-icon"
                        v-lazy:background-image="'https://res.cloudinary.com/dp1zblmv4/image/upload/v1736715299/Attendee/ekt5w7kwiajmmvlgskcl.avif'"
                        style="margin-left: -10px;"
                    ></div>
                    <div
                        class="profile-icon"
                        v-lazy:background-image="'https://res.cloudinary.com/dp1zblmv4/image/upload/v1736715299/Attendee/nqmt1k6wi7y9jecttwh2.avif'"
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
import { defineAsyncComponent } from 'vue';
import mixpanel from 'mixpanel-browser';

(async () => {
  mixpanel.init('YOUR_PROJECT_TOKEN');
})();

const bgImageSrc = 'https://res.cloudinary.com/dp1zblmv4/image/upload/v1736715059/Attendee/caskxyc9f6mcqxmftixk.avif';

function trackMixpanelEvent(eventName: string) {
  mixpanel.track(eventName, {
    timestamp: new Date().toISOString(),
    page: 'Landing Page',
    userRole: 'Guest'
  });
  console.log(`Mixpanel Event Tracked: ${eventName}`);
}

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
    font-size: 10px;
    text-align: center;
  }
}
</style>