import express, { NextFunction, Response, Request } from 'express';
import mongoose from 'mongoose';
import router from './routes';
import errorHandler from './middlewares/errorHandler';

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

app.use(express.json());

app.use((_req: Request, res: Response, next: NextFunction) => {
  res.locals.user = {
    _id: '680e4d1799e92a2679292c5a',
  };

  next();
});

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
