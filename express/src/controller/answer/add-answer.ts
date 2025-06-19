import type { Request, Response } from 'express';
import { appDataSource } from '@/config/orm-config';
import { getQuizQuestion } from '@/utils/question';
import { Answer } from '@/entity/answer';
import { authorizeUser } from '@/utils/auth';

export async function addAnswer(req: Request, res: Response): Promise<void> {
    try {
        const userId = await authorizeUser(req, res);
        const questionId = await getQuizQuestion(req, res);
        if (!userId || !questionId) return;

        const answerRepo = appDataSource.getRepository(Answer);

        const newAnswer = answerRepo.create({
            ...req.body.answer,
            question: questionId,
        });

        await answerRepo.save(newAnswer);

        res.status(201).json(newAnswer);
    } catch (error) {
        res.status(500).json({ error: `Failed to save answer: ${error}` });
    }
}