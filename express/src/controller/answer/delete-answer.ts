import { type Request, type Response } from 'express';
import { appDataSource } from '@/config/orm-config';
import { Answer } from '@/entity/answer';
import { getQuizQuestion } from '@/utils/question';
import { getQuestionAnswer } from '@/utils/answer';

export async function deleteAnswer(req: Request, res: Response): Promise<void> {
    try {
        const question = await getQuizQuestion(req, res);
        const answer = await getQuestionAnswer(req, res);
        if (!question || !answer) return;

        const answerRepo = appDataSource.getRepository(Answer);

        await answerRepo.softDelete(answer.id);

        res.status(200).json({ message: 'Answer deleted' });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete answer: ${error}` });
    }
}