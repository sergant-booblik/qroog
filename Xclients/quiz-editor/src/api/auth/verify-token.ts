export interface VerifyTokenResponse {
  success: boolean,
}

export function createVerifyTokenFunction(apiUrl: string): () => Promise<VerifyTokenResponse> {
  const url = new URL(`${apiUrl}/verify-token/`);
  return (): Promise<VerifyTokenResponse> => fetch(url.toString(), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((resp) => resp.json())
    .then((resp: VerifyTokenResponse) => resp);
}