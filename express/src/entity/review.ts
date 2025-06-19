import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from 'typeorm';
import { Quiz } from '@/entity/quiz';
import { User } from '@/entity/user';

@Entity()
@Unique(['user', 'quiz'])
export class Review {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'text' })
    content: string;

    @Column({ type: 'int' })
    rating: number;

    @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Quiz, (quiz) => quiz.reviews, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'quizId' })
    quiz: Quiz;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}