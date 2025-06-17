import { Router } from 'express';
import { addGame } from '@/controller/game/add-game';

const gameRoutes = Router({ mergeParams: true });

// gameRoutes.get('/', fetchAllPublicGames);
gameRoutes.post('/', addGame);
// gameRoutes.get('/my', fetchAllMyGames);
// gameRoutes.get('/favorites', fetchMyFavoritesGames);
// gameRoutes.get('/:id', fetchGame);
// gameRoutes.patch('/:id', updateGame);
// gameRoutes.delete('/:id', deleteGame);

export default gameRoutes;