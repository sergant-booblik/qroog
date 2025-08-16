import { type Request, type Response } from 'express';
import * as process from 'node:process';

export async function fetchLanguages(_: Request, res: Response): Promise<void> {
    try {
        // Get i18n service URL from environment
        const i18nServiceUrl = process.env.I18N_API_URL;
        if (!i18nServiceUrl) {
            res.status(500).json({ error: 'I18N service URL not configured' });
            return;
        }

        // Proxy request to i18n service
        const response = await fetch(`${i18nServiceUrl}/languages`, {
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

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Failed to fetch languages:', error);
        res.status(500).json({ 
            error: `Failed to fetch languages: ${error}` 
        });
    }
}
