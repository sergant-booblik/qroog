import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Game } from '@/entity/game';
import { Review } from '@/entity/review';

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

    @Column({ default: 'light' })

    @OneToMany(() => Game, (game) => game.user)
    games: Game[];

    @OneToMany(() => Review, (review) => review.user)
    reviews: Review[];

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @DeleteDateColumn()
    deletedDate: Date;
}
