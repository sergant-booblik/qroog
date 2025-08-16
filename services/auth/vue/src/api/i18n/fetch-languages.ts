export interface Language {
  id: string;
  name: string;
  tag: string;
}

export interface FetchLanguagesResponse {
  languages: Language[];
}

export function createFetchLanguagesFunction(apiUrl: string): () => Promise<FetchLanguagesResponse> {
  const url = new URL(`${apiUrl}/languages`);
  return async (): Promise<FetchLanguagesResponse> => {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch languages: ${response.statusText}`);
    }

    return await response.json();
  }
}

