import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'

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
      component: () => import('@/views/attendees/AllEvents.vue'),
      children: [
        {
          path: '',
          name: 'discover-events',
          component: () => import('@/views/attendees/DiscoverEvents.vue')
        },
        {
          path: ':eventReference',
          name: 'event-details',
          component: () => import('@/views/attendees/EventDetails.vue')
        }
      ]
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
      component: () => import('@/views/auth/ValidateToken.vue')
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
  const authenticated = false;

  if (to.name === 'verify-email' && !authenticated) {
    next({ name: 'home' });
  } else {
    next();
  }
})

export default router
