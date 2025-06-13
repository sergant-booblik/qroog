import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from '@/entity/game';

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    name: string;

    @ManyToMany(() => Game, (game) => game.tags)
    games: Game[];
}