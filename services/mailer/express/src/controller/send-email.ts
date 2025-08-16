import { Request, Response } from 'express';
import { EmailType } from '@libs/shared-types';
import { sendVerificationCodeEmail } from '@/controller/handlers/send-verification-code';
import { getTranslations } from '@/utils/get-translations';

export async function sendEmail(req: Request, res: Response) {
  const { data } = req.body;

  const translations = await getTranslations(data.locale);

  try {
    switch (data.type) {
      case EmailType.SEND_VERIFICATION_CODE:
        await sendVerificationCodeEmail(data, translations);
        return res.status(200).json({ success: true });
      default:
        return res.status(400).json({ error: 'Invalid email type' });
    }
  } catch (error) {
    console.error('Email error:', error);
    // return res.status(500).json({ error: 'Failed to send email' });
  }
}
