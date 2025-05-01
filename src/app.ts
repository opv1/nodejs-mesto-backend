import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { celebrate, errors, Joi, Segments } from 'celebrate';
import router from './routes';
import errorHandler from './middlewares/errorHandler';
import authHandler from './middlewares/auth';
import { createUser, login } from './controllers/users';
import { errorLogger, requestLogger } from './middlewares/logger';

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

app.use(express.json());

app.use(requestLogger);

app.post(
  '/signin',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8).max(15),
      name: Joi.string(),
      about: Joi.string(),
      avatar: Joi.string(),
    }),
  }),
  createUser,
);

app.use(authHandler);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

const connect = async () => {
  await mongoose.connect(MONGO_URL);
  console.log(`Подключились к базе: ${MONGO_URL}`);

  app.listen(PORT, () => {
    console.log(`Сервер запущен на порту: ${PORT}`);
  });
};

connect();
