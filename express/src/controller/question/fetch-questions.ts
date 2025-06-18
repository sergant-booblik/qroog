import { type Request, type Response } from 'express';
import { getUserId } from '@/features/user/get-user-id';
import { appDataSource } from '@/config/orm-config';
import { Quiz } from '@/entity/quiz';
import { Question } from '@/entity/question';

export async function fetchQuestions(req: Request, res: Response): Promise<void> {
    try {
        const quizId = req.params.quizId;
        const routeUserId = Number(req.params.userId);
        const accessToken = req.cookies['accessToken'];
        const userId = await getUserId(accessToken);

        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const quizRepo = appDataSource.getRepository(Quiz);

        const quiz = await quizRepo.findOne({
            where: { id: quizId },
            relations: ['user'],
        });

        if (!quiz) {
            res.status(404).json({ error: 'Quiz not found' });
            return;
        }

        const isOwner = quiz.user.id === userId && routeUserId === userId;
        const isPublic = quiz.isPublic;

        if (!isOwner && !isPublic) {
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

        const groupedByRound = questions.reduce((acc, question) => {
            const round = question.round;
            if (!acc[round]) {
                acc[round] = [];
            }
            acc[round].push(question);
            return acc;
        }, {} as Record<number, Question[]>);

        const rounds = Object.entries(groupedByRound).map(([round, questions]) => ({
            round: Number(round),
            questions,
        }));

        res.status(200).json({ data: rounds });
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch questions: ${error}` });
    }
}