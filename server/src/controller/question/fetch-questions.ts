import { type Request, type Response } from 'express';
import { appDataSource } from '@/config/orm-config';
import { Quiz } from '@/entity/quiz';
import { Question } from '@/entity/question';
import { authorizeUser } from '@/utils/auth';
import { groupQuestion } from '@/utils/group-question';

export async function fetchQuestions(req: Request, res: Response): Promise<void> {
    try {
        const quizId = req.params.quizId;
        const userId = await authorizeUser(req, res);
        if (!userId) return;

        const quizRepo = appDataSource.getRepository(Quiz);

        const quiz = await quizRepo.findOne({
            where: { id: quizId },
            relations: ['user'],
        });

        if (!quiz) {
            res.status(404).json({ error: 'Quiz not found' });
            return;
        }

        if (!quiz.isPublic) {
            res.status(403).json({ error: 'Access denied' });
            return;
        }

        const questionRepo = appDataSource.getRepository(Question);
        const questions = await questionRepo.find({
            where: { quiz: { id: quizId } },
            order: {
                round: 'ASC',
                orderInRound: 'ASC',
            },
        });

        const groupedQuestions = groupQuestion(questions);

        res.status(200).json({ groupedQuestions });
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch questions: ${error}` });
    }
}