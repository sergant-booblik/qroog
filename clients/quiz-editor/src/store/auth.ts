import { defineStore } from 'pinia';
import { api } from '@/api';
import { useProfileStore } from '@/store/profile';
import { RouteName } from '@/router';
import { type ErrorData } from '@/type/error';
import { type VerifyTokenResponse } from '@/api/auth/verify-token';
import { type RefreshTokenResponse } from '@/api/auth/refresh-token';
import { type Router } from 'vue-router';

interface AuthState {
  isAuth: boolean,
  errors: ErrorData | undefined;
  loading: boolean,
}

function clearStores(): void {
  const profileStore = useProfileStore();

  profileStore.clearUser();
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuth: false,
    errors: undefined,
    loading: false,
  }),
  actions: {
    async verifyToken(): Promise<VerifyTokenResponse> {
      this.loading = true;
      try {
        const response = await api.verifyToken();
        this.isAuth = response.success;
        return response;
      } finally {
        this.loading = false;
      }
    },
    async refreshToken(): Promise<RefreshTokenResponse> {
      this.loading = true;
      try {
        const response = await api.refreshToken();
        this.isAuth = response.success;
        return response;
      } finally {
        this.loading = false;
      }
    },
    async logout(router: Router) {
      try {
        await api.logout();
      } catch (e) {
        console.error('Logout error', e);
      } finally {
        this.isAuth = false;
        clearStores();
        await router.push({ name: RouteName.AUTH });
      }
    },
  },
});