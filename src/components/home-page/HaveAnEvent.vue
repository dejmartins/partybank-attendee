<template>
    <section class="py-16 bg-[#FFFFFF] rounded-[20px] border border-[#F6F2F2] mt-10">
      <div class="container mx-auto flex flex-col md:flex-row items-center gap-8 px-6">
        <div class="md:w-1/2">
          <h1 class="text-[50px] md:text-[70px] font-[300] mb-4 leading-tight">Have an <br /><span class="font-[700] italic">event?</span></h1>
          <p class="mb-6 text-lg font-[200]">
            Effortlessly <span class="font-bold italic">organize, create, and manage</span> all your events in one place. With our seamless event creation platform, designed specifically for event organizers, you can plan, track, and bring your vision to life — all in just a few clicks.
          </p>
          <a href="https://organizer.thepartybank.com/" class="">
            <button class="bg-[var(--pb-c-red)] text-white border-[2px] border-[#4E0916] p-3 rounded-[8px] px-10 font-[700] mb-10 md:mb-0">
              Create Event
            </button>
          </a>
        </div>
        
        <div class="md:w-1/2 rounded-[35px] p-5 bg-white"
            style="box-shadow: 0px 0px 70px 30px rgba(254, 229, 229, 0.9);"
        >
          <img
            :src="'https://res.cloudinary.com/drddoxnsi/image/upload/v1727098516/PARTYBANK/Frame_88_qg7w2m.png'"
            alt="Event creation"
            class="w-full"
          />
        </div>
      </div>
    </section>
</template>
  
  