import type { ErrorData } from '@/type/error.ts';

export interface RequestCodeRequest {
  email: string,
  locale: string,
}

export interface RequestCodeResponse {
  success: boolean,
  errors?: ErrorData,
}

export function createRequestCodeFunction(apiUrl: string): (request: RequestCodeRequest) => Promise<RequestCodeResponse> {
  const url = new URL(`${apiUrl}/auth/request-code/`);
  return async (request: RequestCodeRequest): Promise<RequestCodeResponse> => {
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });

    const result: RequestCodeResponse = await response.json();

    if (!response.ok) {
      throw { error: result.errors }
    }

    return result;
  }
}