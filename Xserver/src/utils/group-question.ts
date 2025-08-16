import { type Question } from '@/entity/question';
import { type GroupedQuestion } from '@/types/question';

export function groupQuestion(questions: Question[]): GroupedQuestion[] {
    const groupedByRound = questions.reduce((acc, question) => {
        const round = question.round;
        if (!acc[round]) {
            acc[round] = [];
        }
        acc[round].push(question);
        return acc;
    }, {} as Record<number, Question[]>);

    return Object.entries(groupedByRound).map(([round, questions]) => ({
        round: Number(round),
        questions,
    }));
}