import { Translations } from '@libs/shared-types';
import dotenv from 'dotenv';

dotenv.config({ path: '../../../.env' });

export async function getTranslations(locale: string): Promise<Translations> {
  const i18nServer = process.env.I18N_API_URL!;
  const res = await fetch(`${i18nServer}/translations/${locale}`);
  if (!res.ok) throw new Error('Failed to fetch i18n data');
  return res.json();
}
