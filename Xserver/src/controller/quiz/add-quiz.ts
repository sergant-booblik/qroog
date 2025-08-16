import type { Request, Response } from 'express';
import { appDataSource } from '@/config/orm-config';
import { Quiz } from '@/entity/quiz';
import { authorizeUser } from '@/utils/auth';

export async function addQuiz(req: Request, res: Response): Promise<void> {
    try {
        const userId = await authorizeUser(req, res);
        if (!userId) return;

        const quizRepo = appDataSource.getRepository(Quiz);

        const newQuiz = quizRepo.create({
            ...req.body.quiz,
            user: userId,
        });

        await quizRepo.save(newQuiz);

        res.status(201).json(newQuiz);
    } catch (error) {
        res.status(500).json({ error: `Failed to save quiz: ${error}` });
    }
}