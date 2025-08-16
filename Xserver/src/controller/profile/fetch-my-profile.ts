import { type Request, type Response } from 'express';
import { appDataSource } from '@/config/orm-config';
import { authorizeUser } from '@/utils/auth';
import { User } from '@/entity/user';
import { verify } from 'jsonwebtoken';

export async function fetchMyProfile(req: Request, res: Response): Promise<void> {
  try {
    const accessToken = req.cookies['accessToken'];
    const userId = await authorizeUser(req, res);

    const payload = verify(accessToken, 'access_token') as User;

    if (!userId || !payload || (userId !== payload.id)) return;

    const userRepo = appDataSource.getRepository(User);

    const profile = await userRepo.findOne({
      where: { id: payload.id },
    });

    if (!profile) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(200).json({ profile });
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch user: ${error}` });
  }
}