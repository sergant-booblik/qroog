import { Router } from 'express';
import { requestCode } from '@/controller/auth/request-code';
import { verifyCode } from '@/controller/auth/verify-code';
import { refreshToken, verifyToken } from '@/controller/auth/cookies-and-tokens';
import { logout } from '@/controller/auth/logout';

const authRoutes = Router();

authRoutes.post('/request-code/', requestCode);
authRoutes.post('/verify-code/', verifyCode);
authRoutes.post('/verify-token/', verifyToken);
authRoutes.post('/refresh-token/', refreshToken);
authRoutes.get('/logout/', logout);

export default authRoutes;