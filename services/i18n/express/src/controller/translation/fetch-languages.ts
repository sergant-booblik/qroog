import { type Request, type Response } from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: '../../../.env' });

export async function fetchLanguages(_: Request, res: Response): Promise<void> {
    try {
        const url = process.env.TOLGEE_LANGUAGES_ENDPOINT as string;
        const xApiKey = process.env.TOLGEE_TRANSLATIONS_ACCESS_KEY as string;
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'X-API-Key': xApiKey,
            },
        });

        if (!response.ok) {
            res.status(400).send({ error: 'Tolgee server error' });
            return;
        }

        const data = await response.json();
        const languages = data._embedded?.languages ?? [];

        res.status(200).json({ languages });
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch translation: ${error}` });
    }
}