<!-- <template>
  <div class="relative w-full h-screen flex flex-col justify-center items-center p-10 md:p-20 overflow-hidden">
    <div class="w-full flex px-10 pt-10 justify-center absolute top-0 md:px-20">
      <div class="border top-10 w-full bg-[color:var(--pb-c-white)] flex justify-between items-center rounded-full p-2 px-7">
        <img class="h-10 z-50 cursor-pointer" src="@/assets/images/PartyBank.png" alt="Partybank Logo" />
      </div>
    </div>

    <div class="w-full flex flex-col justify-between items-center mt-8 md:flex-row">
      <div class="z-50 flex flex-col items-center md:mr-10 md:block">
        <img class="hidden md:block" src="@/assets/images/Peeps.png" alt="Image with text - Peeps... Party Place" />
        <img class="block md:hidden" src="@/assets/images/Peeps-Mobile.png" alt="Image with text - Peeps... Party Place" />
        <p class="text-lg my-5 text-center leading-5 md:text-left">Welcome to the one-stop spot for discovering the hottest events. <br class="hidden xl:block"/> Unlock the gateway to an epic experience. </p>
        <Button 
          :disabled="isDisabled" 
          action="Discover Events" 
          @click="discover" 
          additionalClasses="bg-[#910FEA] rounded-[13px] shadow-lg hover:shadow-xl cursor-pointer mt-7 md:mt-0"
        >
          <fa-icon :icon="['far', 'calendar-days']" style="color: #ffffff" />
        </Button>
      </div>
      
      <div class="z-50 h-[600px] hidden lg:block">
        <img class="xl:h-full" src="@/assets/images/collage.png" alt="Image collage of parties" />
      </div>

      <div>
        <img class="absolute z-20 bottom-[20%] md:right-[-30rem] lg:right-[-19rem] xl:right-0 xl:bottom-2 xl:h-[650px]" src="@/assets/images/Ellipse1.png" alt="Ellipse 1" />
        <img class="absolute bottom-[18%] md:bottom-[30%] md:right-[10rem] lg:right-[25rem] xl:right-[35rem] xl:bottom-[7rem]" src="@/assets/images/Ellipse2.png" alt="Image with text - Peeps... Party Place" />
        <img class="absolute bottom-[65%] right-[3rem] md:right-[17rem] lg:right-[27rem] xl:right-[39rem] xl:bottom-[37rem]" src="@/assets/images/Ellipse3.png" alt="Image with text - Peeps... Party Place" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/buttons/ButtonComponent.vue'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isDisabled = ref(false)
const router = useRouter()

const discover = () => {
  isDisabled.value = true
  router.push('/discover')
}
</script> -->

<template>
  <div class="relative w-full h-screen flex flex-col justify-center items-center p-10 md:p-20 overflow-hidden">
    <div class="w-full flex px-10 pt-10 justify-center absolute top-0 md:px-20">
      <div class="border top-10 w-full bg-[color:var(--pb-c-white)] flex justify-between items-center rounded-full p-2 px-7">
        <img class="h-10 z-50 cursor-pointer" src="@/assets/images/PartyBank.png" alt="Partybank Logo" />
      </div>
    </div>

    <div class="w-full flex flex-col justify-between items-center mt-8 md:flex-row">
      <div class="z-50 flex flex-col items-center md:mr-10 md:block">
        <img class="hidden md:block" src="@/assets/images/Peeps.png" alt="Image with text - Peeps... Party Place" />
        <img class="block md:hidden" src="@/assets/images/Peeps-Mobile.png" alt="Image with text - Peeps... Party Place" />
        <p class="text-lg my-5 text-center leading-5 md:text-left">Welcome to the one-stop spot for discovering the hottest events. <br class="hidden xl:block"/> Unlock the gateway to an epic experience. </p>
        <Button 
          :disabled="isDisabled" 
          action="Discover Events" 
          @click="discover" 
          additionalClasses="bg-[#910FEA] rounded-[13px] shadow-lg hover:shadow-xl cursor-pointer mt-7 md:mt-0"
        >
          <fa-icon :icon="['far', 'calendar-days']" style="color: #ffffff" />
        </Button>
      </div>
      
      <div class="z-50 h-[600px] hidden lg:block">
        <img class="xl:h-full" src="@/assets/images/collage.png" alt="Image collage of parties" />
      </div>

      <div>
        <img class="absolute z-20 bottom-[20%] md:right-[-30rem] lg:right-[-19rem] xl:right-0 xl:bottom-2 xl:h-[650px]" src="@/assets/images/Ellipse1.png" alt="Ellipse 1" />
        <img class="absolute bottom-[18%] md:bottom-[30%] md:right-[10rem] lg:right-[25rem] xl:right-[35rem] xl:bottom-[7rem]" src="@/assets/images/Ellipse2.png" alt="Image with text - Peeps... Party Place" />
        <img class="absolute bottom-[65%] right-[3rem] md:right-[17rem] lg:right-[27rem] xl:right-[39rem] xl:bottom-[37rem]" src="@/assets/images/Ellipse3.png" alt="Image with text - Peeps... Party Place" />
      </div>
    </div>

    <!-- Add bubbles container -->
    <div class="bubbles-container">
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/buttons/ButtonComponent.vue'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isDisabled = ref(false)
const router = useRouter()

const discover = () => {
  isDisabled.value = true
  router.push('/discover')
}
</script>

<style scoped>
.bubbles-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.bubble {
  position: absolute;
  bottom: -100px;
  width: 40px;
  height: 40px;
  background-color: rgba(173, 216, 230, 0.7);
  border-radius: 50%;
  opacity: 0.6;
  animation: rise 10s infinite ease-in-out;
}

.bubble:nth-child(2) {
  width: 60px;
  height: 60px;
  left: 20%;
  animation-duration: 8s;
}

.bubble:nth-child(3) {
  width: 50px;
  height: 50px;
  left: 40%;
  animation-duration: 12s;
}

.bubble:nth-child(4) {
  width: 70px;
  height: 70px;
  left: 60%;
  animation-duration: 14s;
}

.bubble:nth-child(5) {
  width: 30px;
  height: 30px;
  left: 80%;
  animation-duration: 16s;
}

@keyframes rise {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0.6;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(-100vh) scale(1.2);
    opacity: 0;
  }
}

.styled-text {
  font-family: 'YourFontFamily', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

</style>