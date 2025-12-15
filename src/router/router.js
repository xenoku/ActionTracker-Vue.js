import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/components/MainView.vue'
import ActivitiesView from '@/components/ActivitiesView.vue'
import SessionsView from '@/components/SessionsView.vue'
const routes = [
  {
    path: '/',
    component: MainView,
  },
  {
    path: '/activities',
    component: ActivitiesView,
  },
  {
    path: '/sessions',
    component: SessionsView,
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router
