import {
  createFetchTranslationsFunction,
  type FetchTranslationsRequest,
  type FetchTranslationsResponse,
} from '@/api/translation/fetch-translation'
import {
  createFetchLanguagesFunction,
  type FetchLanguagesResponse,
} from '@/api/translation/fetch-languages'
import {
  createVerifyTokenFunction,
  type VerifyTokenResponse,
} from '@/api/auth/verify-token'
import {
  createRefreshTokenFunction,
  type RefreshTokenResponse,
} from '@/api/auth/refresh-token'
import {
  createFetchProfileFunction,
  type FetchProfileResponse,
} from '@/api/profile/fetch-profile';
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
  createUploadProfileImageFunction,
  type UploadProfileImageRequest,
  type UploadProfileImageResponse,
} from '@/api/profile/upload-profile-image';
import {
  createUpdateProfileFunction,
  type UpdateProfileRequest,
  type UpdateProfileResponse,
} from '@/api/profile/update-profile';

interface Api {
  requestCode: (request: RequestCodeRequest) => Promise<RequestCodeResponse>,
  verifyCode: (request: VerifyCodeRequest) => Promise<VerifyCodeResponse>,
  verifyToken: () => Promise<VerifyTokenResponse>,
  refreshToken: () => Promise<RefreshTokenResponse>,
  logout: () => Promise<LogoutResponse>

  fetchProfile: () => Promise<FetchProfileResponse>,
  updateProfile: (request: UpdateProfileRequest) => Promise<UpdateProfileResponse>,
  uploadProfileImage: (request: UploadProfileImageRequest) => Promise<UploadProfileImageResponse>,

  fetchTranslations: (request: FetchTranslationsRequest) => Promise<FetchTranslationsResponse>;
  fetchLanguages: () => Promise<FetchLanguagesResponse>;
}

function createApi(): Api {
  const apiUrlV1 = import.meta.env.VITE_API_URL;

  return {
    requestCode: createRequestCodeFunction(apiUrlV1),
    verifyCode: createVerifyCodeFunction(apiUrlV1),
    verifyToken: createVerifyTokenFunction(apiUrlV1),
    refreshToken: createRefreshTokenFunction(apiUrlV1),
    logout: createLogoutFunction(apiUrlV1),

    fetchProfile: createFetchProfileFunction(apiUrlV1),
    updateProfile: createUpdateProfileFunction(apiUrlV1),
    uploadProfileImage: createUploadProfileImageFunction(apiUrlV1),

    fetchTranslations: createFetchTranslationsFunction(apiUrlV1),
    fetchLanguages: createFetchLanguagesFunction(apiUrlV1),
  }
}

export const api = createApi();