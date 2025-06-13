import { readFileSync } from 'fs';
import transporter from '@/config/nodemailer-config';
import { type EmailData, EmailType, type SendVerificationCodeEmailData, type TemplateData } from '@/types/email';
import * as path from 'node:path';
import { createI18nInstance, getTranslations } from '@/config/i18n-config';
import { type Translations } from '@/types/locale';
import { type i18n } from 'i18next';

function getNestedValue(obj: any, path: string): string | undefined {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

function interpolate(template: string, data: TemplateData): string {
    return template.replace(/\{ *(\w+) *}/g, (_, key) => data[key] || '');
}

function renderTemplate(type: EmailType, data: TemplateData, translations: Translations): string {
    const template = readFileSync(path.join(__dirname, '../../../resources/email', `${type}.html`), 'utf-8');

    const preTranslatedTemplate = template.replace(/\{\{t:([\w.]+)}}/g, (_, key) => {
        const value = getNestedValue(translations, key);
        return typeof value === 'string' ? interpolate(value, data) : '';
    });

    return preTranslatedTemplate.replace(/\{\{(\w+)}}/g, (_, key) => data[key] || '');
}

async function sendVerificationCodeEmail(data: SendVerificationCodeEmailData, i18next: i18n, translations: Translations): Promise<void> {
    const t = i18next.t;
    await transporter.sendMail({
        to: data.to,
        subject: t('Mail.VerificationCode.subject'),
        html: renderTemplate(data.type, { code: data.code }, translations),
    });
}

export async function sendEmail(data: EmailData): Promise<void> {
    const translations = await getTranslations(data.locale);
    const i18next = await createI18nInstance(data.locale ?? 'en-US', translations);
    switch (data.type) {
        case EmailType.SEND_VERIFICATION_CODE:
            await sendVerificationCodeEmail(data, i18next, translations);
            return;
        default:
            throw new Error('Unknown email type');
    }
}