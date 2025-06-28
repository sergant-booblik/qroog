import { Router } from 'express';
import { fetchMyProfile } from '@/controller/profile/fetch-my-profile';

const profileRoutes = Router({ mergeParams: true });

profileRoutes.get('/my', fetchMyProfile);

export default profileRoutes;