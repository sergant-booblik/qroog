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
import { Review } from '@/entity/review';

const { randomUUID } = new ShortUniqueId({ length: 5 });

@Entity()
export class Game {
    @PrimaryColumn('varchar', { default: randomUUID() })
    id!: string;

    @Column()
    title!: string;

    @Column({ default: '' })
    description: string;

    @Column({ default: null })
    image: string;

    @Column({ default: false })
    isPublic: boolean;

    @Column({ type: 'enum', enum: RevealAnswerTiming, enumName: 'revealAnswerTiming', default: RevealAnswerTiming.AFTER_QUESTION })
    revealAnswerTiming: RevealAnswerTiming;

    @Column({ type: 'enum', enum: AnswerLabelStyle, enumName: 'answerLabelStyle', default: AnswerLabelStyle.LATIN })
    answerLabelStyle: AnswerLabelStyle;

    @Column({ default: false })
    hasRounds: boolean;

    @Column({ default: false })
    hasPauseAfterRound: boolean;

    @Column({ type: 'integer', default: 0 })
    pauseAfterRoundSeconds: number;

    @Column({ type: 'integer', default: 1 })
    points: number;

    @Column({ default: false })
    hasPenalty: boolean;

    @Column({ type: 'integer', default: 0 })
    penaltyPoints: number;

    @ManyToOne(() => User, (user) => user.games, { onDelete: 'NO ACTION' })
    @JoinColumn({ name: 'userId' })
    user!: User;

    @ManyToOne(() => Audio, (audio) => audio.games, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'audioId' })
    audio: Audio;

    @OneToMany(() => Question, (question) => question.game)
    questions: Question[];

    @OneToMany(() => Review, (review) => review.game)
    reviews: Review[];

    @ManyToMany(() => Tag, (tag) => tag.games, { cascade: ['insert'] })
    @JoinTable({
        name: 'game_tags',
        joinColumn: { name: 'gameId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' },
    })
    tags: Tag[];

    @ManyToMany(() => User, (user) => user.favoriteGames)
    favoriteBy: User[];

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @DeleteDateColumn()
    deletedDate: Date;
}