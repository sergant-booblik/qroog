import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import DashboardView from '@/views/DashboardView.vue';
import AuthView from '@/views/AuthView.vue';
import ProfileSettingsView from '@/views/ProfileSettingsView.vue';

export enum RouteName {
  HOME = 'HOME',
  AUTH = 'AUTH',
  DASHBOARD = 'DASHBOARD',
  PROFILE_SETTINGS = 'PROFILE_SETTINGS',

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
    path: '/auth',
    name: RouteName.AUTH,
    component: AuthView,
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
  {
    path: '/cp',
    meta: { auth: true },
    children: [
      {
        path: '',
        name: RouteName.DASHBOARD,
        component: DashboardView,
      },
      {
        path: '/profile-settings',
        name: RouteName.PROFILE_SETTINGS,
        component: ProfileSettingsView,
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
