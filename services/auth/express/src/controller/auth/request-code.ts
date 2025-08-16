import ShortUniqueId from 'short-unique-id';
import { LoginCode } from '@/entity/login-code';
import { appDataSource } from '@/config/db-config';
import { type Request, type Response } from 'express';
import { type ErrorData } from '@libs/shared-types';
import { validateEmail } from '@/controller/auth/validate-email';
import { sendVerificationCode } from '@/utils/send-verification-code';

export async function requestCode(req: Request, res: Response): Promise<void> {
    const { email, locale } = req.body;

    const errors: ErrorData = {};
    errors.email = validateEmail(email);

    const loginCodeRep = appDataSource.getRepository(LoginCode);

    const existingCode = await loginCodeRep.findOne({
      where: { email, used: false },
    });

    // if (existingCode && existingCode.expiresAt.getTime() - Date.now() > 0) {
    //   res.status(429).send({
    //     success: false,
    //     errors: { email: [{ label: 'Error.Auth.CodeRequest.tooFrequent' }] },
    //   });
    //   return;
    // }

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
  loginCode.expiresAt = new Date(Date.now() + 3 * 60 * 1000);

  await loginCodeRep.save(loginCode);

  try {
    const fetchResponse = await sendVerificationCode(code, locale, email);

    if (!fetchResponse.ok) {
      res.status(500).send({
        success: false,
        error: 'Failed to send verification code',
      });

      return;
    }

    res.status(200).send({
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
    });
  }
}