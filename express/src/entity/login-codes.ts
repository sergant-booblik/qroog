import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LoginCode {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    email: string;

    @Column()
    code: string;

    @Column()
    expiresAt: Date;

    @Column({ default: false })
    used: boolean;
}