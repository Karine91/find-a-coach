import { createRouter, createWebHistory } from 'vue-router'

import CoachDetail from '@/views/coaches/CoachDetail.vue'
import CoachesList from '@/views/coaches/CoachesList.vue'
import CoachesRegistration from '@/views/coaches/CoachesRegistration.vue'
import ContactCoach from '@/views/requests/ContactCoach.vue'
import RequestsReceived from '@/views/requests/RequestsReceived.vue'
import NotFound from '@/views/NotFound.vue'

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
      component: CoachDetail,
      children: [{ path: 'contact', component: ContactCoach }]
    },
    {
      path: '/register',
      name: 'register',
      component: CoachesRegistration
    },
    {
      path: '/requests',
      name: 'requests',
      component: RequestsReceived
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ]
})

export default router
