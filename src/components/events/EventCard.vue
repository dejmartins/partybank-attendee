<template>
  <router-link
    :to="{ name: 'event-details', params: { eventReference: eventId } }"
    class="group block"
    aria-label="View event details"
  >
    <article
      class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <!-- Media -->
      <div class="relative aspect-[16/10] bg-gray-100">
        <img
          :src="imageUrl || fallback"
          :alt="eventName"
          class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
          @error="onImgError"
        />

        <!-- Top-left date pill -->
        <div
          v-if="niceDate"
          class="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full border bg-white/90 px-3 py-1 text-xs backdrop-blur"
        >
          <CalendarDaysIcon class="h-4 w-4" />
          <span class="font-medium">{{ niceDate }}</span>
        </div>

        <!-- Top-right price/label -->
        <div
          v-if="priceLabel || isFeatured"
          class="absolute top-3 right-3 flex flex-col items-end gap-2"
        >
          <span
            v-if="priceLabel"
            class="rounded-full bg-[#E91B41] px-3 py-1 text-xs font-semibold text-white shadow"
          >
            {{ priceLabel }}
          </span>
          <span
            v-if="isFeatured"
            class="rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#E91B41] border backdrop-blur"
          >
            Featured
          </span>
        </div>

        <!-- Bottom gradient & tags -->
        <div
          v-if="tags?.length"
          class="pointer-events-none absolute inset-x-0 bottom-0 p-3"
        >
          <div class="rounded-xl bg-gradient-to-t from-black/50 to-transparent p-2">
            <div class="flex flex-wrap gap-2">
              <span
                v-for="t in limitedTags"
                :key="t"
                class="pointer-events-auto rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-medium text-gray-800 border"
              >
                {{ t }}
              </span>
              <span
                v-if="tags.length > maxTags"
                class="pointer-events-auto rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-medium text-gray-800 border"
              >
                +{{ tags.length - maxTags }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Body -->
      <div class="p-4">
        <h3 class="line-clamp-2 text-[16px] font-[800] md:text-[18px]">
          {{ eventName }}
        </h3>

        <div class="mt-3 grid grid-cols-1 gap-2 text-[13px] text-gray-700">
          <div class="flex items-center gap-2">
            <MapPinIcon class="h-5 w-5 shrink-0" />
            <span class="line-clamp-1">
              {{ location.city }}
              <span v-if="location.state">, {{ location.state }}</span>, {{ location.country }}
            </span>
          </div>

          <div v-if="venue" class="flex items-center gap-2">
            <BuildingOffice2Icon class="h-5 w-5 shrink-0" />
            <span class="line-clamp-1">{{ venue }}</span>
          </div>

          <div class="flex items-center gap-2">
            <ClockIcon class="h-5 w-5 shrink-0" />
            <span class="line-clamp-1">{{ time }}</span>
          </div>
        </div>
      </div>
    </article>
  </router-link>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { CalendarDaysIcon, ClockIcon, MapPinIcon, BuildingOffice2Icon } from '@heroicons/vue/24/outline';
import moment from 'moment';

const props = defineProps<{
  eventId: string;
  imageUrl?: string;
  eventDate: string;
  eventName: string;
  location: { city: string; country: string; state?: string };
  status?: string;             // kept for compatibility (unused here)
  time: string;
  venue: string;

  // Optional niceties (won’t break existing usage)
  priceLabel?: string;         // e.g. "Free", "From ₦5,000"
  isFeatured?: boolean;
  tags?: string[];
}>();

const fallback = ref('/placeholder.png'); // replace with your local placeholder if available
const maxTags = 3;

const niceDate = computed(() => {
  const d = props.eventDate;
  if (!d) return '';
  const m = moment(d, ['YYYY-MM-DD', 'DD-MM-YYYY', moment.ISO_8601], true);
  return m.isValid() ? m.format('ddd, MMM D') : '';
});

const limitedTags = computed(() => (props.tags || []).slice(0, maxTags));

function onImgError(e: Event) {
  const el = e.target as HTMLImageElement;
  // Avoid infinite loop if fallback also fails
  if (el && el.src !== fallback.value) {
    el.src = fallback.value;
  }
}
</script>

<style scoped>
/* Smoothen shadow transition for subtle quality */
article {
  will-change: transform, box-shadow;
}
</style>
