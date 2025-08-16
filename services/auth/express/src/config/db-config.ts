import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config({ path: '../../../.env' });

export const appDataSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST!,
    port: Number(process.env.POSTGRES_PORT),
    database: process.env.AUTH_DB!,
    username: process.env.AUTH_USER!,
    password: process.env.AUTH_PASSWORD!,
    entities: ['src/entity/**/*.ts'],
    logging: false,
    synchronize: true,
});