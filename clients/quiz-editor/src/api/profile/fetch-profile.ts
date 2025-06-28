import type { Profile } from '@/type/profile';

export interface FetchProfileResponse {
  profile: Profile,
}

export function createFetchProfileFunction(apiUrl: string): () => Promise<FetchProfileResponse> {
  const url = new URL(`${apiUrl}/1/profile/my/`);
  return (): Promise<FetchProfileResponse> => fetch(url.toString(), {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((resp) => resp.json())
    .then((resp: FetchProfileResponse) => resp);
}