import type { Language } from '@/type/translation.ts'

export interface FetchLanguagesResponse {
  languages: Language[],
}

export function createFetchLanguagesFunction(
  apiUrl: string,
): () => Promise<FetchLanguagesResponse> {
  return (): Promise<FetchLanguagesResponse> => {
    const url = new URL(`${apiUrl}/languages`);
    return fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((resp) => resp.json())
      .then((resp: FetchLanguagesResponse) => resp);
  };
}