import { type Request, type Response } from 'express';
import { getUserId } from '@/features/user/get-user-id';
import { appDataSource } from '@/config/orm-config';
import { Game } from '@/entity/game';
import { Brackets } from 'typeorm';

const PAGE_SIZE = 12;

export async function fetchFavoritesGames(req: Request, res: Response): Promise<void> {
    try {
        const page = Number(req.query.page) || 1;
        const accessToken = req.cookies['accessToken'];
        const userId = await getUserId(accessToken).then((result) => result);
        const routeUserId = Number(req.params.userId);

        if (userId !== routeUserId || !userId) {
            res.status(403).json({ error: 'Failed to fetch games' });
            return;
        }

        const gameRepo = appDataSource.getRepository(Game);

        const [favorites, total] = await gameRepo
            .createQueryBuilder('game')
            .leftJoin('game.favoriteBy', 'user')
            .leftJoinAndSelect('game.user', 'owner')
            .where('user.id = :userId', { userId: routeUserId })
            .andWhere(
                new Brackets(qb => {
                    qb.where('game.isPublic = true')
                        .orWhere('owner.id = :userId', { userId: routeUserId });
                }),
            )
            .orderBy('game.createdDate', 'DESC')
            .skip((page - 1) * PAGE_SIZE)
            .take(PAGE_SIZE)
            .getManyAndCount();

        res.status(200)
            .json({
                data: favorites,
                pagination: {
                    total,
                    page,
                    pageSize: PAGE_SIZE,
                    totalPages: Math.ceil(total / PAGE_SIZE),
                },
            });
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch games: ${error}` });
    }
}