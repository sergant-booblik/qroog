import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Question } from '@/entity/question';

@Entity()
export class Answer {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title: string;

    @Column({ default: false })
    isTrue: boolean;

    @Column({ type: 'int', nullable: true })
    order: number | null;

    @ManyToOne(() => Question, (question) => question.answers, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'questionId' })
    question: Question;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}