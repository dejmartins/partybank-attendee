import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomePage.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/MyProfile.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/layouts/auth/SignInLayout.vue'),
      children: [
        {
          path: '',
          name: 'sign-in',
          component: () => import('@/views/auth/SignIn.vue')
        }
      ]
    },
    {
      path: '/policy',
      name: 'privacy-policy',
      component: () => import('@/views/PrivacyPolicy.vue')
    },
    {
      path: '/termsandconditions',
      name: 'terms-condition',
      component: () => import('@/views/TermsAndConditions.vue')
    },
    {
      path: '/discover',
      name: 'discover',
      component: () => import('@/layouts/event/EventsLayout.vue'),
      children: [
        {
          path: '',
          name: 'discover-events',
          component: () => import('@/views/events/DiscoverEvents.vue')
        },
        {
          path: ':eventReference',
          name: 'event-details',
          component: () => import('@/views/events/ViewEvent.vue')
        }
      ]
    },
    {
      path: '/purchase',
      name: 'ticket-purchase',
      component: () => import('@/views/tickets/TicketPurchase.vue')
    },
    {
      path: '/:eventReference/validate',
      name: 'validate',
      component: () => import('@/views/ticketers/ValidateTicket.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/:eventReference/admin',
      name: 'admin',
      component: () => import('@/views/ticketers/TicketterAccess.vue')
    },
    {
      path: '/validate-token',
      name: 'validate-token',
      component: () => import('@/views/auth/ValidateToken.vue'),
      props: route => ({ token: route.query.token, type: route.query.type }),
    }
  ]
})

function isLoggedIn() {
  return new Promise((resolve) => {
    let currentUser = localStorage.getItem('user')
    onAuthStateChanged(auth, (user) => {
      if (user && user.email === currentUser) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  })
}

router.beforeEach(async (to) => {
  const authenticated = await isLoggedIn()

  if (to.meta.requiresAuth && !authenticated) {
    return {
      name: 'admin',
      query: { redirect: to.fullPath }
    }
  }
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (to.name === 'ticket-purchase' && !authStore.isAuthenticated) {
    next({ name: 'discover-events' });
  } else {
    next();
  }
})

export default router
