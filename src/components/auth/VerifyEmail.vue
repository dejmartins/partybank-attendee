<template>
<Transition show="isOpen" as="div" class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen text-center">
    <Transition.Child
        as="div"
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        class="fixed inset-0 bg-black md:opacity-75 opacity-85 transition-opacity"
        aria-hidden="true"
    >
    </Transition.Child>

    <div class="absolute inset-0 opacity-75"></div>

    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

    <Transition.Child
        as="div"
        enter="ease-out duration-300"
        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enterTo="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        class="inline-block align-bottom rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
    >
        <div class="flex flex-col items-center text-white p-10">
        <img src="/loader.png" alt="Partybank Loader" class="mb-4 animate-pulse h-28 w-28" />
        <p class="text-2xl font-bold">Verifying your email</p>
        <p class="">This will only take a few seconds</p>
        </div>
    </Transition.Child>
    </div>
</Transition>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const isOpen = true;

// onMounted(async () => {
// const router = useRouter();
// const token = router.currentRoute.query.token;
// try {
//     const response = await fetch(`/api/verify-email?token=${token}`);
//     const data = await response.json();
//     if (data.success) {
//         alert('Your email has been verified successfully! Redirecting...');
//         const userAction = localStorage.getItem('userAction');
//         router.push({ name: userAction === 'buyingTicket' ? 'event-details' : 'Explore' });
//     } else {
//         alert('Failed to verify email. Please try the verification link again.');
//     }
// } catch (error) {
//     console.error('Verification failed:', error);
//     alert('An error occurred during verification. Please contact support.');
// }
// });
</script>

<style scoped>
.verification-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
}
</style>
