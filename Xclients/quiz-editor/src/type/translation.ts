type TranslationValue = { [key: string]: TranslationValue | string };

export type Translations = {
  [key: string]: TranslationValue;
};

export interface Language {
  id: number,
  name: string,
  tag: string,
  originalName: string,
  base: boolean,
}