import { ErrorRequestHandler } from 'express';
import InternalServerError from '../errors/internalServerError';

const internalServerError = new InternalServerError('На сервере произошла ошибка');

const errorHandler: ErrorRequestHandler = (err, _req, res) => {
  const statusCode = err.statusCode || internalServerError.statusCode;

  const message =
    statusCode === internalServerError.statusCode ? internalServerError.message : err.message;

  res.status(statusCode).send({ message, status: statusCode });
};

export default errorHandler;
