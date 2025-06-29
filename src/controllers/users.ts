import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import { constants } from 'http2';
import { Error as MongooseError } from 'mongoose';
import User from '../models/user';
import BadRequestError from '../errors/badRequestError';
import NotFoundError from '../errors/notFoundError';
import UnauthorizedError from '../errors/unauthorizedError';
import ConflictError from '../errors/conflictError';

export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = res.locals;

    const users = await User.findById(user._id).orFail(
      () => new NotFoundError('Пользователь не найден'),
    );

    res.send(users);
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      next(new BadRequestError('Некорректный id'));
    }

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
    }

    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name, about, avatar } = req.body;

    if (!validator.isEmail(email)) {
      next(new UnauthorizedError('Некорректный email'));
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    });

    res.status(constants.HTTP_STATUS_CREATED).send(newUser);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      next(new BadRequestError('Некорректные данные при создании пользователя'));
    }

    if (error instanceof Error && error.message.includes('E11000')) {
      next(new ConflictError('Пользователь с таким email уже существует'));
    }

    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = res.locals;
    const { name, about } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { name, about },
      { new: true, runValidators: true },
    ).orFail(() => new NotFoundError('Неудалось обновить пользователя'));

    res.send(updatedUser);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      next(new BadRequestError('Некорректные данные при обновлении пользователя'));
    }

    next(error);
  }
};

export const updateUserAvatar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = res.locals;
    const { avatar } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { avatar },
      { new: true, runValidators: true },
    ).orFail(() => new NotFoundError('Неудалось обновить аватар пользователя'));

    res.send(updatedUser);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      next(new BadRequestError('Некорректные данные при обновлении аватара пользователя'));
    }

    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      next(new UnauthorizedError('Неправильные почта или пароль'));
      return;
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      next(new UnauthorizedError('Неправильные почта или пароль'));
      return;
    }

    const token = jwt.sign({ _id: user._id }, JSON.stringify(process.env.JWT_SECRET), {
      expiresIn: '7d',
    });

    res
      .cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
      })
      .send({ message: 'Успешный вход' });
  } catch (error) {
    next(error);
  }
};
