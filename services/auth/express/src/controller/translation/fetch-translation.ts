import { type Request, type Response } from 'express';
import * as process from 'node:process';

export async function fetchTranslations(req: Request, res: Response): Promise<void> {
    try {
        const lang = req.params.lang;
        if (!lang) {
            res.status(400).json({ error: 'Language parameter is required' });
            return;
        }

        // Get i18n service URL from environment
        const i18nServiceUrl = process.env.I18N_API_URL;
        if (!i18nServiceUrl) {
            res.status(500).json({ error: 'I18N service URL not configured' });
            return;
        }

        // Proxy request to i18n service
        const response = await fetch(`${i18nServiceUrl}/translations/${lang}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            res.status(response.status).json({ 
                error: `I18N service error: ${response.statusText}` 
            });
            return;
        }

        const translations = await response.json();
        res.status(200).json(translations);
    } catch (error) {
        console.error('Failed to fetch translations:', error);
        res.status(500).json({ 
            error: `Failed to fetch translations: ${error}` 
        });
    }
}
