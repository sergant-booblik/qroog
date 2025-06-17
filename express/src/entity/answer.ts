import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from '@/entity/question';

@Entity()
export class Answer {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title: string;

    @Column({ default: false })
    isTrue: boolean;

    @Column({ default: 0 })
    order: number;

    @ManyToOne(() => Question, (question) => question.answers, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'questionId' })
    question: Question;
}