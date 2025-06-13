import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinColumn, JoinTable, ManyToMany,
    ManyToOne, OneToMany,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';
import ShortUniqueId from 'short-unique-id';
import { User } from '@/entity/user';
import { Question } from '@/entity/question';
import { AnswerLabelStyle, RevealAnswerTiming } from '@/types/game';
import { Audio } from '@/entity/audio';
import { Tag } from '@/entity/tag';

const { randomUUID } = new ShortUniqueId({ length: 5 });

@Entity()
export class Game {
    @PrimaryColumn('varchar', { default: randomUUID() })
    id!: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ default: null })
    image: string;

    @Column({ default: false })
    isPublic: boolean;

    @Column({ type: 'enum', enum: RevealAnswerTiming, enumName: 'revealAnswerTiming' })
    revealAnswerTiming: RevealAnswerTiming;

    @Column({ type: 'enum', enum: AnswerLabelStyle, enumName: 'answerLabelStyle' })
    answerLabelStyle: AnswerLabelStyle;

    @Column({ default: false })
    hasRounds: boolean;

    @Column({ default: false })
    hasPauseAfterRoundSeconds: boolean;

    @Column({ type: 'integer' })
    pauseAfterDurationSeconds: number;

    @Column({ type: 'integer' })
    points: number;

    @Column({ default: false })
    hasPenalty: boolean;

    @Column({ type: 'integer' })
    penaltyPoints: number;

    @ManyToOne(() => User, (user) => user.games, { onDelete: 'NO ACTION' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Audio, (audio) => audio.games, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'audioId' })
    audio: Audio;

    @OneToMany(() => Question, (question) => question.game)
    questions: Question[];

    @ManyToMany(() => Tag, (tag) => tag.games, { cascade: ['insert'] })
    @JoinTable({
        name: 'gameTags',
        joinColumn: { name: 'gameId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' },
    })
    tags: Tag[];

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @DeleteDateColumn()
    deletedDate: Date;
}