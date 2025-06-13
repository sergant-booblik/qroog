import i18next, { type i18n } from 'i18next';
import { type Locale } from '@/types/locale';
import { redis } from '@/config/redis-config';
import * as process from 'node:process';

export async function createI18nInstance(locale: Locale, resources: object): Promise<i18n> {
    const instance = i18next.createInstance();
    await instance.init({
        lng: locale,
        fallbackLng: 'en-US',
        resources: {
            [locale]: {
                translation: resources,
            },
        },
        interpolation: {
            escapeValue: false,
        },
    });

    return instance;
}

export async function getTranslations(locale: string): Promise<any> {
    const cacheKey = `i18n:${locale}`;
    const cachedData = await redis.get(cacheKey);

    if (!cachedData) {
        const url = process.env.TOLGEE_TRANSLATIONS_ENDPOINT as string;
        const xApiKey = process.env.TOLGEE_TRANSLATIONS_ACCESS_KEY as string;
        const res = await fetch(`${url}${locale}`, {
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