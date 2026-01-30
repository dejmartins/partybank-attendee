<template>
  <main>
    <Header />

    <div class="relative pb-3 mb-20">
      <!-- HERO -->
      <div
        class="h-[350px] bg-cover bg-center flex items-start justify-center flex-col px-10 md:px-20"
        :style="{ backgroundImage: 'url(/policy.svg)' }"
      >
        <p class="text-white text-2xl md:text-4xl font-bold mt-5">Support Center</p>
        <p class="text-white text-lg mt-3 text-left leading-6 max-w-[700px]">
          Quick answers. Fast help. More celebrations.
        </p>
      </div>

      <!-- CONTENT -->
      <div class="flex flex-col items-center mt-16 px-5">
        <div class="w-full max-w-[1100px]">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Left: Quick Actions -->
            <div class="bg-white rounded-[20px] border border-[#E9ECEC] p-6">
              <h2 class="text-lg font-[800] mb-3">Quick Actions</h2>

              <div class="flex flex-col gap-3">
                <button
                  @click="emailSupport"
                  class="w-full text-left px-4 py-3 rounded-[16px] border border-[#E9ECEC] hover:border-[var(--pb-c-red)]/40 hover:bg-[#FBD1D933] transition"
                >
                  <p class="font-[800]">Email Support</p>
                  <p class="text-sm text-slate-500 mt-0.5">support@thepartybank.com</p>
                </button>

                <button
                  @click="goSearch"
                  class="w-full text-left px-4 py-3 rounded-[16px] border border-[#E9ECEC] hover:border-[var(--pb-c-red)]/40 hover:bg-[#FBD1D933] transition"
                >
                  <p class="font-[800]">Browse Events</p>
                  <p class="text-sm text-slate-500 mt-0.5">Find events and tickets</p>
                </button>

                <button
                  @click="goLogin"
                  class="w-full text-left px-4 py-3 rounded-[16px] border border-[#E9ECEC] hover:border-[var(--pb-c-red)]/40 hover:bg-[#FBD1D933] transition"
                >
                  <p class="font-[800]">Sign In</p>
                  <p class="text-sm text-slate-500 mt-0.5">Manage your account</p>
                </button>
              </div>

              <div class="mt-6 pt-6 border-t border-[#E9ECEC]">
                <h3 class="font-[800] mb-2">Browse by Topic</h3>

                <div class="flex flex-col gap-2">
                  <button
                    v-for="c in categories"
                    :key="c"
                    @click="query = c"
                    class="text-left px-4 py-3 rounded-[16px] border border-[#E9ECEC] hover:border-[var(--pb-c-red)]/40 hover:bg-[#FBD1D933] transition"
                  >
                    <p class="font-[800]">{{ c }}</p>
                    <p class="text-sm text-slate-500 mt-0.5">
                      {{
                        c === "Attendees"
                          ? "Tickets, checkout, refunds"
                          : c === "Organizers"
                            ? "Events, payouts, check-in"
                            : "Login, password, security"
                      }}
                    </p>
                  </button>
                </div>
              </div>
            </div>

            <!-- Right: Articles -->
            <div class="lg:col-span-2 bg-white rounded-[20px] border border-[#E9ECEC] p-6">
              <div class="flex items-center justify-between gap-3 mb-4">
                <h2 class="text-lg font-[800]">Help Articles</h2>
                <p class="text-sm text-slate-500">
                  {{ filtered.length }} result{{ filtered.length === 1 ? "" : "s" }}
                </p>
              </div>

              <div class="flex flex-col gap-3">
                <div
                  v-for="a in filtered"
                  :key="a.id"
                  class="rounded-[16px] border border-[#E9ECEC] hover:border-[var(--pb-c-red)]/40 transition overflow-hidden"
                >
                  <button
                    @click="toggleOpen(a.id)"
                    class="w-full text-left p-4 flex items-center justify-between gap-4"
                  >
                    <div>
                      <p class="text-xs font-[800] uppercase tracking-wider text-slate-500">
                        {{ a.category }}
                      </p>
                      <p class="font-[900] text-slate-900 mt-1">
                        {{ a.title }}
                      </p>
                    </div>

                    <div class="p-2 rounded-[10px] bg-[#F3F5F5]">
                      <ChevronDownIcon
                        class="w-4 stroke-2 transition-transform text-slate-700"
                        :class="openId === a.id ? 'rotate-180' : ''"
                      />
                    </div>
                  </button>

                  <div v-if="openId === a.id" class="px-4 pb-4">
                    <div class="border rounded-[12px] p-4 bg-[#F8F9F9]">
                      <p class="text-sm text-slate-600 leading-relaxed">
                        {{ a.body }}
                      </p>
                    </div>
                  </div>
                </div>

                <div v-if="filtered.length === 0" class="text-sm text-slate-500 py-6">
                  No results. Try “tickets”, “refund”, or “password”.
                </div>
              </div>

              <!-- Contact strip -->
              <div class="mt-8 rounded-[20px] border border-[#E9ECEC] bg-[#F8F9F9] p-6">
                <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div>
                    <h3 class="text-xl font-[900]">Still need help?</h3>
                    <p class="text-slate-500 mt-2">
                      Email us — we’ll respond as fast as possible.
                    </p>
                    <p class="text-slate-800 font-[800] mt-3">support@thepartybank.com</p>
                  </div>

                  <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <button
                      @click="emailSupport"
                      class="px-6 py-3 rounded-[14px] font-[800] text-white bg-[var(--pb-c-red)] hover:opacity-90 transition w-full sm:w-auto"
                    >
                      Email Support
                    </button>

                    <button
                      @click="goSearch"
                      class="px-6 py-3 rounded-[14px] font-[800] bg-white border border-[#E9ECEC] hover:opacity-95 transition w-full sm:w-auto"
                    >
                      Browse Events
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- end right -->
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

import Header from "@/components/home-page/Header.vue";
import Footer from "@/components/home-page/Footer.vue";

import { MagnifyingGlassIcon, ChevronDownIcon } from "@heroicons/vue/24/outline";

type Category = "Attendees" | "Organizers" | "Account";
type Article = { id: string; title: string; body: string; category: Category };

const router = useRouter();

const query = ref("");
const openId = ref<string | null>(null);

const categories = computed<Category[]>(() => ["Attendees", "Organizers", "Account"]);

const articles = computed<Article[]>(() => [
  {
    id: "tickets-find",
    title: "How do I find my ticket after checkout?",
    body:
      "After checkout, we email your ticket to you. If you used the wrong email, contact support with your payment reference.",
    category: "Attendees",
  },
  {
    id: "refunds",
    title: "Can I get a refund?",
    body:
      "Partybank does not process refunds directly at the moment. For any refund request, please contact the event organizer using the contact details on the event page or your ticket email.",
    category: "Attendees",
  },
  {
    id: "attendee-email",
    title: "I didn’t receive my ticket email — what should I do?",
    body:
      "Check spam/junk first. Then confirm you used the correct email at checkout. If it still doesn’t show, email support with your payment reference and event name.",
    category: "Attendees",
  },
  {
    id: "organizer-create",
    title: "How do I create an event on Partybank?",
    body:
      "Create events from the Organizer web app. You'll set event details, schedule/location, tickets, and publish when ready.",
    category: "Organizers",
  },
  {
    id: "payouts",
    title: "When do organizers get paid?",
    body:
      "Payout timing depends on payout request. Go to payout management in your dashboard, and request payout. If you have a payout issue, send us the event name and organizer email.",
    category: "Organizers",
  },
  {
    id: "scan-entry",
    title: "How does ticket scanning work at the venue?",
    body:
      "Use the Scanning mobile app to scan tickets at the entrance. Each ticket code is validated and marked as checked-in to prevent duplicates.",
    category: "Organizers",
  },
  {
    id: "password-reset",
    title: "How do I reset my password?",
    body:
      "Go to Login, then Forgot password. You’ll receive a reset code. If you don’t see it, check spam/junk.",
    category: "Account",
  },
  {
    id: "account-delete",
    title: "Can I delete my account?",
    body:
      "If you need your account removed, email support from the email tied to your account. We’ll confirm and process the request.",
    category: "Account",
  },
  {
    id: "pricing-fees",
    title: "What fees does Partybank charge?",
    body:
      "Partybank charges a service fee on each ticket sold. Fees may be paid by the organizer or passed on to attendees, depending on how you configure your event. You’ll always see a full fee breakdown before publishing your event.",
    category: "Organizers",
  },
]);

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return articles.value;

  return articles.value.filter((a) => {
    return (
      a.title.toLowerCase().includes(q) ||
      a.body.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q)
    );
  });
});

const onSearch = () => {
  const first = filtered.value[0];
  if (first) openId.value = first.id;
};

const toggleOpen = (id: string) => {
  openId.value = openId.value === id ? null : id;
};

const emailSupport = () => {
  window.location.href = "mailto:support@thepartybank.com";
};

const goSearch = () => router.push("/discover");
const goLogin = () => router.push("/login");
</script>
