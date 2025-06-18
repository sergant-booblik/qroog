import type { Request, Response } from 'express';
import { appDataSource } from '@/config/orm-config';
import { Question } from '@/entity/question';
import { getOwnedQuiz } from '@/utils/quiz';

export async function addQuestion(req: Request, res: Response): Promise<void> {
    try {
        const quizId = await getOwnedQuiz(req, res);
        if (!quizId) return;

        const questionRepo = appDataSource.getRepository(Question);

        const newQuestion = questionRepo.create({
            ...req.body.question,
            quiz: quizId,
        });

        await questionRepo.save(newQuestion);

        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(500).json({ error: `Failed to save question: ${error}` });
    }
}