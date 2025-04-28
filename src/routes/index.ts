import { Router, Request, Response } from 'express';
import usersRouter from './users';
import cardsRouter from './cards';

const router = Router();

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use('*', (_req: Request, res: Response) => {
  res.send({ message: 'Страница не найдена' });
});

export default router;
