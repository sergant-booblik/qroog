export interface FetchTranslationRequest {
  lang: string;
}

export interface FetchTranslationResponse {
  [key: string]: string;
}

export function createFetchTranslationFunction(apiUrl: string): (request: FetchTranslationRequest) => Promise<FetchTranslationResponse> {
  const url = new URL(`${apiUrl}/translations/`);
  return async (request: FetchTranslationRequest): Promise<FetchTranslationResponse> => {
    const response = await fetch(`${url.toString()}${request.lang}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch translations: ${response.statusText}`);
    }

    return await response.json();
  }
}

