import ShortUniqueId from 'short-unique-id';
import { LoginCode } from '@/entity/login-code';
import { appDataSource } from '@/config/orm-config';
import { sendEmail } from '@/features/mail/send-email';
import { type Request, type Response } from 'express';
import { EmailType } from '@/types/email';
import { type ErrorData } from '@/types/error';
import { validateEmail } from '@/controller/auth/validate-email';

export async function requestCode(req: Request, res: Response): Promise<void> {
    const { email, locale } = req.body;

    const errors: ErrorData = {};
    errors.email = validateEmail(email);

    const loginCodeRep = appDataSource.getRepository(LoginCode);

    const existingCode = await loginCodeRep.findOne({
      where: { email },
    });

    if (existingCode && existingCode.expiresAt.getTime() - Date.now() > 0) {
      const timeLeftMs = existingCode.expiresAt.getTime() - Date.now();
      const timeLeftMinutes = Math.ceil(timeLeftMs / 60000);
      res.status(429).send({
        success: false,
        errors: { email: [ { label: 'Error.Auth.CodeRequest.tooFrequent', params: { time: timeLeftMinutes } } ] },
      });
      return;
    }

    if (errors.email.length > 0) {
      res.status(400).send({
        success: false,
        errors,
      });
      return;
    }

  const uid = new ShortUniqueId({
    dictionary: 'number',
  });

  const code = uid.randomUUID(5);

  const loginCode = new LoginCode();

  loginCode.email = email;
  loginCode.code = code;
  loginCode.expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await loginCodeRep.save(loginCode);

  await sendEmail({
    type: EmailType.SEND_VERIFICATION_CODE,
    to: email,
    code,
    locale,
  });

  res.status(200).send({
    success: true,
  });
}