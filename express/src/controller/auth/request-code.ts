import ShortUniqueId from 'short-unique-id';
import { LoginCode } from '@/entity/login-codes';
import { appDataSource } from '@/config/orm-config';
import { sendEmail } from '@/features/mail/send-email';
import { type Request, type Response } from 'express';
import { EmailType } from '@/types/email';

export async function requestCode(req: Request, res: Response): Promise<void> {
    const { email, locale } = req.body;

    const uid = new ShortUniqueId({
        dictionary: 'number',
    });

    const code = uid.randomUUID(5);

    const loginCode = new LoginCode();

    loginCode.email = email;
    loginCode.code = code;
    loginCode.expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await appDataSource.getRepository(LoginCode).save(loginCode);

    await sendEmail({
        type: EmailType.SEND_VERIFICATION_CODE,
        to: email,
        code,
        locale,
    });

    res.status(200).send({
        success: true,
        message: 'Auth.Code.Send.success',
    });
}