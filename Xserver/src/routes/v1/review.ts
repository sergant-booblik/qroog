import { Router } from 'express';
import { addReview } from '@/controller/review/add-review';

const reviewRoutes = Router({ mergeParams: true });

reviewRoutes.post('/', addReview);

export default reviewRoutes;