import { type Request, type Response } from 'express';
import { appDataSource } from '@/config/orm-config';
import { Question } from '@/entity/question';

export async function getQuizQuestion(req: Request, res: Response): Promise<Question | null> {
    const questionId = Number(req.params.questionId);

    const questionRepo = appDataSource.getRepository(Question);

    const existingQuestion = await questionRepo.findOne({
        where: { id: questionId },
        relations: ['quiz'],
    });

    if (!existingQuestion) {
        res.status(404).json({ error: 'Question not found' });
        return null;
    }

    return existingQuestion;
}
