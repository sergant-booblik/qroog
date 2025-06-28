import { type Request, type Response } from 'express';
import { appDataSource } from '@/config/orm-config';
import { LoginCode } from '@/entity/login-code';
import { User } from '@/entity/user';
import { generateUsername } from '@/controller/auth/generate-username';
import { generateTokensAndSetCookies } from '@/controller/auth/cookies-and-tokens';

export async function verifyCode(req: Request, res: Response): Promise<void> {
    const { email, code } = req.body;

    const loginCodeRepo = appDataSource.getRepository(LoginCode);
    const codeEntry = await loginCodeRepo.findOne({
        where: { email, code },
        order: { expiresAt: 'DESC' },
    });

    console.log(codeEntry);

    if (!codeEntry || codeEntry.expiresAt < new Date()) {
        res.status(400).send({
            success: false,
            message: 'Auth.Code.Verify.failed',
        });

        return;
    }

    codeEntry.used = true;
    await loginCodeRepo.save(codeEntry);

    const userRepo = appDataSource.getRepository(User);
    let user = await userRepo.findOne({ where: { email } });

    if (!user) {
        const username = generateUsername();

        user = userRepo.create({ email, username });
        await userRepo.save(user);
    }

    await generateTokensAndSetCookies(res, user);

    res.status(200).send({
        success: true,
        message: 'Auth.Code.Verify.success',
    });
}