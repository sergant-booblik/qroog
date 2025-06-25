import type { Translations } from '@/type/translation.ts'

export interface FetchTranslationsRequest {
  lang: string,
}

export interface FetchTranslationsResponse {
  translations: Translations,
}

export function createFetchTranslationsFunction(
  apiUrl: string,
): (request: FetchTranslationsRequest) => Promise<FetchTranslationsResponse> {
  return (request: FetchTranslationsRequest): Promise<FetchTranslationsResponse> => {
    const url = new URL(`${apiUrl}/translations/${request.lang}`);
    return fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((resp) => resp.json())
      .then((resp: FetchTranslationsResponse) => resp);
  };
}