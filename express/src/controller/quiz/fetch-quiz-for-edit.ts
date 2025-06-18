import { type Request, type Response } from 'express';
import { appDataSource } from '@/config/orm-config';
import { Quiz } from '@/entity/quiz';
import { Question } from '@/entity/question';
import { authorizeUser } from '@/utils/auth';
import { groupQuestion } from '@/utils/group-question';

export async function fetchQuizForEdit(req: Request, res: Response): Promise<void> {
    try {
        const quizId = req.params.quizId;
        const userId = await authorizeUser(req, res);
        if (!userId) return;

        const quizRepo = appDataSource.getRepository(Quiz);
        const questionRepo = appDataSource.getRepository(Question);

        const quiz = await quizRepo.findOne({
            where: {
                id: quizId,
                user: { id: userId },
            },
            relations: ['tags', 'user'],
        });

        if (!quiz) {
            res.status(404).json({ error: 'Quiz not found' });
            return;
        }

        const questions = await questionRepo.find({
            where: { quiz: { id: quizId } },
            relations: ['answers'],
            order: {
                round: 'ASC',
                orderInRound: 'ASC',
            },
        });

        const groupedQuestions = groupQuestion(questions);

        res.status(200).json({ quiz: { ...quiz, groupedQuestions } });
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch quiz: ${error}` });
    }
}