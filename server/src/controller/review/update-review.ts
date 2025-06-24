import { type Request, type Response } from 'express';
import { appDataSource } from '@/config/orm-config';
import { authorizeUser } from '@/utils/auth';
import { getOwnedQuiz } from '@/utils/quiz';
import { getOwnedReview } from '@/utils/review';
import { Review } from '@/entity/review';

export async function updateReview(req: Request, res: Response): Promise<void> {
    try {
        const userId = await authorizeUser(req, res);
        const quiz = await getOwnedQuiz(req, res);
        const review = await getOwnedReview(req, res);
        if (!userId || !quiz || !review) return;

        const reviewRepo = appDataSource.getRepository(Review);

        await reviewRepo.update(review.id, {
            ...req.body.review,
        });

        const updatedReview = await reviewRepo.findOne({
            where: { id: review.id },
        });

        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(500).json({ error: `Failed to update quiz: ${error}` });
    }
}