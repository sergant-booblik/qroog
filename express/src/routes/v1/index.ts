import { Router } from 'express';
import authRoutes from '@/routes/v1/auth';

const routesV1 = Router();

routesV1.use('/auth', authRoutes);

export default routesV1;