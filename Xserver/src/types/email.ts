import { type Locale } from '@/types/locale';

export enum EmailType {
    SEND_VERIFICATION_CODE = 'send-verification-code',
}

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