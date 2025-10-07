<template>
  <main class="w-full flex flex-col rounded-t-[40px] bg-white">
    <!-- Sticky header -->
    <header class="sticky top-0 z-30 border-b border-[var(--pb-c-soft-grey)] bg-white/90 backdrop-blur">
      <div class="px-4 sm:px-6 lg:px-20 py-4 flex items-center gap-3">
        <BackButton href="/" />
        <div class="flex-1 min-w-0">
          <h1 class="text-[22px] sm:text-[28px] lg:text-[34px] font-[800] leading-tight truncate">Discover Events</h1>
          <p class="hidden sm:block text-[13px] sm:text-[14px] text-gray-600">
            Search and filter upcoming events across states and cities.
          </p>
        </div>

        <!-- Desktop actions -->
        <div class="hidden md:flex items-center gap-2">
          <button
            class="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
            @click="resetAll"
            aria-label="Clear all filters"
          >
            Clear
          </button>
        </div>

        <!-- Mobile Filters button -->
        <button
          class="md:hidden inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
          @click="mobileFiltersOpen = true"
          aria-label="Open filters"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5h18M6 12h12M10 19h4"/>
          </svg>
          Filters
        </button>
      </div>

      <!-- Sticky search row -->
      <div class="px-4 sm:px-6 lg:px-20 pb-4">
        <form class="flex items-center gap-2" @submit.prevent="commitSearch">
          
          <div class="relative w-full md:max-w-[520px]">
            <!-- NOTE: type='text' to avoid native Safari clear (we also hide it just in case) -->
            <input
              v-model="qInput"
              type="text"
              autocomplete="off"
              placeholder="Search by name, venue, state, or city…"
              class="w-full mt-3 rounded-2xl border border-[#DDE0E3] bg-white pl-11 pr-10 py-2.5 text-[14px] outline-none focus:ring-2 focus:ring-[#E91B41]"
              aria-label="Search events"
              @keydown.enter.prevent="commitSearch"
            />
            <!-- Search icon (single) -->
            <svg class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 105.5 5.5a7.5 7.5 0 0011.15 11.15z"/>
            </svg>
            <!-- Our only clear button -->
            <button
              v-if="qInput"
              type="button"
              class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-gray-100"
              aria-label="Clear search"
              @click="clearSearch"
            >
              <svg class="h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                <path fill="currentColor" d="M205.66 194.34a8 8 0 1 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128L50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128z"/>
              </svg>
            </button>
          </div>

          <!-- Search button (commit the query to child) -->
          <button
            type="submit"
            class="shrink-0 inline-flex items-center gap-2 rounded-xl bg-[#E91B41] text-white px-4 py-2.5 text-sm hover:opacity-95"
            aria-label="Run search"
          >
            Search
          </button>

          <!-- Desktop filters inline -->
          <div class="hidden md:flex items-center gap-2 ml-auto">
            <select
              v-model="state"
              class="rounded-xl border border-[#DDE0E3] bg-white px-3 py-2 text-[14px] outline-none focus:ring-2 focus:ring-[#E91B41]"
              aria-label="Filter by state"
            >
              <option value="">All States</option>
              <option v-for="s in states" :key="s" :value="s">{{ s }}</option>
            </select>

            <select
              v-model="city"
              class="rounded-xl border border-[#DDE0E3] bg-white px-3 py-2 text-[14px] outline-none focus:ring-2 focus:ring-[#E91B41]"
              aria-label="Filter by city"
            >
              <option value="">All Cities</option>
              <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
            </select>

            <select
              v-model="sort"
              class="rounded-xl border border-[#DDE0E3] bg-white px-3 py-2 text-[14px] outline-none focus:ring-2 focus:ring-[#E91B41]"
              aria-label="Sort results"
            >
              <option value="date_asc">Date • Soonest</option>
              <option value="date_desc">Date • Latest</option>
              <option value="name_asc">Name • A→Z</option>
              <option value="name_desc">Name • Z→A</option>
            </select>

            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
              @click="resetAll"
            >
              Clear
            </button>
          </div>
        </form>

        <!-- Active chips -->
        <div class="mt-2 flex flex-wrap items-center gap-2">
          <button v-if="q" class="chip" @click="q = ''; qInput = ''">Search: “{{ q }}” ✕</button>
          <button v-if="state" class="chip" @click="state = ''">State: {{ state }} ✕</button>
          <button v-if="city" class="chip" @click="city = ''">City: {{ city }} ✕</button>
        </div>
      </div>
    </header>

    <!-- Mobile filters drawer -->
    <transition name="fade">
      <div v-if="mobileFiltersOpen" class="fixed inset-0 z-40 bg-black/40" @click.self="mobileFiltersOpen = false"></div>
    </transition>
    <transition name="slide-up">
      <aside
        v-if="mobileFiltersOpen"
        class="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl bg-white p-4 shadow-2xl"
        role="dialog"
        aria-modal="true"
      >
        <div class="mx-auto max-w-2xl">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-lg font-semibold">Filters</h2>
            <button class="rounded-full p-2 hover:bg-gray-100" aria-label="Close filters" @click="mobileFiltersOpen = false">
              <svg class="h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="currentColor" d="M205.66 194.34a8 8 0 1 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128L50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128z"/></svg>
            </button>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-xs text-gray-600 mb-1">State</label>
              <select v-model="state" class="w-full rounded-xl border px-3 py-2">
                <option value="">All States</option>
                <option v-for="s in states" :key="s" :value="s">{{ s }}</option>
              </select>
            </div>

            <div>
              <label class="block text-xs text-gray-600 mb-1">City</label>
              <select v-model="city" class="w-full rounded-xl border px-3 py-2">
                <option value="">All Cities</option>
                <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
              </select>
            </div>

            <div>
              <label class="block text-xs text-gray-600 mb-1">Sort</label>
              <select v-model="sort" class="w-full rounded-xl border px-3 py-2">
                <option value="date_asc">Date • Soonest</option>
                <option value="date_desc">Date • Latest</option>
                <option value="name_asc">Name • A→Z</option>
                <option value="name_desc">Name • Z→A</option>
              </select>
            </div>
          </div>

          <div class="mt-5 flex items-center justify-between">
            <button type="button" class="rounded-xl border px-4 py-2 text-sm" @click="resetAll">Clear</button>
            <button type="button" class="rounded-xl bg-[#E91B41] text-white px-4 py-2 text-sm" @click="mobileFiltersOpen = false">Apply</button>
          </div>
        </div>
      </aside>
    </transition>

    <!-- Results -->
    <section class="px-4 sm:px-6 lg:px-20 py-6">
      <AllEvents
        :q="q"
        :state="state"
        :city="city"
        :sort="sort"
        @optionsLoaded="onOptionsLoaded"
      />
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BackButton from '@/components/buttons/BackButton.vue';
import AllEvents from '@/components/events/AllEvents.vue';

const qInput = ref<string>(''); // what user types
const q      = ref<string>(''); // committed query sent to AllEvents

const state = ref<string>('');
const city  = ref<string>('');
const sort  = ref<'date_asc' | 'date_desc' | 'name_asc' | 'name_desc'>('date_asc');

const states = ref<string[]>([]);
const cities  = ref<string[]>([]);

const mobileFiltersOpen = ref(false);

function commitSearch() {
  q.value = (qInput.value || '').trim();
}

function clearSearch() {
  qInput.value = '';
  q.value = '';
}

function onOptionsLoaded(payload: { states: string[]; cities: string[] }) {
  states.value = payload.states;
  cities.value = payload.cities;
  if (state.value && !states.value.includes(state.value)) state.value = '';
  if (city.value && !cities.value.includes(city.value)) city.value = '';
}

function resetAll() {
  qInput.value = '';
  q.value = '';
  state.value = '';
  city.value = '';
  sort.value = 'date_asc';
}
</script>

<style scoped>
/* Chip */
.chip { @apply text-xs bg-white border border-gray-200 rounded-full px-3 py-1 hover:bg-gray-50; }

/* Hide native Safari clear button to avoid double “x” */
input[type="search"]::-webkit-search-cancel-button { display: none; }

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity .15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-up-enter-active, .slide-up-leave-active { transition: transform .2s ease, opacity .2s ease; }
.slide-up-enter-from, .slide-up-leave-to { transform: translateY(8px); opacity: 0; }
</style>