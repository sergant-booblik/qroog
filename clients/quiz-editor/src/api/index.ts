import {
  createFetchTranslationsFunction,
  type FetchTranslationsRequest,
  type FetchTranslationsResponse,
} from '@/api/translation/fetch-translation.ts'
import {
  createFetchLanguagesFunction,
  type FetchLanguagesResponse,
} from '@/api/translation/fetch-languages.ts'

interface Api {
  fetchTranslations: (request: FetchTranslationsRequest) => Promise<FetchTranslationsResponse>;
  fetchLanguages: () => Promise<FetchLanguagesResponse>;
}

function createApi(): Api {
  const apiUrlV1 = import.meta.env.VITE_API_URL;

  return {
    fetchTranslations: createFetchTranslationsFunction(apiUrlV1),
    fetchLanguages: createFetchLanguagesFunction(apiUrlV1),
  }
}

export const api = createApi();