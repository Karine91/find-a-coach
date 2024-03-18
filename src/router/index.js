import { createRouter, createWebHistory } from 'vue-router'

import store from '@/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/coaches' },
    {
      path: '/coaches',
      name: 'coaches',
      component: () => import('@/views/coaches/CoachesList.vue')
    },
    {
      path: '/coaches/:id',
      name: 'coach',
      props: true,
      component: () => import('@/views/coaches/CoachDetail.vue'),
      children: [
        {
          path: 'contact',
          component: import(() => '@/views/requests/ContactCoach.vue'),
          name: 'contact-coach'
        }
      ]
    },
    {
      path: '/register',
      meta: { requiresAuth: true },
      name: 'register',
      component: () => import('@/views/coaches/CoachesRegistration.vue')
    },
    {
      path: '/requests',
      meta: { requiresAuth: true },
      name: 'requests',
      component: () => import('@/views/requests/RequestsReceived.vue')
    },
    {
      path: '/auth',
      meta: { requiresUnAuth: true },
      name: 'login',
      component: () => import('@/views/auth/UserAuth.vue')
    },
    {
      path: '/:notFound(.*)',
      component: () => import('@/views/NotFound.vue')
    }
  ]
})

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth')
  } else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
    next('/coaches')
  } else {
    next()
  }
})

export default router
