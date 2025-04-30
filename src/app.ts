import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import router from './routes';
import errorHandler from './middlewares/errorHandler';
import authHandler from './middlewares/auth';
import { createUser, login } from './controllers/users';

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

app.use(express.json());

app.post('/signin', login);

app.post('/signup', createUser);

app.use(authHandler);

app.use(router);

app.use(errorHandler);

const connect = async () => {
  await mongoose.connect(MONGO_URL);
  console.log(`Подключились к базе: ${MONGO_URL}`);

  app.listen(PORT, () => {
    console.log(`Сервер запущен на порту: ${PORT}`);
  });
};

connect();
