import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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
    theme: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @DeleteDateColumn()
    deletedDate: Date;
}
