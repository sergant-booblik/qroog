// eslint-disable-next-line no-restricted-imports
import { createI18n, type Locale } from 'vue-i18n';
import { useTranslationStore } from '@/store/translation'
// import { useProfileStore } from '@/store/profile';

export const LOCALE_STORAGE_KEY = 'locale';

export function calculateCurrentLocale(): Locale {
    // const profileStore = useProfileStore();

    // const profileLocale = profileStore.profile?.locale as Locale;
    // if (profileLocale) {
    //     return profileLocale as Locale;
    // }

    const storedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale;
    if (storedLocale) {
        return storedLocale as Locale;
    }

    const browserLocale = navigator.language;

    localStorage.setItem(LOCALE_STORAGE_KEY, browserLocale);
    return browserLocale as Locale;

}

export const pluralizationRule = (choice: number, choicesLength: number): number => {
    if (choicesLength === 1) return 0;

    const lastDigit = choice % 10;
    const lastTwoDigits = choice % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
        return 0;
    } else if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
        return 1;
    } else {
        return 2;
    }
};

const i18n = createI18n({
    legacy: false,
    locale: 'en-US',
    fallbackLocale: 'en-US',
    messages: {},
    pluralRules: {
        ru: pluralizationRule,
    },
});

export async function setLocale(locale: string): Promise<void> {
    const translationStore = useTranslationStore();
    await translationStore.fetchTranslations(locale);
    const localeMessage = translationStore.translations ?? {};
    i18n.global.setLocaleMessage(locale, localeMessage);
    i18n.global.locale.value = locale;
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
}

export async function initI18n(): Promise<void> {
    const locale = calculateCurrentLocale() as Locale;
    const translationStore = useTranslationStore();
    await translationStore.fetchLanguages();
    await translationStore.fetchTranslations(locale);

    const localeMessage = translationStore.translations ?? {};

    i18n.global.setLocaleMessage(locale, localeMessage);
    i18n.global.locale.value = locale;
}

export default i18n;