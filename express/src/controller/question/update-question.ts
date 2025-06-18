import { type Request, type Response } from 'express';
import { appDataSource } from '@/config/orm-config';
import { authorizeUser } from '@/utils/auth';
import { getOwnedQuiz } from '@/utils/quiz';
import { getQuizQuestion } from '@/utils/question';
import { Question } from '@/entity/question';

export async function updateQuestion(req: Request, res: Response): Promise<void> {
    try {
        const userId = await authorizeUser(req, res);
        const quiz = await getOwnedQuiz(req, res);
        const question = await getQuizQuestion(req, res);
        if (!userId || !quiz || !question) return;

        const questionRepo = appDataSource.getRepository(Question);

        await questionRepo.update(question.id, {
            ...req.body.question,
        });

        const updatedQuestion = await questionRepo.findOne({
            where: { id: question.id },
        });

        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(500).json({ error: `Failed to update quiz: ${error}` });
    }
}