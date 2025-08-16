import { type Locale, EmailType } from '@libs/shared-types';

export interface TemplateData {
    [key: string]: string;
}

export type EmailDataBase = {
    type: EmailType,
    to: string,
    locale: Locale;
}

export type EmailData = SendVerificationCodeEmailData;

export interface SendVerificationCodeEmailData extends EmailDataBase {
    code: string,
}