import { Router } from 'express';
import {
  createCard,
  deleteCard,
  deleteCardLike,
  getAllCards,
  updateCardLike,
} from '../../controllers/cards';
import {
  validateCreateCard,
  validateDeleteCard,
  validateDeleteCardLike,
  validateUpdateCardLike,
} from '../../middlewares/validators/card';

const cardsRouter = Router();

cardsRouter.get('/', getAllCards);
cardsRouter.post('/', validateCreateCard, createCard);
cardsRouter.delete('/:cardId', validateDeleteCard, deleteCard);
cardsRouter.put('/:cardId/likes', validateUpdateCardLike, updateCardLike);
cardsRouter.delete('/:cardId/likes', validateDeleteCardLike, deleteCardLike);

export default cardsRouter;
