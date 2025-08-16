import { type Request, type Response } from 'express';

export const logout = async (_req: Request, res: Response): Promise<void> => {
  res.cookie('accessToken', 'deleted', { maxAge: 0 });
  res.cookie('refreshToken', 'deleted', { maxAge: 0 });
  res.send({
    success: true,
  });
};