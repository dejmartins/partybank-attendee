<template>
    <form className='text-left w-full'>
        <label className="text-[18px] font-[500]">Email</label>
        <input className="w-full rounded-[10px] p-[10px] mt-[8px] mb-[30px] focus:outline-none focus:ring-2 focus:ring-[var(--pb-c-red)] focus:border-[var(--pb-c-red)]" 
                placeholder="Enter email address" />

        <Button 
            action="Sign In"
            :disabled="false"
            :loading="false"
            additional-classes="bg-[var(--pb-c-red)] border-[var(--pb-c-red)] text-[var(--pb-c-white)] w-full"
            text-style="text-[18px] font-[700]"
        />

        <hr className='my-6 md:my-8 border-[1px]' />

        <Button
            action="Continue with Google"
            additional-classes="bg-[var(--pb-c-white)] w-full"
            text-style="text-[16px] font-[500]"
            :disabled="false"
            :loading="false"
        >
            <img src="/google-icon.png" alt='Google Icon' className='w-[22px] h-[22px]' />
        </Button>
    </form>
</template>

<script setup lang="ts">
import Button from '../buttons/LoaderButton.vue';
</script>