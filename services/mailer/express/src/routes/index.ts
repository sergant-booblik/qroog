import { Router } from 'express';
import { sendEmail } from '@/controller/send-email';

const router = Router();

router.post('/send', sendEmail);

export default router;