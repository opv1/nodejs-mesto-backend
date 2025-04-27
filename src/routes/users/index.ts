import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
} from '../../controllers/users';

const usersRouter = Router();

usersRouter.get('/', getAllUsers);

usersRouter.get('/:userId', getUserById);

usersRouter.post('/', createUser);

usersRouter.patch('/me', updateUser);

usersRouter.patch('/me/avatar', updateUserAvatar);

export default usersRouter;
