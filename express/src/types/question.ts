import { type Question } from '@/entity/question';

export enum QuestionType {
    CLASSIC = 'classic',
    OPEN_ANSWER = 'open-answer',
    TRUE_FALSE = 'true-false',
}

export interface GroupedQuestion {
    round: number,
    questions: Question[],
}