import { readFileSync } from 'fs';
import type { TemplateData } from '@/type/email';
import { Translations, EmailType } from '@libs/shared-types';
import * as path from 'node:path';

function interpolate(template: string, data: TemplateData): string {
  return template.replace(/\{ *(\w+) *}/g, (_, key) => data[key] || '');
}

export function renderTemplate(type: EmailType, data: TemplateData, translations: Translations): string {
  const template = readFileSync(path.join(__dirname, '../../resources/email', `${type}.html`), 'utf-8');
  const preTranslatedTemplate = template.replace(/\{\{t:([\w.]+)}}/g, (_, key) => {
    const value = translations[key];
    return interpolate(value, data);
  });

  return preTranslatedTemplate.replace(/\{\{(\w+)}}/g, (_, key) => data[key] || '');
}