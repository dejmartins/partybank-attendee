<template>
  <main class="flex flex-col border-0 md:border-x-[20px] border-[var(--pb-c-soft-grey)]">
    <div class="flex items-center gap-7 py-3 px-6 border-0 border-b-[3px] border-[var(--pb-c-soft-grey)]">
        <BackButton href="/" />
        <div class='flex items-center gap-4'>
          <!-- <div className="min-w-[40px] min-h-[40px] border bg-cover bg-center rounded-[10px] overflow-hidden"
              style={{
                  backgroundImage: `url("${backgroundImageUrl}")`,
              }}
          >
          </div> -->
          <p class="text-[23px] md:text-[30px] md:font-[700]">Discover Events</p>
        </div>
      </div>
  </main>
</template>

<script setup lang="ts">
import BackButton from '@/components/buttons/BackButton.vue';
</script>
