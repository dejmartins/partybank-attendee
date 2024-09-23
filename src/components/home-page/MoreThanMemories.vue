<template>
    <section class="py-16 bg-[#FFFFFF] my-5 rounded-[20px]">
        <div class="container mx-auto px-3 md:px-6">
            <p class="text-[24px] md:text-[50px] font-[300] text-center mb-3">
            More than <span class="italic font-[700]">memories</span> created
            </p>
            <p class="text-[15px] md:text-[18px] text-center mb-12 max-w-3xl mx-auto font-[300] text-[color:var(--pb-c-black-soft)]">
            Stay in the loop with the hottest events happening daily on Partybank. Don&apos;t miss the chance to discover unforgettable experiences and exciting moments, wherever you are!
            </p>
        </div>
  
        <div class="container mx-auto px-3 md:px-6 flex flex-col justify-between items-center">
            <div class="flex flex-col md:flex-row gap-5">
                <div class="flex flex-col w-full md:w-[500px] gap-5">
                    <div class="rounded-[30px] bg-cover p-6 flex-grow flex flex-col justify-center items-center"
                        v-lazy:background-image="'/defaultRemix.png'">
                        <div class="flex mr-2">
                            <div
                                class="profile-icon"
                                v-lazy:background-image="'https://res.cloudinary.com/drddoxnsi/image/upload/v1727074881/PARTYBANK/abstral-official-B6cciwK4tZk-unsplash_jxpouo.jpg'"
                            ></div>
                            <div
                                class="profile-icon"
                                v-lazy:background-image="'https://res.cloudinary.com/drddoxnsi/image/upload/v1727074882/PARTYBANK/aliane-schwartzhaupt-2Y2NvdlSTls-unsplash_duizot.jpg'"
                                style="margin-left: -10px;"
                            ></div>
                            <div
                                class="profile-icon"
                                v-lazy:background-image="'https://res.cloudinary.com/drddoxnsi/image/upload/v1727074880/PARTYBANK/abstral-official-YmARYcXP6xc-unsplash_vvijgq.jpg'"
                                style="margin-left: -10px;"
                            ></div>
                            <div
                                class="profile-icon"
                                v-lazy:background-image="'https://res.cloudinary.com/drddoxnsi/image/upload/v1727074872/PARTYBANK/jeff-tumale-2vSYfLxQ6UE-unsplash_byxtoe.jpg'"
                                style="margin-left: -10px;"
                            ></div>
                        </div>
                        <p class="mt-2 text-white font-[700] text-[55px] flex flex-col items-center leading-10 mt-8">
                            1000+ <br/>
                            <span class="text-[27px] font-[200]">partybankers</span>
                        </p>
                    </div>

                    <div class="bg-gray-200 rounded-lg p-6 flex-grow">
                        <h3 class="text-xl font-semibold">Card 2 Title</h3>
                        <p class="mt-2">
                            Some description for the second card. More event-related content.
                        </p>
                    </div>
                </div>
        
                <div class="bg-[#F9F8F7] border border-[#CED2FE] rounded-[30px] p-3 w-full md:w-[500px] md:h-full h-full">
                    <div class="rounded-[30px] h-56 md:h-64 bg-center"
                        v-lazy:background-image="'https://res.cloudinary.com/drddoxnsi/image/upload/v1727033775/PARTYBANK/Frame_1000002156_i9yg3i.png'"
                    >
                    </div>
                    <p class="mt-5 font-[700] text-[25px]">Bringing the fun to <br/>you anywhere you are. </p>
                    <div class="relative border flex justify-between items-center border-[#4E0916] bg-[#FEEFF2] border-2 rounded-[34px] inline-block px-5 py-2 w-full md:w-[300px] my-4">
                        <p class="text-[#4E0916] font-[100]">thepartybank.com</p>
                        <fa-icon :icon="['fas', 'magnifying-glass']" style="color: #4E0916;" />
                        <CursorArrowRaysIcon class="size-10 text-[#4E0916] absolute right-9 -bottom-4" />
                    </div>
                    <p class="my-5 text-[16px] font-[200]">
                        Experience seamless discovery of the best events to attend
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { CursorArrowRaysIcon } from '@heroicons/vue/24/solid'
</script>

<style scoped>
.profile-icon {
  display: flex;
  height: 50px;
  width: 50px;
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
</style>
  