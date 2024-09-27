<template>
  <div class="landing-container" :style="{ backgroundImage: isBgLoaded ? `url(${bgImageSrc})` : '' }">
    <div class="flex flex-col items-center">
      <div
        class="action-call bg-[color:var(--pb-c-white)] w-[70vw] flex justify-between items-center rounded-full p-5 px-10"
      >
        <img class="logo h-10 z-50 cursor-pointer" src="@/assets/logo.svg" alt="Partybank Logo" />
        <div class="flex gap-2">
          <RoundedButton :disabled="isDisabled" action="Sign In" @click="showSignIn" class="flex w-28 justify-center font-[700] bg-[--pb-c-bright-blue] text-[var(--pb-c-blue)]"></RoundedButton>
        </div>
      </div>

      <div class="organizer-cue mt-24 text-center" :class="{ 'text-black': !isBgLoaded, 'text-white': isBgLoaded }">
        <h1 class="font-extrabold text-[50px] leading-tight">
          Celebrations Secured<br />
          <span class="font-extrabold">Best Memories Deposited</span>
        </h1>
        <p class="font-semibold text-[18px] my-5">Where Every Ticket Holds A Celebration</p>
      </div>

      <RoundedButton :disabled="isDisabled" action="Discover Events" @click="discover" class="pulse-animation my-8 w-[200px] h-[50px] flex justify-center font-[700] bg-[--pb-c-blue] text-[color:var(--pb-c-white)]">
        <fa-icon :icon="['far', 'calendar-days']" style="color: #ffffff" />
      </RoundedButton>

      <div
        class="organizer-core bg-[color:var(--pb-c-white)] w-[50vw] flex justify-between items-center rounded-full p-3 px-8 mt-4"
      >
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

    <AuthModal 
        v-if="showModal" 
        @close="closeModal"
        @email-sent="emailModalToggle"
    />

    <EmailCheck v-if="showEmailSentModal" @close="emailModalToggle" />
    
  </div>
</template>

<script setup lang="ts">
import RoundedButton from '@/components/buttons/RoundedButton.vue';
import AuthModal from '@/views/auth/SignInModal.vue';
import EmailCheck from '@/components/auth/CheckEmailModal.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const isDisabled = ref(false);
const isBgLoaded = ref(false);
const showModal = ref(false);
const showEmailSentModal = ref(false);
const router = useRouter();

const bgImageSrc = 'https://res.cloudinary.com/drddoxnsi/image/upload/v1718653091/PARTYBANK/attendee-landing-bg_pbptyw.avif';

// Methods
const discover = () => {
  isDisabled.value = true;
  router.push('/discover');
};

const showSignIn = () => {
  showModal.value = true;
};

const handleBgLoad = () => {
  isBgLoaded.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const emailModalToggle = () => {
  showEmailSentModal.value = !showEmailSentModal.value;
};

onMounted(() => {
  const bgImage = new Image();
  bgImage.src = bgImageSrc;
  bgImage.onload = handleBgLoad;
});
</script>

<style scoped>
.landing-container {
  height: 100vh;
  width: 100vw;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

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

.pulse-animation {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.text-black {
  color: black;
}

.text-white {
  color: white;
}

@media (max-width: 765px) {
  .logo {
    height: 2rem;
  }

  .action-call {
    width: 80vw;
    padding: 15px 25px;
  }

  h1,
  span {
    font-size: 30px;
  }

  p {
    font-size: 15px;
  }

  .organizer-core {
    font-weight: 100;
    display: flex;
    flex-direction: column;
    width: 80vw;
    font-size: 10px;
    text-align: center;
  }

  .profile-container {
    margin-bottom: 5px;
  }
}
</style>
