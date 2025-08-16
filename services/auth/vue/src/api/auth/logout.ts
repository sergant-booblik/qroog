export interface LogoutResponse {
  success: boolean,
}

export function createLogoutFunction(apiUrl: string): () => Promise<LogoutResponse> {
  const url = new URL(`${apiUrl}/logout/`);
  return async (): Promise<LogoutResponse> => {
    const response = await fetch(url.toString(), {
      method: 'POST',
      credentials: 'include',
    });

    const result: LogoutResponse = await response.json();

    if (!response.ok) {
      throw { error: result }
    }

    return result;
  }
}


