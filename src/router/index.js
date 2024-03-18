import { createRouter, createWebHistory } from 'vue-router'

import CoachDetail from '@/views/coaches/CoachDetail.vue'
import CoachesList from '@/views/coaches/CoachesList.vue'
import CoachesRegistration from '@/views/coaches/CoachesRegistration.vue'
import ContactCoach from '@/views/requests/ContactCoach.vue'
import RequestsReceived from '@/views/requests/RequestsReceived.vue'
import NotFound from '@/views/NotFound.vue'
import UserAuth from '@/views/auth/UserAuth.vue'
import store from '@/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/coaches' },
    {
      path: '/coaches',
      name: 'coaches',
      component: CoachesList
    },
    {
      path: '/coaches/:id',
      name: 'coach',
      props: true,
      component: CoachDetail,
      children: [{ path: 'contact', component: ContactCoach }]
    },
    {
      path: '/register',
      meta: { requiresAuth: true },
      name: 'register',
      component: CoachesRegistration
    },
    {
      path: '/requests',
      meta: { requiresAuth: true },
      name: 'requests',
      component: RequestsReceived
    },
    {
      path: '/auth',
      meta: { requiresUnAuth: true },
      name: 'login',
      component: UserAuth
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
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
