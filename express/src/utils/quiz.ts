import { type Request, type Response } from 'express';
import { Quiz } from '@/entity/quiz';
import { appDataSource } from '@/config/orm-config';
import { authorizeUser } from '@/utils/auth';

export async function getOwnedQuiz(req: Request, res: Response): Promise<Quiz | null> {
    const userId = await authorizeUser(req, res);
    const quizId = req.params.quizId;
    const quizRepo = appDataSource.getRepository(Quiz);
    const existingQuiz = await quizRepo.findOne({
        where: { id: quizId },
        relations: ['user'],
    });

    if (!existingQuiz) {
        res.status(404).json({ error: 'Quiz not found' });
        return null;
    }

    if (existingQuiz.user.id !== userId) {
        res.status(403).json({ error: 'You do not own this quiz' });
        return null;
    }

    return existingQuiz;
}
