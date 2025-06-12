import transporter from '@/config/nodemailer-config';
import { type EmailContentType } from '@/type/email';

export async function sendEmail(content: EmailContentType): Promise<void> {
    await transporter.sendMail({
        to: content.to,
        subject: content.subject,
        text: content.code,
    });
}