import type { VerifyTokenResponse } from '@/api/auth/verify-token.ts'

export interface RefreshTokenResponse {
  success: boolean,
}

export function createRefreshTokenFunction(apiUrl: string): () => Promise<RefreshTokenResponse> {
  const url = new URL(`${apiUrl}/auth/refresh-token/`);
  return (): Promise<RefreshTokenResponse> => fetch(url.toString(), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((resp) => resp.json())
    .then((resp: VerifyTokenResponse) => resp);
}