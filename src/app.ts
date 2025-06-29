import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import router from './routes';
import errorHandler from './middlewares/errorHandler';
import authHandler from './middlewares/auth';
import { createUser, login } from './controllers/users';
import { errorLogger, requestLogger } from './middlewares/logger';
import { validateSignin, validateSignup } from './middlewares/validators/auth';

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

app.use(express.json());

app.use(requestLogger);

app.post('/signin', validateSignin, login);

app.post('/signup', validateSignup, createUser);

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
