import { beforeEach, describe, it, expect, vi } from 'vitest';
import { createFetchLanguagesFunction } from '@/api/translation/fetch-languages';

describe('createFetchLanguagesFunction', () => {
  const mockApiUrl = 'https://api.example.com/api/v1';

  const mockResponse = {
    languages: [
      {
        id: 0,
        name: 'English',
        tag: 'en-US',
        originalName: 'English',
        base: true,
      },
      {
        id: 1,
        name: 'Russian',
        tag: 'ru-RU',
        originalName: 'Русский',
        base: false,
      },
    ],
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should fetch list of languages', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(mockResponse)
    });
    global.fetch = fetchMock;

    const fetchLanguages = createFetchLanguagesFunction(mockApiUrl);
    const result = await fetchLanguages();

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.com/api/v1/languages',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    expect(result).toEqual(mockResponse);
  });

});