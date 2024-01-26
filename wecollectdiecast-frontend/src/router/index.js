import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserAccountView from '../views/UserAccountView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/user',
      name: 'user',
      component: UserAccountView,
      props: (route) => ({ username: route.query.u })
    },
  ],
scrollBehavior(to, from, savedPosition)
{
  return { top: 0 };
}
})

export default router
