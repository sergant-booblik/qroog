import { type Request, type Response } from 'express';
import { appDataSource } from '@/config/orm-config';
import { getOwnedQuiz } from '@/utils/quiz';
import { Question } from '@/entity/question';
import { Answer } from '@/entity/answer';
import { getQuizQuestion } from '@/utils/question';

export async function deleteQuestion(req: Request, res: Response): Promise<void> {
    try {
        const quiz = await getOwnedQuiz(req, res);
        const question = await getQuizQuestion(req, res);
        if (!quiz || !question) return;

        const questionRepo = appDataSource.getRepository(Question);
        const answerRepo = appDataSource.getRepository(Answer);

        await answerRepo.softDelete({ question: { id: question.id } });

        await questionRepo.softDelete(question.id);

        res.status(200).json({ message: 'Question deleted' });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete quiz: ${error}` });
    }
}