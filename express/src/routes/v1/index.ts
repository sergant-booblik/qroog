import { Router } from 'express';
import authRoutes from '@/routes/v1/auth';
import quizRoutes from '@/routes/v1/quiz';

const routesV1 = Router();

routesV1.use('/auth', authRoutes);
routesV1.use('/:userId/quiz', quizRoutes);

export default routesV1;