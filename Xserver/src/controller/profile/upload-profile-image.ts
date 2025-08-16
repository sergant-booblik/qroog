import type { Request, Response } from 'express';
import { uploadToS3 } from '@/config/s3-client';
import { authorizeUser } from '@/utils/auth';
import { appDataSource } from '@/config/orm-config';
import { User } from '@/entity/user';

export const uploadProfileImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const userRepo = appDataSource.getRepository(User);
    const userId = await authorizeUser(req, res);
    if (!userId) return;

    if (!req.file) {
      await userRepo.update(userId, {
        imageUrl: null,
      });
      res.status(200).json({ imageProfileUrl: undefined });
      return;
    }

    const imageProfileUrl = await uploadToS3(req.file, userId);
    await userRepo.update(userId, {
      imageUrl: imageProfileUrl,
    });

    res.status(200).json({ imageProfileUrl });

  } catch (error: any) {
    res.status(500).json({ error: `Upload failed: ${error.message || error}` });
  }
};