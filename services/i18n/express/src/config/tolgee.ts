import { redis } from '@/config/redis';
import * as process from 'node:process';

export async function getTranslations(locale: string): Promise<any> {
  const cacheKey = `i18n:${locale}`;
  const cachedData = await redis.get(cacheKey);

  if (!cachedData) {
    const url = process.env.TOLGEE_TRANSLATIONS_ENDPOINT as string;
    const xApiKey = process.env.TOLGEE_TRANSLATIONS_ACCESS_KEY as string;
    const res = await fetch(`${url}${locale}?structureDelimiter`, {
      headers: {
        'Accept': 'application/json',
        'X-API-Key': xApiKey,
      },
    });
    if (!res.ok) throw new Error(`Failed to fetch translations: ${res.status}`);

    const json = await res.json();

    await redis.set(cacheKey, JSON.stringify(json[locale]), 'EX', 60 );
    return json[locale];
  }

  return JSON.parse(cachedData);
}