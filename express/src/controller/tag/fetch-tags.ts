import { type Request, type Response } from 'express';
import { appDataSource } from '@/config/orm-config';
import { authorizeUser } from '@/utils/auth';
import { Tag } from '@/entity/tag';

export async function fetchTags(req: Request, res: Response): Promise<void> {
    try {
        const userId = await authorizeUser(req, res);
        if (!userId) return;

        const tagRepo = appDataSource.getRepository(Tag);

        const tags = await tagRepo
            .createQueryBuilder('tag')
            .leftJoin('tag.quizzes', 'quiz')
            .groupBy('tag.id')
            .addGroupBy('tag.name')
            .select(['tag.id', 'tag.name'])
            .addSelect('COUNT(quiz.id)', 'count')
            .orderBy('count', 'DESC')
            .limit(50)
            .getMany();

        res.status(200).json({ tags });
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch tags: ${error}` });
    }
}