import { type Request, type Response } from 'express';
import { authorizeUser } from '@/utils/auth';
import { appDataSource } from '@/config/orm-config';
import { Tag } from '@/entity/tag';

export async function addTag(req: Request, res: Response): Promise<void> {
    try {
        const userId = await authorizeUser(req, res);
        if (!userId) return;

        const tagRepo = appDataSource.getRepository(Tag);

        const newTag = tagRepo.create({
            ...req.body.tag,
        });

        await tagRepo.save(newTag);

        res.status(201).json(newTag);
    } catch (error) {
        res.status(500).json({ error: `Failed to save review: ${error}` });
    }
}