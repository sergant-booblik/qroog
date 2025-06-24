import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Quiz } from '@/entity/quiz';

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    name: string;

    @ManyToMany(() => Quiz, (quiz) => quiz.tags)
    quizzes: Quiz[];
}