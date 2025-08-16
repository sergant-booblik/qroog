import transporter from '@/config';
import type { SendVerificationCodeEmailData } from '@/type/email';
import { Translations } from '@libs/shared-types';
import { renderTemplate } from '@/utils/render-template';

export async function sendVerificationCodeEmail(data: SendVerificationCodeEmailData, translations: Translations): Promise<void> {
  const subject = translations['Mail.VerificationCode.subject'];

  await transporter.sendMail({
    to: data.to,
    subject,
    html: renderTemplate(data.type, { code: data.code }, translations),
  });
}