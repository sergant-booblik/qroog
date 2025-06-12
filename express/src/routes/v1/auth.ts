import { Router } from 'express';
import { requestCode } from '@/controller/auth/request-code';
import { verifyCode } from '@/controller/auth/verify-code';

const authRoutes = Router();

authRoutes.post('/request-code/', requestCode);
authRoutes.post('/verify-code/', verifyCode);

export default authRoutes;