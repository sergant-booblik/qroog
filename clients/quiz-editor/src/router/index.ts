import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue'

export enum RouteName {
  HOME = 'HOME',

  // not created yet
  PARTNER = 'PARTNER',
  PREMIUM = 'PREMIUM',
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RouteName.HOME,
    component: HomeView,
  },
  {
    path: '/partner',
    name: RouteName.PARTNER,
    component: HomeView,
  },
  {
    path: '/premium',
    name: RouteName.PREMIUM,
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
