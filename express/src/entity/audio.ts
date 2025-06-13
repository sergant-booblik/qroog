import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from '@/entity/game';

@Entity()
export class Audio {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    url: string;

    @Column()
    title: string;

    @OneToMany(() => Game, (game) => game.audio)
    games: Game[];
}