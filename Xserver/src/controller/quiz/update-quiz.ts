import { type Request, type Response } from 'express';
import { appDataSource } from '@/config/orm-config';
import { Quiz } from '@/entity/quiz';
import { authorizeUser } from '@/utils/auth';
import { getOwnedQuiz } from '@/utils/quiz';

export async function updateQuiz(req: Request, res: Response): Promise<void> {
    try {
        const userId = await authorizeUser(req, res);
        const quiz = await getOwnedQuiz(req, res);
        if (!userId || !quiz) return;

        const quizRepo = appDataSource.getRepository(Quiz);

        await quizRepo.update(quiz.id, {
            ...req.body.quiz,
        });

        const updatedQuiz = await quizRepo.findOne({
            where: { id: quiz.id },
        });

        res.status(200).json(updatedQuiz);
    } catch (error) {
        res.status(500).json({ error: `Failed to update quiz: ${error}` });
    }
}