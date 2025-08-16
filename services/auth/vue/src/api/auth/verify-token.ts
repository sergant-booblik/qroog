export interface VerifyTokenResponse {
  success: boolean,
}

export function createVerifyTokenFunction(apiUrl: string): () => Promise<VerifyTokenResponse> {
  const url = new URL(`${apiUrl}/verify-token/`);
  return async (): Promise<VerifyTokenResponse> => {
    const response = await fetch(url.toString(), {
      method: 'GET',
      credentials: 'include',
    });

    const result: VerifyTokenResponse = await response.json();

    if (!response.ok) {
      throw { error: result }
    }

    return result;
  }
}


