import type { Request, Response } from 'express';
import { appDataSource } from '@/config/orm-config';
import { Game } from '@/entity/game';
import { getUserId } from '@/features/user/get-user-id';

export async function addGame(req: Request, res: Response): Promise<void> {
    try {
        const accessToken = req.cookies['accessToken'];
        const userId = await getUserId(accessToken).then((result) => result);
        const routeUserId = Number(req.params.userId);

        if (userId !== routeUserId) {
            res.status(401).json({ error: 'Failed to save game' });
        }

        const gameRepo = appDataSource.getRepository(Game);

        const newGame = gameRepo.create({
            ...req.body.game,
            user: userId,
        });

        await gameRepo.save(newGame);

        res.status(201).json(newGame);
    } catch (error) {
        res.status(500).json({ error: `Failed to save game: ${error}` });
    }
}