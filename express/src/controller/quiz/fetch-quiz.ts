import { type Request, type Response } from 'express';
import { getUserId } from '@/features/user/get-user-id';
import { appDataSource } from '@/config/orm-config';
import { Quiz } from '@/entity/quiz';
import { Brackets } from 'typeorm';

export async function fetchQuiz(req: Request, res: Response): Promise<void> {
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

        const quiz = await quizRepo
            .createQueryBuilder('quiz')
            .leftJoinAndSelect('quiz.user', 'owner')
            .leftJoinAndSelect('quiz.tags', 'tag')
            .where('quiz.id = :quizId', { quizId })
            .andWhere(
                new Brackets(qb => {
                    qb.where('quiz.isPublic = true')
                        .orWhere('owner.id = :userId', { userId });
                }),
            )
            .getOne();

        if (!quiz) {
            res.status(404).json({ error: 'Quiz not found or access denied' });
            return;
        }

        res.status(200).json({ data: quiz });
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch quiz: ${error}` });
    }
}