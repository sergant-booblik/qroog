import { type Response, type Request } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { type User } from '@/entity/user';

function setCookie(res: Response, token: string, type: 'accessToken' | 'refreshToken', maxAge: number): void {
    res.cookie(type, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: maxAge,
        path: '/',
    });
}

function createToken(userId: number, type: 'access_token' | 'refresh_token', expiresIn: number): string {
    return sign(
        { id: userId },
        type,
        { expiresIn },
    );
}

export async function generateTokensAndSetCookies(res: Response, user: User): Promise<void> {
    const accessToken = createToken(user.id, 'access_token', 24 * 60 * 60);
    const refreshToken = createToken(user.id, 'refresh_token', 30 * 24 * 60 * 60);

    setCookie(res, accessToken, 'accessToken', 24 * 60 * 60 * 1000);
    setCookie(res, refreshToken, 'refreshToken', 7 * 24 * 60 * 60 * 1000);
}

export const verifyToken = async (req: Request, res: Response): Promise<void> => {
    try {
        const accessToken = req.cookies['accessToken'];

        const payload: any = verify(accessToken, 'access_token');

        if (!payload) {
            res.status(401).send({
                success: false,
            });
            return;
        }

        res.status(200).send({
            success: true,
        });
    } catch (error) {
        res.status(401).send({
            success: false,
            message: error,
        });

        return;
    }
};

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
        const refreshToken = req.cookies['refreshToken'];

        const payload: any = verify(refreshToken, 'refresh_token');

        if (!payload) {
            res.status(401).send({
                success: false,
                message: 'Unauthenticated. No payload',
            });

            return;
        }

        const accessToken = sign({
            id: payload.id,
        }, 'access_token', { expiresIn: 60 * 60 });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: '/',
        });

        res.send({
            success: true,
            message: 'success',
        });
    } catch (error) {
        res.status(401).send({
            success: false,
            message: `Unauthenticated. Some other errors: ${error}`,
        });
        return;
    }
};