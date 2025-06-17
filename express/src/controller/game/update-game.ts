import { Request, Response } from 'express';
import { getUserId } from '@/features/user/get-user-id';
import { appDataSource } from '@/config/orm-config';
import { Game } from '@/entity/game';

export async function updateGame(req: Request, res: Response): Promise<void> {
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

        const existingGame = await gameRepo.findOne({
            where: { id: gameId },
            relations: ['user'],
        });

        if (!existingGame) {
            res.status(404).json({ error: 'Game not found' });
            return;
        }

        if (existingGame.user.id !== userId) {
            res.status(403).json({ error: 'You do not own this game' });
            return;
        }

       await gameRepo.update(gameId, {
            ...req.body.game,
        });

        const updatedGame = await gameRepo.findOne({
            where: { id: gameId },
        });

        res.status(200).json(updatedGame);
    } catch (error) {
        res.status(500).json({ error: `Failed to update game: ${error}` });
    }
}