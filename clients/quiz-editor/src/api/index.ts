import {
  createFetchTranslationsFunction,
  type FetchTranslationsRequest,
  type FetchTranslationsResponse,
} from '@/api/translation/fetch-translation.ts'
import {
  createFetchLanguagesFunction,
  type FetchLanguagesResponse,
} from '@/api/translation/fetch-languages.ts'
import {
  createVerifyTokenFunction,
  type VerifyTokenResponse,
} from '@/api/auth/verify-token.ts'
import {
  createRefreshTokenFunction,
  type RefreshTokenResponse,
} from '@/api/auth/refresh-token.ts'
import {
  createFetchProfileFunction,
  type FetchProfileResponse,
} from '@/api/profile/fetch-profile.ts';
import { createLogoutFunction, type LogoutResponse } from '@/api/auth/logout.ts';

interface Api {
  verifyToken: () => Promise<VerifyTokenResponse>,
  refreshToken: () => Promise<RefreshTokenResponse>,
  logout: () => Promise<LogoutResponse>

  fetchProfile: () => Promise<FetchProfileResponse>,

  fetchTranslations: (request: FetchTranslationsRequest) => Promise<FetchTranslationsResponse>;
  fetchLanguages: () => Promise<FetchLanguagesResponse>;
}

function createApi(): Api {
  const apiUrlV1 = import.meta.env.VITE_API_URL;

  return {
    verifyToken: createVerifyTokenFunction(apiUrlV1),
    refreshToken: createRefreshTokenFunction(apiUrlV1),
    logout: createLogoutFunction(apiUrlV1),

    fetchProfile: createFetchProfileFunction(apiUrlV1),

    fetchTranslations: createFetchTranslationsFunction(apiUrlV1),
    fetchLanguages: createFetchLanguagesFunction(apiUrlV1),
  }
}

export const api = createApi();