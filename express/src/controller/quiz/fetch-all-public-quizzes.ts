import { type Request, type Response } from 'express';
import { getUserId } from '@/features/user/get-user-id';
import { appDataSource } from '@/config/orm-config';
import { Quiz } from '@/entity/quiz';

const PAGE_SIZE = 12;

export async function fetchAllPublicQuizzes(req: Request, res: Response): Promise<void> {
    try {
        const page = Number(req.query.page) || 1;
        const accessToken = req.cookies['accessToken'];
        const userId = await getUserId(accessToken).then((result) => result);
        const routeUserId = Number(req.params.userId);

        if (userId !== routeUserId || !userId) {
            res.status(403).json({ error: 'Failed to fetch quizzes' });
            return;
        }

        const quizRepo = appDataSource.getRepository(Quiz);

        const [quizzes, total] = await quizRepo
            .createQueryBuilder('quiz')
            .leftJoinAndSelect('quiz.user', 'user')
            .where('quiz.isPublic = :public', { public: true })
            .orWhere('user.id = :userId', { userId })
            .orderBy('quiz.createdDate', 'DESC')
            .skip((page - 1) * PAGE_SIZE)
            .take(PAGE_SIZE)
            .getManyAndCount();

        res.status(200)
            .json({
            data: quizzes,
            pagination: {
                total,
                page,
                pageSize: PAGE_SIZE,
                totalPages: Math.ceil(total / PAGE_SIZE),
            },
        });
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch quizzes: ${error}` });
    }
}