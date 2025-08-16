import { Router } from 'express';
import { fetchTranslations } from '@/controller/translation/fetch-translation';
import { fetchLanguages } from '@/controller/translation/fetch-languages';

const router = Router();

router.get('/translations/:lang', fetchTranslations);
router.get('/languages', fetchLanguages);

export default router;