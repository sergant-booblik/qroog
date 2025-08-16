import { appDataSource } from './config/db-config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes';
import dotenv from 'dotenv';
import nodeCron from 'node-cron';
import { LoginCode } from '@/entity/login-code';
import * as process from 'node:process';

dotenv.config({ path: '../../../.env' });

const PORT = Number(process.env.AUTH_PORT);
const HOST = process.env.AUTH_HOST!;

appDataSource.initialize().then(async () => {
    const app = express();

    app.use(express.json());
    app.use(cookieParser());
    
    // CORS configuration for credentials
    const corsOptions = {
        origin: [
            'http://auth.qroog.local:5173',
            'http://qroog.local:5180',
        ].filter(Boolean), // Remove any undefined values
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
        optionsSuccessStatus: 200 // Some legacy browsers choke on 204
    };
    
    app.use(cors(corsOptions));

    app.use('/', routes);

    app.listen(PORT, HOST,() => {
        // eslint-disable-next-line no-console
        console.log(`Listening to ${HOST}:${PORT}`);
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
}).catch((error: string) => {
    throw new Error(error);
});