import type { ErrorData } from '@/type/error.ts';

export interface VerifyCodeRequest {
  email: string,
  code: string,
}

export interface VerifyCodeResponse {
  success: boolean,
  errors?: ErrorData,
}

export function createVerifyCodeFunction(apiUrl: string): (request: VerifyCodeRequest) => Promise<VerifyCodeResponse> {
  const url = new URL(`${apiUrl}/auth/verify-code/`);
  return async (request: VerifyCodeRequest): Promise<VerifyCodeResponse> => {
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(request)
    });

    const result: VerifyCodeResponse = await response.json();

    if (!response.ok) {
      throw { error: result.errors }
    }

    return result;
  }
}