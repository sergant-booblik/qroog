import { type Request, type Response } from 'express';
import { appDataSource } from '@/config/orm-config';
import { Quiz } from '@/entity/quiz';
import { Brackets } from 'typeorm';
import { authorizeUser } from '@/utils/auth';

const PAGE_SIZE = 12;

export async function fetchFavoritesQuizzes(req: Request, res: Response): Promise<void> {
    try {
        const page = Number(req.query.page) || 1;
        const userId = await authorizeUser(req, res);
        if (!userId) return;

        const quizRepo = appDataSource.getRepository(Quiz);

        const [favorites, total] = await quizRepo
            .createQueryBuilder('quiz')
            .leftJoin('quiz.favoriteBy', 'user')
            .leftJoinAndSelect('quiz.user', 'owner')
            .where('user.id = :userId', { userId })
            .andWhere(
                new Brackets(qb => {
                    qb.where('quiz.isPublic = true')
                        .orWhere('owner.id = :userId', { userId });
                }),
            )
            .orderBy('quiz.createdDate', 'DESC')
            .skip((page - 1) * PAGE_SIZE)
            .take(PAGE_SIZE)
            .getManyAndCount();

        res.status(200)
            .json({
                quizzes: favorites,
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