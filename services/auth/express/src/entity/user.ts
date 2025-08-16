import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Theme } from '@libs/shared-types';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column()
    username!: string;

    @Column({ default: '' })
    fullName: string;

    @Column({ default: '' })
    location: string;

    @Column({ type: 'varchar', default: '' })
    imageUrl: string | null;

    @Column({ default: false })
    isBlocked: boolean;

    @Column({ default: 'en-US' })
    locale: string;

    @Column({ type: 'enum', enum: Theme, enumName: 'theme', default: 'light' })
    theme: Theme;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @DeleteDateColumn()
    deletedDate: Date;
}
