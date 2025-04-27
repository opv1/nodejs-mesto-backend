import { Router } from 'express';
import {
  createCard,
  deleteCard,
  deleteCardLike,
  getAllCards,
  updateCardLike,
} from '../../controllers/cards';

const cardsRouter = Router();

cardsRouter.get('/', getAllCards);

cardsRouter.post('/', createCard);

cardsRouter.delete('/:cardId', deleteCard);

cardsRouter.put('/:cardId/likes', updateCardLike);

cardsRouter.delete('/:cardId/likes', deleteCardLike);

export default cardsRouter;
