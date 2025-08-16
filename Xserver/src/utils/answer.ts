import { type Request, type Response } from 'express';
import { appDataSource } from '@/config/orm-config';
import { Answer } from '@/entity/answer';

export async function getQuestionAnswer(req: Request, res: Response): Promise<Answer | null> {
    const answerId = Number(req.params.answerId);

    const answerRepo = appDataSource.getRepository(Answer);

    const existingAnswer = await answerRepo.findOne({
        where: { id: answerId },
        relations: ['question'],
    });

    if (!existingAnswer) {
        res.status(404).json({ error: 'Answer not found' });
        return null;
    }

    return existingAnswer;
}
