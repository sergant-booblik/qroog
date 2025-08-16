import { createI18n, useI18n } from 'vue-i18n';
import type { Locale } from '@libs/shared-types';

export const LOCALE_STORAGE_KEY = 'locale';

export function useSmartT() {
  const { t } = useI18n();

  return function smartT(key: string, values?: Record<string, any>): string {
    const message = t(key);

    if (values && Object.keys(values).length > 0) {
      try {
        // Simple interpolation for now
        return message.replace(/\{(\w+)\}/g, (_, key) => values[key] || '');
      } catch (error) {
        console.warn(`Failed to format message for key "${key}":`, error);
        return message;
      }
    }

    return message;
  };
}

export function calculateCurrentLocale(): Locale {
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored && ['en-US', 'ru-RU'].includes(stored)) {
    return stored as Locale;
  }

  const browserLang = navigator.language;
  if (browserLang.startsWith('ru')) {
    return 'ru-RU';
  }

  return 'en-US';
}

export const pluralizationRule = (choice: number): number => {
  if (choice === 0) return 0;
  if (choice === 1) return 1;
  return 2;
};

const i18n = createI18n({
  legacy: false,
  locale: calculateCurrentLocale(),
  fallbackLocale: 'en-US' as Locale,
  pluralizationRules: {
    'ru-RU': pluralizationRule,
  },
  messages: {
    'en-US': {
      'Website.Hero.title': 'Welcome to Qroog',
      'Website.Hero.subtitle': 'Your ultimate learning platform',
      'Website.Hero.cta': 'Get Started',
      'Website.Features.title': 'Features',
      'Website.Features.learning': 'Interactive Learning',
      'Website.Features.community': 'Community',
      'Website.Features.progress': 'Track Progress',
      'Website.About.title': 'About Qroog',
      'Website.About.description': 'Qroog is a modern learning platform designed to make education engaging and effective.',
      'Header.Menu.Button.Login.title': 'Sign In',
    },
    'ru-RU': {
      'Website.Hero.title': 'Добро пожаловать в Qroog',
      'Website.Hero.subtitle': 'Ваша идеальная платформа для обучения',
      'Website.Hero.cta': 'Начать',
      'Website.Features.title': 'Возможности',
      'Website.Features.learning': 'Интерактивное обучение',
      'Website.Features.community': 'Сообщество',
      'Website.Features.progress': 'Отслеживание прогресса',
      'Website.About.title': 'О Qroog',
      'Website.About.description': 'Qroog — это современная платформа обучения, созданная для того, чтобы сделать образование увлекательным и эффективным.',
      'Header.Menu.Button.Login.title': 'Войти',
    }
  }
});

export async function setLocale(locale: Locale): Promise<void> {
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  i18n.global.locale.value = locale;
}

export async function initI18n(): Promise<void> {
  console.log('i18n initialized for website service');
}

export default i18n;
