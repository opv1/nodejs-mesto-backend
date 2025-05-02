import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import {
  createCard,
  deleteCard,
  deleteCardLike,
  getAllCards,
  updateCardLike,
} from '../../controllers/cards';

const cardsRouter = Router();

cardsRouter.get('/', getAllCards);

cardsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      link: Joi.string().required(),
    }),
  }),
  createCard,
);

cardsRouter.delete(
  '/:cardId',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteCard,
);

cardsRouter.put(
  '/:cardId/likes',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  updateCardLike,
);

cardsRouter.delete(
  '/:cardId/likes',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteCardLike,
);

export default cardsRouter;
