export interface RefreshTokenResponse {
  success: boolean,
}

export function createRefreshTokenFunction(apiUrl: string): () => Promise<RefreshTokenResponse> {
  const url = new URL(`${apiUrl}/refresh-token/`);
  return async (): Promise<RefreshTokenResponse> => {
    const response = await fetch(url.toString(), {
      method: 'GET',
      credentials: 'include',
    });

    const result: RefreshTokenResponse = await response.json();

    if (!response.ok) {
      throw { error: result }
    }

    return result;
  }
}


