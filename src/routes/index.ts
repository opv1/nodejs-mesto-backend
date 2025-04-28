import { Router, Request, Response } from 'express';
import { constants } from 'http2';
import usersRouter from './users';
import cardsRouter from './cards';

const router = Router();

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use('*', (_req: Request, res: Response) => {
  res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Страница не найдена' });
});

export default router;
