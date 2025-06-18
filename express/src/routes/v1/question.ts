import { Router } from 'express';
import { fetchQuestions } from '@/controller/question/fetch-questions';

const questionRoutes = Router({ mergeParams: true });

questionRoutes.get('/questions', fetchQuestions);

export default questionRoutes;