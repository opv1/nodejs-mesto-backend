import { Router } from 'express';
import {
  getAllUsers,
  getUser,
  getUserById,
  updateUser,
  updateUserAvatar,
} from '../../controllers/users';
import {
  validateGetUserById,
  validateUpdateUser,
  validateUpdateUserAvatar,
} from '../../middlewares/validators/user';

const usersRouter = Router();

usersRouter.get('/', getAllUsers);
usersRouter.get('/me', getUser);
usersRouter.get('/:userId', validateGetUserById, getUserById);
usersRouter.patch('/me', validateUpdateUser, updateUser);
usersRouter.patch('/me/avatar', validateUpdateUserAvatar, updateUserAvatar);

export default usersRouter;
