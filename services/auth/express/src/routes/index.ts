import { Router } from 'express';
import { requestCode } from '@/controller/auth/request-code';
import { verifyCode } from '@/controller/auth/verify-code';
import { refreshToken, verifyToken } from '@/controller/auth/cookies-and-tokens';
import { logout } from '@/controller/auth/logout';
import { fetchTranslations } from '@/controller/translation/fetch-translation';
import { fetchLanguages } from '@/controller/translation/fetch-languages';

const router = Router();

// Auth routes
router.post('/request-code/', requestCode);
router.post('/verify-code/', verifyCode);
router.post('/verify-token/', verifyToken);
router.post('/refresh-token/', refreshToken);
router.get('/logout/', logout);

// Translation routes (proxied to i18n service)
router.get('/translations/:lang', fetchTranslations);
router.get('/languages', fetchLanguages);

export default router;
