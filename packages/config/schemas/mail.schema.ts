import * as Joi from 'joi';

export const mailSchema = Joi.object({
  MAIL_HOST: Joi.string().default('smtp.gmail.com'),
  MAIL_PORT: Joi.number().port().default(587),
  MAIL_USER: Joi.string().allow('').default(''),
  MAIL_PASS: Joi.string().allow('').default(''),
  MAIL_FROM: Joi.string().email().default('noreply@vedhkrit.com'),
});
