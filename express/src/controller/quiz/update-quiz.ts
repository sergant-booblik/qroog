import { type Request, type Response } from 'express';
import { getUserId } from '@/features/user/get-user-id';
import { appDataSource } from '@/config/orm-config';
import { Quiz } from '@/entity/quiz';

export async function updateQuiz(req: Request, res: Response): Promise<void> {
    try {
        const quizId = req.params.quizId;
        const accessToken = req.cookies['accessToken'];
        const userId = await getUserId(accessToken).then((result) => result);
        const routeUserId = Number(req.params.userId);

        if (userId !== routeUserId || !userId) {
            res.status(403).json({ error: 'Failed to fetch quizzes' });
            return;
        }

        const quizRepo = appDataSource.getRepository(Quiz);

        const existingQuiz = await quizRepo.findOne({
            where: { id: quizId },
            relations: ['user'],
        });

        if (!existingQuiz) {
            res.status(404).json({ error: 'Quiz not found' });
            return;
        }

        if (existingQuiz.user.id !== userId) {
            res.status(403).json({ error: 'You do not own this quiz' });
            return;
        }

       await quizRepo.update(quizId, {
            ...req.body.quiz,
        });

        const updatedQuiz = await quizRepo.findOne({
            where: { id: quizId },
        });

        res.status(200).json(updatedQuiz);
    } catch (error) {
        res.status(500).json({ error: `Failed to update quiz: ${error}` });
    }
}