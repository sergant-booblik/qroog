import { Router } from 'express';
import { fetchTranslations } from '@/controller/translation/fetch-translation';
import { fetchLanguages } from '@/controller/translation/fetch-languages';

const translationRoutes = Router();

translationRoutes.get('/translations/:lang', fetchTranslations);
translationRoutes.get('/languages', fetchLanguages);

export default translationRoutes;