import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import {
  getAllUsers,
  getUser,
  getUserById,
  updateUser,
  updateUserAvatar,
} from '../../controllers/users';

const usersRouter = Router();

usersRouter.get('/', getAllUsers);

usersRouter.get('/me', getUser);

usersRouter.get(
  '/:userId',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      userId: Joi.string().required(),
    }),
  }),
  getUserById,
);

usersRouter.patch(
  '/me',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string(),
      about: Joi.string(),
    }),
  }),
  updateUser,
);

usersRouter.patch(
  '/me/avatar',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      avatar: Joi.string(),
    }),
  }),
  updateUserAvatar,
);

export default usersRouter;
