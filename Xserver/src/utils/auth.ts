import { type Request, type Response } from 'express';
import { verify } from 'jsonwebtoken';

async function getUserId(accessToken: string): Promise<number | undefined> {
    const payload: any = verify(accessToken, 'access_token');
    return payload.id;
}

export async function authorizeUser(req: Request, res: Response): Promise<number | null> {
    const accessToken = req.cookies['accessToken'];
    const userId = await getUserId(accessToken);

    if (!userId) {
        res.status(403).json({ error: 'Unauthorized' });
        return null;
    }

    return userId;
}
