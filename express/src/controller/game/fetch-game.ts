import { type Request, type Response } from 'express';
import { getUserId } from '@/features/user/get-user-id';
import { appDataSource } from '@/config/orm-config';
import { Game } from '@/entity/game';
import { Brackets } from 'typeorm';

export async function fetchGame(req: Request, res: Response): Promise<void> {
    try {
        const gameId = req.params.id;
        const accessToken = req.cookies['accessToken'];
        const userId = await getUserId(accessToken).then((result) => result);
        const routeUserId = Number(req.params.userId);

        if (userId !== routeUserId || !userId) {
            res.status(403).json({ error: 'Failed to fetch games' });
            return;
        }

        const gameRepo = appDataSource.getRepository(Game);

        const game = await gameRepo
            .createQueryBuilder('game')
            .leftJoinAndSelect('game.user', 'owner')
            .leftJoinAndSelect('game.tags', 'tag')
            .where('game.id = :gameId', { gameId })
            .andWhere(
                new Brackets(qb => {
                    qb.where('game.isPublic = true')
                        .orWhere('owner.id = :userId', { userId });
                }),
            )
            .getOne();

        if (!game) {
            res.status(404).json({ error: 'Game not found or access denied' });
            return;
        }

        res.status(200).json({ data: game });
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch game: ${error}` });
    }
}