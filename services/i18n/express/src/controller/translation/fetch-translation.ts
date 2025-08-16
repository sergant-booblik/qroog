import { type Request, type Response } from 'express';
import { getTranslations } from '@/config/tolgee';

export async function fetchTranslations(req: Request, res: Response): Promise<void> {
    try {
        const lang = req.params.lang;
        if (!lang) return;

        const translations = await getTranslations(lang);

        res.status(200).json({ ...translations });
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch translation: ${error}` });
    }
}