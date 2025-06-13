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

    @Column({ type: 'enum', enum: QuestionType, enumName: 'questionType' })
    type: QuestionType;

    @Column()
    order: number;

    @Column()
    tour: number;

    @Column()
    answerDescription: string;

    @Column()
    answerDescriptionImage: string;

    @Column()
    customResponseTime: number;

    @Column({ default: false })
    hasCustomPoints: boolean;

    @Column({ default: false })
    hasAllIn: boolean;

    @ManyToOne(() => Game, (game) => game.questions, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'GameId' })
    game: Game;

    @OneToMany(() => Answer, (answer) => answer.question)
    answers: Answer[];
}