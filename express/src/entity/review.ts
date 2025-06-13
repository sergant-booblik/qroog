import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Game } from '@/entity/game';
import { User } from '@/entity/user';

@Entity()
@Unique(['user', 'game'])
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

    @ManyToOne(() => Game, (game) => game.reviews, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'gameId' })
    game: Game;
}