import { celebrate, Joi, Segments } from 'celebrate';

export const validateSignin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

export const validateSignup = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(15),
    name: Joi.string(),
    about: Joi.string(),
    avatar: Joi.string(),
  }),
});
