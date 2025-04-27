import { Request, Response, NextFunction } from 'express';
import { constants } from 'http2';
import { Error as MongooseError } from 'mongoose';
import User from '../models/user';
import BadRequestError from '../errors/badRequestError';
import NotFoundError from '../errors/notFoundError';

export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).orFail(
      () => new NotFoundError('Пользователь не найден'),
    );

    res.send(user);
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      next(new BadRequestError('Некорректный id'));
      return;
    }

    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, about, avatar } = req.body;

    const newUser = await User.create({ name, about, avatar });

    res.status(constants.HTTP_STATUS_CREATED).send(newUser);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      next(new BadRequestError('Некорректные данные при создании пользователя'));
      return;
    }

    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = res.locals;
    const { name, about, avatar } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { name, about, avatar },
      {
        new: true,
        runValidators: true,
      },
    ).orFail(() => new NotFoundError('Неудалось обновить пользователя'));

    res.send(updatedUser);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      next(new BadRequestError('Некорректные данные при обновлении пользователя'));
      return;
    }

    next(error);
  }
};

export const updateUserAvatar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = res.locals;
    const { avatar } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    ).orFail(() => new NotFoundError('Неудалось обновить аватар пользователя'));

    res.send(updatedUser);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      next(new BadRequestError('Некорректные данные при обновлении аватара пользователя'));
      return;
    }

    next(error);
  }
};
