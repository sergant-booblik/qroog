import { appDataSource } from './config/orm-config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes';
import dotenv from 'dotenv';
import nodeCron from 'node-cron';
import { LoginCode } from '@/entity/login-code';

dotenv.config();

export const PORT = process.env.EXPRESS_SERVER_PORT;

appDataSource.initialize().then(async () => {
    const app = express();

    app.use(express.json());
    app.use(cookieParser());
    app.use(cors({
        origin: process.env.EXPRESS_SERVER_CORS_ORIGIN,
        credentials: true,
    }));

    app.use('/api', routes);

    app.listen(PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`Listening to port ${PORT}`);
    });

    nodeCron.schedule('*/10 * * * *', async () => {
        const loginCodeRepo = appDataSource.getRepository(LoginCode);
        await loginCodeRepo
            .createQueryBuilder()
            .delete()
            .where('expiresAt < :now', { now: new Date() })
            .orWhere('used = :used', { used: true })
            .execute();
        });
}).catch((error) => {
    throw new Error(error);
});