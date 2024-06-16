import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/attendees/HomeView.vue')
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
      path: '/validate',
      name: 'validate',
      component: () => import('@/views/organizers/validateTicket.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/organizers/EuphoriaAccess.vue')
    }
  ]
})

export default router
