import { Router } from 'express';
import { addTag } from '@/controller/tag/add-tag';
import { fetchTags } from '@/controller/tag/fetch-tags';

const tagRoutes = Router({ mergeParams: true });

tagRoutes.get('/', fetchTags);
tagRoutes.post('/', addTag);

export default tagRoutes;