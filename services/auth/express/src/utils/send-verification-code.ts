import { Locale } from '@libs/shared-types';
import dotenv from 'dotenv';

dotenv.config({ path: '../../../.env' });

export async function sendVerificationCode(code: string, locale: Locale, to: string): Promise<Response> {
  const data = {
    type: 'send-verification-code',
    to,
    locale,
    code,
  }

  const mailerUrl = process.env.MAILER_API_URL!;

  return await fetch(`${mailerUrl}/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  });
}
