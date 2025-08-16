import { type Request, type Response } from 'express';
import { appDataSource } from '@/config/orm-config';
import { authorizeUser } from '@/utils/auth';
import { User } from '@/entity/user';
import { verify } from 'jsonwebtoken';

export async function updateMyProfile(req: Request, res: Response): Promise<void> {
  try {
    const accessToken = req.cookies['accessToken'];
    const userId = await authorizeUser(req, res);

    const payload = verify(accessToken, 'access_token') as User;

    if (!userId || !payload || (userId !== payload.id)) return;

    const userRepo = appDataSource.getRepository(User);

    await userRepo.update(payload.id, {
      ...req.body,
    });

    const updatedProfile = await userRepo.findOne({
      where: { id: payload.id },
    });

    res.status(200).json({ profile: updatedProfile });
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch user: ${error}` });
  }
}