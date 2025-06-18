import { type Request, type Response } from 'express';
import { appDataSource } from '@/config/orm-config';
import { Quiz } from '@/entity/quiz';
import { authorizeUser } from '@/utils/auth';

const PAGE_SIZE = 12;

export async function fetchAllPublicQuizzes(req: Request, res: Response): Promise<void> {
    try {
        const page = Number(req.query.page) || 1;
        const userId = await authorizeUser(req, res);
        if (!userId) return;

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
            quizzes,
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