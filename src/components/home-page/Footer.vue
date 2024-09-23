<template>
    <footer class="bg-[#1D0509] text-[#FBD1D9] mt-10">
        <div class="p-12 container mx-auto flex flex-col md:flex-row justify-between gap-12 text-center md:text-left">
            <div class="flex flex-col items-center md:items-start">
              <div class="flex flex-col items-center md:items-start mb-2">
                <BuildingOffice2Icon class="text-[var(--pb-c-red)] w-7 mb-2" />
                <h4 class="text-xl font-bold">Company</h4>
              </div>
              <ul class="space-y-2">
                <li><a href="#" class="hover:text-white">About Us</a></li>
                <li><a href="#" class="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" class="hover:text-white">Terms and Conditions</a></li>
              </ul>
            </div>

            <div class="flex flex-col items-center md:items-start">
              <div class="flex flex-col items-center md:items-start mb-2">
                <CircleStackIcon class="text-[var(--pb-c-red)] w-7 mb-2" />
                <h4 class="text-xl font-bold">Products</h4>
              </div>
              <ul class="space-y-2">
                <li><a href="https://organizer.thepartybank.com/" class="hover:text-white">Create Event</a></li>
                <li><a href="#" class="hover:text-white">Attend Event</a></li>
              </ul>
            </div>

            <div class="flex flex-col items-center md:items-start">
              <div class="flex flex-col items-center md:items-start mb-2">
                <QuestionMarkCircleIcon class="text-[var(--pb-c-red)] w-7 mb-2" />
                <h4 class="text-xl font-bold">Support</h4>
              </div>
              <ul class="space-y-2">
                <li><a href="#" class="hover:text-white">Terms and Conditions</a></li>
                <li><a href="mailto:partybankexperience@gmail.com" class="hover:text-white">Email Us</a></li>
              </ul>
            </div>
        </div>

        <div>
            <div class="w-full">
              <div
                class="h-[100px] w-full"
                :style="{
                  background: 'linear-gradient(to top, #830F2500, #E91B411A)'
                }"
              ></div>
              <div
                class="h-[100px] w-full"
                :style="{
                  background: 'linear-gradient(to top, #6D0F8300, #910FEA1A)'
                }"
              ></div>
              <div
                class="h-[100px] w-full"
                :style="{
                  background: 'linear-gradient(to top, #835E0F00, #EA7E0F1A)'
                }"
              ></div>
            </div>

            <div class="flex justify-center -mt-56">
              <img 
                src="/logo-remix.png" 
                alt="PartyBank Logo" 
                className="w-[300px] md:w-[600px]"
              />
            </div>
        </div>

        <div className="mt-16 text-center text-sm pb-12">
            © 2024 PartyBank. All rights reserved.
        </div>
        </footer>
</template>