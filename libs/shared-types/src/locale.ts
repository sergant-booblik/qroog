export type Locale = 'ru-RU' | 'en-US';

export type Translations = {
  [key: string]: string;
};

export interface Language {
  id: number,
  name: string,
  tag: string,
  originalName: string,
  base: boolean,
}