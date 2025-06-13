import { Router } from 'express';
import authRoutes from '@/routes/v1/auth';
import gameRoutes from '@/routes/v1/game';

const routesV1 = Router();

routesV1.use('/auth', authRoutes);
routesV1.use('/:userId/game', gameRoutes);

export default routesV1;