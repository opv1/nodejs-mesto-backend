import { Router } from 'express';
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

usersRouter.get('/:userId', getUserById);

usersRouter.patch('/me', updateUser);

usersRouter.patch('/me/avatar', updateUserAvatar);

export default usersRouter;
