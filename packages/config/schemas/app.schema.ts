import * as Joi from 'joi';
import { Environment } from '../constants';

export const appSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(Environment.DEVELOPMENT, Environment.TESTING, Environment.PRODUCTION)
    .default(Environment.DEVELOPMENT),
  PORT: Joi.number().port().default(5000),
  APP_NAME: Joi.string().default('VEDHKRIT API'),
  WEB_ORIGIN: Joi.string().default('http://localhost:8000'),
  CORS_CREDENTIALS: Joi.boolean().default(false),
  RATE_LIMIT_TTL: Joi.number().default(60000),
  RATE_LIMIT_MAX: Joi.number().default(100),
});
