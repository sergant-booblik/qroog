import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import AuthView from '@/views/AuthView.vue';

export enum RouteName {
  AUTH = 'AUTH',
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RouteName.AUTH,
    component: AuthView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router


