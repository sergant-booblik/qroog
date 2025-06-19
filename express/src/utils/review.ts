import { type Request, type Response } from 'express';
import { appDataSource } from '@/config/orm-config';
import { authorizeUser } from '@/utils/auth';
import { Review } from '@/entity/review';

export async function getOwnedReview(req: Request, res: Response): Promise<Review | null> {
    const userId = await authorizeUser(req, res);
    const quizId = req.params.quizId;
    const reviewId = Number(req.params.reviewId);

    const reviewRepo = appDataSource.getRepository(Review);

    const existingReview = await reviewRepo.findOne({
        where: { id: reviewId },
    });

    if (!existingReview) {
        res.status(404).json({ error: 'Review not found' });
        return null;
    }

    if (existingReview.user.id !== userId || existingReview.quiz.id !== quizId) {
        res.status(403).json({ error: 'You do not have access' });
        return null;
    }

    return existingReview;
}
