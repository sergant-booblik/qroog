import { type Request, type Response } from 'express';
import { appDataSource } from '@/config/orm-config';
import { Quiz } from '@/entity/quiz';
import { authorizeUser } from '@/utils/auth';
import { getOwnedQuiz } from '@/utils/quiz';
import { Question } from '@/entity/question';
import { Answer } from '@/entity/answer';
import { Review } from '@/entity/review';
import { In } from 'typeorm';
import question from '@/routes/v1/question';

export async function deleteQuiz(req: Request, res: Response): Promise<void> {
    try {
        const userId = await authorizeUser(req, res);
        const quiz = await getOwnedQuiz(req, res);
        if (!userId || !quiz) return;

        const quizRepo = appDataSource.getRepository(Quiz);
        const questionRepo = appDataSource.getRepository(Question);
        const answerRepo = appDataSource.getRepository(Answer);
        const reviewRepo = appDataSource.getRepository(Review);

        const questions = await questionRepo.find({
            where: { quiz: { id: quiz.id } },
        });

        const questionIds = questions.map((question) => question.id);

        if (questionIds.length > 0) {
            await answerRepo.softDelete({ question: { id: In(questionIds) } });
        }

        await questionRepo.softDelete({ quiz: { id: quiz.id } });
        await reviewRepo.softDelete({ quiz: { id: quiz.id } });

        await quizRepo.softDelete(quiz.id);

        res.status(200).json({ message: 'Quiz deleted' });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete quiz: ${error}` });
    }
}