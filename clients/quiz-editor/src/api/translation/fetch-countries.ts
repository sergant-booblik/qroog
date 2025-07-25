import { type Country } from '@/type/country';

export interface FetchCountriesResponse {
  countries: Country[],
}

export function createFetchCountriesFunction(
  apiUrl: string,
): () => Promise<FetchCountriesResponse> {
  return (): Promise<FetchCountriesResponse> => {
    const url = new URL(`${apiUrl}/countries`);
    return fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((resp) => resp.json())
      .then((resp: FetchCountriesResponse) => resp);
  };
}