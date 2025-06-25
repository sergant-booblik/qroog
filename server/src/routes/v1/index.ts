import { Router } from 'express';
import authRoutes from '@/routes/v1/auth';
import quizRoutes from '@/routes/v1/quiz';
import tagRoutes from '@/routes/v1/tag';
import reviewRoutes from '@/routes/v1/review';
import translationRoutes from '@/routes/v1/transaltion'

const routesV1 = Router();

routesV1.use('/', translationRoutes);
routesV1.use('/auth', authRoutes);
routesV1.use('/:userId/quiz', quizRoutes);
routesV1.use('/:userId/tag', tagRoutes);
routesV1.use('/:userId/review', reviewRoutes);

export default routesV1;