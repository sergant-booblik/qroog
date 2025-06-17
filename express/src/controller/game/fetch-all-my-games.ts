import { type Request, type Response } from 'express';
import { getUserId } from '@/features/user/get-user-id';
import { appDataSource } from '@/config/orm-config';
import { Game } from '@/entity/game';

const PAGE_SIZE = 12;

export async function fetchAllMyGames(req: Request, res: Response): Promise<void> {
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

        const [games, total] = await gameRepo
            .createQueryBuilder('game')
            .leftJoinAndSelect('game.user', 'user')
            .where('user.id = :userId', { userId })
            .orderBy('game.createdDate', 'DESC')
            .skip((page - 1) * PAGE_SIZE)
            .take(PAGE_SIZE)
            .getManyAndCount();

        res.status(200)
            .json({
            data: games,
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