import { Router } from 'express';
import { fetchQuestions } from '@/controller/question/fetch-questions';
import { updateQuestion } from '@/controller/question/update-question';
import { addQuestion } from '@/controller/question/add-question';
import { deleteQuestion } from '@/controller/question/delete-question';
import answerRoutes from '@/routes/v1/answer';

const questionRoutes = Router({ mergeParams: true });

questionRoutes.get('/', fetchQuestions);
questionRoutes.post('/', addQuestion);
questionRoutes.patch('/:questionId', updateQuestion);
questionRoutes.delete('/:questionId', deleteQuestion);

questionRoutes.use('/:questionId/answer', answerRoutes);

export default questionRoutes;