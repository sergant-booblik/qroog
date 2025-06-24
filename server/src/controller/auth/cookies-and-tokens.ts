import { type Response } from 'express';
import { sign } from 'jsonwebtoken';
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