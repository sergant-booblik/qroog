import { Router } from 'express';
import { addGame } from '@/controller/game/add-game';
import { fetchAllPublicGames } from '@/controller/game/fetch-all-public-games';
import { fetchAllMyGames } from '@/controller/game/fetch-all-my-games';
import { fetchFavoritesGames } from '@/controller/game/fetch-favorites-games';
import { fetchGame } from '@/controller/game/fetch-game';
import { updateGame } from '@/controller/game/update-game';

const gameRoutes = Router({ mergeParams: true });

gameRoutes.get('/', fetchAllPublicGames);
gameRoutes.post('/', addGame);
gameRoutes.get('/my', fetchAllMyGames);
gameRoutes.get('/favorites', fetchFavoritesGames);
gameRoutes.get('/:id', fetchGame);
gameRoutes.patch('/:id', updateGame);
// gameRoutes.delete('/:id', deleteGame);

export default gameRoutes;