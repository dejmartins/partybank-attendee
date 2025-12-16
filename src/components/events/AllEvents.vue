<template>
  <div class="w-full">
    <!-- Top meta + page size -->
    <div class="flex items-center justify-between mb-4">
      <p class="text-sm text-gray-600">
        Showing <strong>{{ pagedItems.length }}</strong> of
        <strong>{{ filtered.length }}</strong> upcoming results
      </p>

      <div class="flex items-center gap-2">
        <label class="text-sm text-gray-600">Page size</label>
        <select
          v-model.number="pageSize"
          class="rounded-xl border border-[#DDE0E3] bg-white px-3 py-2 text-[14px] outline-none focus:ring-2 focus:ring-[#E91B41]"
        >
          <option :value="12">12</option>
          <option :value="24">24</option>
          <option :value="48">48</option>
          <option :value="96">96</option>
        </select>
      </div>
    </div>

    <!-- Skeletons -->
    <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <EventCardSkeleton v-for="i in pageSize" :key="i" />
    </div>

    <!-- Empty -->
    <div v-else-if="filtered.length === 0" class="flex flex-col items-center justify-center text-center py-16">
      <div class="text-2xl font-semibold mb-2">No upcoming events after tomorrow</div>
      <p class="text-gray-600">Try adjusting filters or check back later.</p>
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <EventCard
        v-for="ev in pagedItems"
        :key="ev.event_reference"
        :eventId="ev.event_reference"
        :imageUrl="ev.image_url"
        :location="ev.location"
        :venue="ev.venue"
        :time="ev.time"
        :eventName="ev.event_name"
        :eventDate="ev.date"
      />
    </div>

    <!-- Pagination -->
    <div v-if="filtered.length > 0" class="mt-6 flex items-center justify-between bg-white border border-[#EDEDED] rounded-xl p-3">
      <button
        class="px-4 py-2 rounded-lg border border-[#DDE0E3] disabled:opacity-40"
        :disabled="page <= 1 || isLoading"
        @click="goPrev"
      >
        Prev
      </button>

      <div class="flex items-center gap-1">
        <button
          v-for="p in pageButtons"
          :key="p.key"
          :disabled="p.disabled"
          class="min-w-[40px] h-10 rounded-lg border"
          :class="p.active ? 'bg-[#E91B41] text-white border-[#E91B41]' : 'border-[#DDE0E3] bg-white hover:bg-gray-50'"
          @click="goToPage(p.page)"
        >
          {{ p.label }}
        </button>
      </div>

      <button
        class="px-4 py-2 rounded-lg border border-[#DDE0E3] disabled:opacity-40"
        :disabled="page >= maxPage || isLoading"
        @click="goNext"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import Api from '@/utils/api';
import EventCard from './EventCard.vue';
import EventCardSkeleton from '../ui/skeletons/EventCardSkeleton.vue';
import type { Event } from '@/utils/types';

const props = defineProps<{
  q?: string;
  state?: string;
  city?: string;
  sort?: 'date_asc' | 'date_desc' | 'name_asc' | 'name_desc';
}>();

const emit = defineEmits<{
  (e: 'optionsLoaded', payload: { states: string[]; cities: string[] }): void
}>();

const { DISCOVER_EVENTS } = Api();

const isLoading = ref(true);
const raw = ref<Event[]>([]);           // merged (3 pages) unfiltered
const filtered = ref<Event[]>([]);      // filtered by rules + props, sorted

// client-side pagination state
const page = ref(1);
const pageSize = ref(24);

const PAGES = [1, 2, 3];

// ---- date helpers ----
function startOfDay(d: Date) {
  const nd = new Date(d);
  nd.setHours(0, 0, 0, 0);
  return nd;
}
function addDays(d: Date, days: number) {
  const nd = new Date(d);
  nd.setDate(nd.getDate() + days);
  return nd;
}

const PINNED_IDS = [
  'evt-YjZjNjk1ZDctZjg3ZS00M2QxLThkNmQtN2Q4YjkxOTY2ZDA2',
  'evt-NGQ4ODJjMjctMTQ0MS00ZmQwLTk5MzMtNmFiNjVmYTI1MjE0',
  'evt-NGE3NjA2MGUtN2NmMS00NGQ4LWIxZDMtZjUxMmQ1ZWY1MWMw',
  'evt-MzczOWU3M2EtMzNmMy00YjUxLWJjYmEtYzYwMDcwOGMwMzM2',
  'evt-ZWEzNDBkYzQtMjk4Yi00ZjE3LWFjYmItNjM1NTAzNmUxZGVm',
  'evt-YzVlMWVhOGEtNTA4ZC00OTljLWI4NzItMTQ2MjYwOTUzOTRi',
  'evt-N2I4ZjQ4NDEtOTA0ZC00MWEyLThhMWQtZTZjNTdjZWE3NDA1',
  'evt-YTIyYjllNjItMzUzNi00NWU0LTg0MWQtMjIyYjk5NTIxODBj',
  'evt-NGUxMWYzODktNTc2My00NTNiLWExODMtMTY3YTk1YzA0NjUy',
];

function getEventKey(ev: Event): string {
  return String((ev as any).event_reference ?? (ev as any).id ?? '');
}

function parseDate(dateStr?: string): Date {
  if (!dateStr) return new Date(0);
  if (dateStr.includes('-')) {
    const parts = dateStr.split('-');
    // support YYYY-MM-DD and DD-MM-YYYY
    if (parts[0].length === 4) return new Date(dateStr);
    return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
  }
  return new Date(dateStr);
}
function parseTimeToMinutes(timeStr?: string): number | null {
  if (!timeStr) return null;
  // supports "HH:mm", "H:mm", "hh:mm a"
  const t = timeStr.trim().toLowerCase();
  const ampm = t.endsWith('am') || t.endsWith('pm');
  let h = 0, m = 0;
  if (ampm) {
    const [hm, ap] = t.split(/\s+/);
    const [hh, mm = '0'] = hm.split(':');
    h = Number(hh);
    m = Number(mm);
    if (ap === 'pm' && h < 12) h += 12;
    if (ap === 'am' && h === 12) h = 0;
  } else {
    const [hh, mm = '0'] = t.split(':');
    h = Number(hh);
    m = Number(mm);
  }
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}
function combineDateTime(dateStr?: string, timeStr?: string): Date {
  const d = parseDate(dateStr);
  if (!timeStr) return d;
  const mins = parseTimeToMinutes(timeStr);
  if (mins == null) return d;
  const nd = new Date(d);
  nd.setHours(Math.floor(mins / 60), mins % 60, 0, 0);
  return nd;
}

// ---- fetch & merge 3 pages ----
async function fetchAll() {
  isLoading.value = true;
  try {
    const urls = PAGES.map((p) => `${DISCOVER_EVENTS}?page=${p}&size=100`);
    const results = await Promise.allSettled(
      urls.map(async (u) => {
        const r = await fetch(u);
        if (!r.ok) throw new Error(`HTTP ${r.status} on ${u}`);
        return r.json();
      })
    );

    const combined: Event[] = results.flatMap((res) => {
      if (res.status !== 'fulfilled') return [];
      const payload: any = res.value;
      return Array.isArray(payload) ? payload : (payload?.items ?? []);
    });

    // de-dupe by event_reference (fallback: id)
    const map = new Map<string, Event>();
    for (const ev of combined) {
      const key = String(ev?.event_reference ?? ev?.id ?? Math.random());
      if (!map.has(key)) map.set(key, ev);
    }
    raw.value = Array.from(map.values());

    // Fire dynamic options
    const states = new Set<string>(), cities = new Set<string>();
    for (const ev of raw.value) {
      if (ev?.location?.state) states.add(ev.location.state);
      if (ev?.location?.city)  cities.add(ev.location.city);
    }
    emit('optionsLoaded', { states: Array.from(states).sort(), cities: Array.from(cities).sort() });

    applyFilters();
  } catch (e) {
    console.error('fetchAll failed:', e);
    raw.value = [];
    filtered.value = [];
  } finally {
    isLoading.value = false;
  }
}

// ---- main filter rules ----
// 1) Only events starting AFTER TOMORROW (i.e., day-after-tomorrow 00:00)
// 2) Exclude events that have an explicit end time earlier than NOW - 10 hours
function applyFilters() {
  const now = new Date();
  const GRACE_HOURS = 24; // or 12
  const graceMs = GRACE_HOURS * 60 * 60 * 1000;

  const q = (props.q || '').toLowerCase().trim();
  const state = props.state || '';
  const city = props.city || '';

  const list = raw.value.filter((ev) => {
    const startAt = combineDateTime(ev?.date, ev?.time);

    // detect end (support optional separate end date if your API has it)
    const endTimeStr: string | undefined =
      (ev as any).end_time ?? (ev as any).endTime ?? (ev as any).ends_at;
    const endDateStr: string | undefined =
      (ev as any).end_date ?? (ev as any).endDate ?? ev?.date;

    let endAt: Date;
    if (endTimeStr) {
      endAt = combineDateTime(endDateStr, endTimeStr);
    } else {
      // fallback: assume same as start, or add a default duration if you prefer
      endAt = startAt;
    }

    // keep if:
    // - event is upcoming or ongoing (endAt >= now), OR
    // - event ended not more than GRACE_HOURS ago
    if (endAt.getTime() < now.getTime() - graceMs) {
      return false; // too old, drop it
    }

    // filters
    if (state && ev?.location?.state !== state) return false;
    if (city && ev?.location?.city !== city) return false;

    if (q) {
      const hay = `${ev?.event_name ?? ''} ${ev?.venue ?? ''} ${ev?.location?.city ?? ''} ${ev?.location?.state ?? ''} ${ev?.location?.country ?? ''}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }

    return true;
  });

  filtered.value = applyClientSort(list);

  if ((page.value - 1) * pageSize.value >= filtered.value.length) {
    page.value = 1;
  }
}

// client-side sort fallback
function applyClientSort(list: Event[]): Event[] {
  const normStart = (ev: Event) =>
    combineDateTime((ev as any).date, (ev as any).time).getTime();

  // 1) Build a lookup for pinned order
  const pinnedOrder = new Map<string, number>();
  PINNED_IDS.forEach((id, index) => {
    pinnedOrder.set(id, index);
  });

  // 2) Split into pinned + others (only from the already-filtered list)
  const pinned: Event[] = [];
  const others: Event[] = [];

  for (const ev of list) {
    const key = getEventKey(ev);
    const order = pinnedOrder.get(key);
    if (order !== undefined) {
      pinned[order] = ev; // put at its declared position
    } else {
      others.push(ev);
    }
  }

  // compact pinned (in case some IDs don't exist in list)
  const pinnedSorted = pinned.filter(Boolean);

  // 3) Apply normal sort to the non-pinned events
  const copy = others.slice();
  switch (props.sort ?? 'date_asc') {
    case 'date_desc':
      copy.sort((a, b) => normStart(b) - normStart(a));
      break;
    case 'name_asc':
      copy.sort((a, b) => (a.event_name || '').localeCompare(b.event_name || ''));
      break;
    case 'name_desc':
      copy.sort((a, b) => (b.event_name || '').localeCompare(a.event_name || ''));
      break;
    case 'date_asc':
    default:
      copy.sort((a, b) => normStart(a) - normStart(b));
      break;
  }

  // 4) Final order: pinned first (in PINNED_IDS order), then the rest
  return [...pinnedSorted, ...copy];
}


// ---- pagination (client-side) ----
const maxPage = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize.value)));
const pagedItems = computed(() => {
  const start = (page.value - 1) * pageSize.value;
  return filtered.value.slice(start, start + pageSize.value);
});

function goPrev() {
  if (page.value > 1 && !isLoading.value) page.value -= 1;
}
function goNext() {
  if (page.value < maxPage.value && !isLoading.value) page.value += 1;
}
function goToPage(p?: number) {
  if (!p || p === page.value || isLoading.value) return;
  if (p < 1 || p > maxPage.value) return;
  page.value = p;
}

const pageButtons = computed(() => {
  const curr = page.value;
  const max = maxPage.value;
  const window = 2;
  const start = Math.max(1, curr - window);
  const end = Math.min(max, curr + window);

  const btns: Array<{ key: string; label: string; page?: number; active?: boolean; disabled?: boolean }> = [];
  if (start > 1) btns.push({ key: 'p1', label: '1', page: 1 });
  if (start > 2) btns.push({ key: 'dotsL', label: '…', disabled: true });

  for (let p = start; p <= end; p++) {
    btns.push({ key: `p${p}`, label: String(p), page: p, active: p === curr });
  }

  if (end < max - 1) btns.push({ key: 'dotsR', label: '…', disabled: true });
  if (end < max) btns.push({ key: `p${max}`, label: String(max), page: max });

  return btns;
});

// ---- react to prop changes ----
watch(
  () => [props.q, props.state, props.city, props.sort],
  () => {
    page.value = 1;
    applyFilters();
  }
);

watch(pageSize, () => {
  page.value = 1;
});

// ---- mount ----
onMounted(fetchAll);
</script>