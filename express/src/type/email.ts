export enum EmailType {
    SEND_VERIFICATION_CODE = 'send-verification-code',
}

type EmailBasedContentType = {
    type: EmailType,
    to: string,
    subject: string,
    // html: string,
}

interface SendVerificationCodeEmailContentType extends EmailBasedContentType {
    code: string,
}

export type EmailContentType = SendVerificationCodeEmailContentType;