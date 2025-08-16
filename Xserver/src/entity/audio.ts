import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Quiz } from '@/entity/quiz';

@Entity()
export class Audio {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    url: string;

    @Column()
    title: string;

    @OneToMany(() => Quiz, (quiz) => quiz.audio)
    quizzes: Quiz[];
}