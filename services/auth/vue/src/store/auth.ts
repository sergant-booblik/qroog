import { defineStore } from 'pinia';
import { api } from '@/api';
import { type ErrorData } from '@libs/shared-types';
import { type VerifyTokenResponse } from '@/api/auth/verify-token';
import { type RefreshTokenResponse } from '@/api/auth/refresh-token';
import type { RequestCodeResponse } from '@/api/auth/send-code';
import { calculateCurrentLocale } from '@/logic/i18n';
import type { VerifyCodeResponse } from '@/api/auth/verify-code';

interface AuthState {
  isAuth: boolean,
  errors: ErrorData | undefined;
  loading: boolean,
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuth: false,
    errors: undefined,
    loading: false,
  }),
  getters: {
    translatedErrors: (state) => {
      if (!state.errors) return undefined;
      
      const translated: Record<string, string[]> = {};
      
      Object.entries(state.errors).forEach(([field, errors]) => {
        if (errors) {
          translated[field] = errors.map(error => {
            // Simple translation mapping - in a real app you'd use i18n
            const translations: Record<string, string> = {
              'email.required': 'Email is required',
              'email.invalid': 'Invalid email format',
              'code.required': 'Verification code is required',
              'code.invalid': 'Invalid verification code',
              'code.expired': 'Verification code has expired',
            };
            return translations[error.label] || error.label;
          });
        }
      });
      
      return translated;
    }
  },
  actions: {
    clearAllErrors(): void {
      this.errors = undefined;
    },
    clearFieldError(field: keyof ErrorData): void {
      if (this.errors) {
        delete this.errors[field];
      }
    },
    async requestCode(email: string): Promise<RequestCodeResponse> {
      this.loading = true;
      this.errors = undefined;
      const locale = calculateCurrentLocale();
      try {
        return await api.requestCode({ email, locale });
      } catch (errors) {
        this.errors = (errors as { error: ErrorData }).error;
        throw errors;
      } finally {
        this.loading = false;
      }
    },
    async verifyCode(email: string, code: string): Promise<VerifyCodeResponse> {
      this.loading = true;
      this.errors = undefined;
      try {
        return await api.verifyCode({ email, code });
      } catch (errors) {
        this.errors = (errors as { error: ErrorData }).error;
        throw errors;
      } finally {
        this.loading = false;
      }
    },
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
    async logout() {
      try {
        await api.logout();
      } catch (e) {
        console.error('Logout error', e);
      } finally {
        this.isAuth = false;
      }
    },
  },
});
