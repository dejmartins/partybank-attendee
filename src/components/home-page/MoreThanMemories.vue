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
                <div class="flex flex-col w-full gap-5 w-full md:w-1/2">
                    <div class="rounded-[30px] bg-cover p-6 flex-grow flex flex-col justify-center items-center"
                        v-lazy:background-image="'/defaultRemix.png'">
                        <div class="flex mr-2">
                            <div
                                class="profile-icon"
                                v-lazy:background-image="'https://res.cloudinary.com/dp1zblmv4/image/upload/v1736715527/Attendee/s7cqvch2udbrcsucre0c.jpg'"
                            ></div>
                            <div
                                class="profile-icon"
                                v-lazy:background-image="'https://res.cloudinary.com/dp1zblmv4/image/upload/v1736715527/Attendee/isx6ldmzgnzjjfs39u51.jpg'"
                                style="margin-left: -10px;"
                            ></div>
                            <div
                                class="profile-icon"
                                v-lazy:background-image="'https://res.cloudinary.com/dp1zblmv4/image/upload/v1736715528/Attendee/wuiqeqqqf3lpxmtnlgij.jpg'"
                                style="margin-left: -10px;"
                            ></div>
                            <div
                                class="profile-icon"
                                v-lazy:background-image="'https://res.cloudinary.com/dp1zblmv4/image/upload/v1736715528/Attendee/frsvilo8q9adhde91l20.jpg'"
                                style="margin-left: -10px;"
                            ></div>
                        </div>
                        <p class="mt-2 text-white font-[700] text-[55px] flex flex-col items-center leading-10 mt-8">
                            1000+ <br/>
                            <span class="text-[27px] font-[200]">partybankers</span>
                        </p>
                    </div>

                    <div class="relative bg-[#4E0916] rounded-[30px] p-6 flex flex-col flex-grow w-full justify-center items-center">
                        <div class="absolute top-0 left-0 h-[90px] w-[90px] border-b-8 border-r-8 rounded-br-full border-white"></div>
                        <div class="absolute bottom-0 right-0 h-[90px] w-[90px] border-t-8 border-l-8 rounded-tl-full border-white"></div>
                        <img 
                            src="/logo-white.png" 
                            alt="PartyBank Logo" 
                            className="w-[90px]"
                        />
                        <p class="mt-3 px-8 text-white text-center font-[200]">
                            Get ready for an unforgettable experience, and enjoy the best moments!
                        </p>
                    </div>
                </div>
        
                <div class="bg-[#F9F8F7] border border-[#CED2FE] rounded-[30px] p-3 w-full md:w-1/2 md:h-full">
                    <div class="rounded-[30px] h-56 md:h-64 bg-center"
                        v-lazy:background-image="'https://res.cloudinary.com/dp1zblmv4/image/upload/v1736715409/Attendee/zoznmcgldasnk895nicr.png'"
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

<script setup lang="ts">
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
  