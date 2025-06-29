import { celebrate, Joi, Segments } from 'celebrate';

export const validateGetUserById = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

export const validateUpdateUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string(),
    about: Joi.string(),
  }),
});

export const validateUpdateUserAvatar = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string(),
  }),
});
