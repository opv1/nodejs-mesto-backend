import { NextFunction, Request, Response } from 'express';
import { constants } from 'http2';
import { Error as MongooseError } from 'mongoose';
import Card from '../models/card';
import BadRequestError from '../errors/badRequestError';
import NotFoundError from '../errors/notFoundError';
import ForbiddenError from '../errors/forbiddenError';

export const getAllCards = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.find({});

    res.send(cards);
  } catch (error) {
    next(error);
  }
};

export const createCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = res.locals;
    const { name, link } = req.body;

    const newCard = await Card.create({ name, link, owner: user._id });

    res.status(constants.HTTP_STATUS_CREATED).send(newCard);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      next(new BadRequestError('Некорректные данные при создании карточки'));
    }

    next(error);
  }
};

export const deleteCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = res.locals;
    const { cardId } = req.params;

    const card = await Card.findById(cardId).orFail(
      () => new NotFoundError('Неудалось удалить карточку'),
    );

    if (card.owner.toString() !== user._id) {
      throw new ForbiddenError('Нельзя удалить чужую карточку');
    }

    const deletedCard = await Card.findByIdAndDelete(cardId).orFail(
      () => new NotFoundError('Неудалось удалить карточку'),
    );

    res.send(deletedCard);
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      next(new BadRequestError('Некорректный id'));
    }

    next(error);
  }
};

export const updateCardLike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = res.locals;
    const { cardId } = req.params;

    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: user._id } },
      { new: true },
    ).orFail(() => new NotFoundError('Неудалось обновить карточку'));

    res.send(updatedCard);
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      next(new BadRequestError('Некорректный id'));
    }

    next(error);
  }
};

export const deleteCardLike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = res.locals;
    const { cardId } = req.params;

    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: user._id } },
      { new: true },
    ).orFail(() => new NotFoundError('Неудалось обновить карточку'));

    res.send(updatedCard);
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      next(new BadRequestError('Некорректный id'));
    }

    next(error);
  }
};
