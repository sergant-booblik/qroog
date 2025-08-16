import {
  createVerifyTokenFunction,
  type VerifyTokenResponse,
} from '@/api/auth/verify-token'
import {
  createRefreshTokenFunction,
  type RefreshTokenResponse,
} from '@/api/auth/refresh-token'
import {
  createLogoutFunction,
  type LogoutResponse,
} from '@/api/auth/logout';
import {
  createRequestCodeFunction,
  type RequestCodeRequest,
  type RequestCodeResponse,
} from '@/api/auth/send-code';
import {
  createVerifyCodeFunction,
  type VerifyCodeRequest,
  type VerifyCodeResponse,
} from '@/api/auth/verify-code';
import {
  createFetchTranslationFunction,
  type FetchTranslationRequest,
  type FetchTranslationResponse,
} from '@/api/i18n/fetch-translation';
import {
  createFetchLanguagesFunction,
  type FetchLanguagesResponse,
} from '@/api/i18n/fetch-languages';
import { authApiUrl } from '@libs/shared-env';

interface Api {
  requestCode: (request: RequestCodeRequest) => Promise<RequestCodeResponse>,
  verifyCode: (request: VerifyCodeRequest) => Promise<VerifyCodeResponse>,
  verifyToken: () => Promise<VerifyTokenResponse>,
  refreshToken: () => Promise<RefreshTokenResponse>,
  logout: () => Promise<LogoutResponse>,
  
  // i18n functions
  fetchTranslations: (request: FetchTranslationRequest) => Promise<FetchTranslationResponse>,
  fetchLanguages: () => Promise<FetchLanguagesResponse>,
}

function createApi(): Api {
  // Using shared environment utility
  return {
    requestCode: createRequestCodeFunction(authApiUrl),
    verifyCode: createVerifyCodeFunction(authApiUrl),
    verifyToken: createVerifyTokenFunction(authApiUrl),
    refreshToken: createRefreshTokenFunction(authApiUrl),
    logout: createLogoutFunction(authApiUrl),
    
    // i18n functions
    fetchTranslations: createFetchTranslationFunction(authApiUrl),
    fetchLanguages: createFetchLanguagesFunction(authApiUrl),
  }
}

export const api = createApi();
