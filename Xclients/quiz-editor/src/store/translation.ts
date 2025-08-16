import { defineStore } from 'pinia';
import { api } from '@/api';
import { type Language, type Translations } from '@/type/translation';

export interface TranslationState {
  translations: Translations | undefined,
  languages: Language[],
}

export const useTranslationStore = defineStore('translation', {
  state: (): TranslationState => ({
    translations: undefined,
    languages: [],
  }),
  actions: {
    async fetchTranslations(lang: string) {
      return new Promise((resolve, reject) => {
        api.fetchTranslations({ lang })
          .then((response) => {
            this.translations = response.translations;
            resolve(response);
          }).catch((error) => reject(error));
      });
    },
    async fetchLanguages() {
      return new Promise((resolve, reject) => {
        api.fetchLanguages()
          .then((response) => {
            this.languages = response.languages;
            resolve(response);
          }).catch((error) => reject(error));
      });
    },
  },
});