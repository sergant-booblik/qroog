import type { Request, Response } from 'express';
import { appDataSource } from '@/config/orm-config';
import { Quiz } from '@/entity/quiz';
import { getUserId } from '@/features/user/get-user-id';

export async function addQuiz(req: Request, res: Response): Promise<void> {
    try {
        const accessToken = req.cookies['accessToken'];
        const userId = await getUserId(accessToken).then((result) => result);
        const routeUserId = Number(req.params.userId);

        if (userId !== routeUserId) {
            res.status(403).json({ error: 'Failed to save quiz' });
            return;
        }

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