import { type Request, type Response } from 'express';
import { appDataSource } from '@/config/orm-config';
import { getOwnedQuiz } from '@/utils/quiz';
import { Question } from '@/entity/question';
import { getQuizQuestion } from '@/utils/question';
import { authorizeUser } from '@/utils/auth';

export async function deleteQuestion(req: Request, res: Response): Promise<void> {
    try {
        const userId = await authorizeUser(req, res);
        const quiz = await getOwnedQuiz(req, res);
        const question = await getQuizQuestion(req, res);
        if (!quiz || !question || !userId) return;

        const questionRepo = appDataSource.getRepository(Question);

        await questionRepo.delete(question.id);

        res.status(200).json({ message: 'Question deleted' });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete quiz: ${error}` });
    }
}