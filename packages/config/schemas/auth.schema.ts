import * as Joi from 'joi';

export const authSchema = Joi.object({
  JWT_SECRET: Joi.string().required().default('dev-jwt-secret-key-change-in-production'),
  JWT_ACCESS_EXPIRY: Joi.string().default('15m'),
  REFRESH_TOKEN_SECRET: Joi.string().default('dev-refresh-token-secret-key-change-in-production'),
  REFRESH_TOKEN_EXPIRY: Joi.string().default('7d'),
});
