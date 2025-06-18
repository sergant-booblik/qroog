import { Router } from 'express';
import { addQuiz } from '@/controller/quiz/add-quiz';
import { fetchAllPublicQuizzes } from '@/controller/quiz/fetch-all-public-quizzes';
import { fetchAllMyQuizzes } from '@/controller/quiz/fetch-all-my-quizzes';
import { fetchFavoritesQuizzes } from '@/controller/quiz/fetch-favorites-quizzes';
import { fetchQuiz } from '@/controller/quiz/fetch-quiz';
import { updateQuiz } from '@/controller/quiz/update-quiz';
import { deleteQuiz } from '@/controller/quiz/delete-quiz';
import questionRoutes from '@/routes/v1/question';

const quizRoutes = Router({ mergeParams: true });

quizRoutes.get('/', fetchAllPublicQuizzes);
quizRoutes.post('/', addQuiz);
quizRoutes.get('/my', fetchAllMyQuizzes);
quizRoutes.get('/favorites', fetchFavoritesQuizzes);
quizRoutes.get('/:quizId', fetchQuiz);
quizRoutes.patch('/:quizId', updateQuiz);
quizRoutes.delete('/:quizId', deleteQuiz);

quizRoutes.use('/:quizId', questionRoutes);

export default quizRoutes;