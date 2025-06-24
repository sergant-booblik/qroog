import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinTable, ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Quiz } from '@/entity/quiz';
import { Review } from '@/entity/review';
import { Theme } from '@/types/theme';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column()
    username!: string;

    @Column({ type: 'varchar', default: null })
    imageUrl: string;

    @Column({ default: false })
    isBlocked: boolean;

    @Column({ default: 'en-US' })
    locale: string;

    @Column({ type: 'enum', enum: Theme, enumName: 'theme', default: 'light' })
    theme: Theme;

    @OneToMany(() => Quiz, (quiz) => quiz.user)
    quizzes: Quiz[];

    @OneToMany(() => Review, (review) => review.user)
    reviews: Review[];

    @ManyToMany(() => Quiz, (quiz) => quiz.favoriteBy)
    @JoinTable({
        name: 'user_favorites',
        joinColumn: { name: 'userId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'quizId', referencedColumnName: 'id' },
    })
    favoriteQuizzes: Quiz[];

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @DeleteDateColumn()
    deletedDate: Date;
}
