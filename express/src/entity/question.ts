import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from '@/entity/game';
import { Answer } from '@/entity/answer';
import { QuestionType } from '@/types/question';

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title: string;

    @Column({ default: null })
    image: string;

    @Column({ type: 'enum', enum: QuestionType, enumName: 'questionType', default: QuestionType.CLASSIC })
    type: QuestionType;

    @Column({ default: null })
    round: number;

    @Column({ default: 0 })
    orderInRound: number;

    @Column({ default: '' })
    answerDescription: string;

    @Column({ default: null })
    answerDescriptionImage: string;

    @Column({ default: null })
    customResponseTime: number;

    @Column({ default: false })
    hasCustomPoints: boolean;

    @Column({ default: false })
    hasAllIn: boolean;

    @ManyToOne(() => Game, (game) => game.questions, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'gameId' })
    game: Game;

    @OneToMany(() => Answer, (answer) => answer.question)
    answers: Answer[];
}