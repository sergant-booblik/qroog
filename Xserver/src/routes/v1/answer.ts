import { Router } from 'express';
import { addAnswer } from '@/controller/answer/add-answer';
import { updateAnswer } from '@/controller/answer/update-answer';
import { deleteAnswer } from '@/controller/answer/delete-answer';

const answerRoutes = Router({ mergeParams: true });

answerRoutes.post('/', addAnswer);
answerRoutes.patch('/:answerId', updateAnswer);
answerRoutes.delete('/:answerId', deleteAnswer);

export default answerRoutes;