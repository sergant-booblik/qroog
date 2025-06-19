import { type Request, type Response } from 'express';
import { authorizeUser } from '@/utils/auth';
import { appDataSource } from '@/config/orm-config';
import { Review } from '@/entity/review';
import { getOwnedQuiz } from '@/utils/quiz';

export async function addReview(req: Request, res: Response): Promise<void> {
    try {
        const userId = await authorizeUser(req, res);
        const quiz = await getOwnedQuiz(req, res);
        if (!userId || !quiz) return;

        const reviewRepo = appDataSource.getRepository(Review);

        const newReview = reviewRepo.create({
            ...req.body.review,
            user: userId,
            quiz: quiz.id,
        });

        await reviewRepo.save(newReview);

        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ error: `Failed to save review: ${error}` });
    }
}