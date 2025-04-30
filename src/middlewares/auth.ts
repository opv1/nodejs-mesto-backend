import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/unauthorizedError';

const authHandler = (req: Request, res: Response, next: NextFunction) => {
  const { cookie } = req.headers;

  if (!cookie || !cookie?.startsWith('jwt=')) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }

  let payload;
  const token = cookie.replace('jwt=', '');

  try {
    payload = jwt.verify(token, JSON.stringify(process.env.JWT_SECRET));
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  res.locals.user = payload;

  next();
};

export default authHandler;
