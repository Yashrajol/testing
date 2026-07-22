import * as Joi from 'joi';

export const databaseSchema = Joi.object({
  DATABASE_URL: Joi.string()
    .uri({ scheme: ['postgres', 'postgresql'] })
    .default('postgresql://postgres:postgres@localhost:5432/vedhkrit?schema=public'),
  DIRECT_URL: Joi.string().uri({ scheme: ['postgres', 'postgresql'] }).optional(),
  DB_POOL_MIN: Joi.number().default(2),
  DB_POOL_MAX: Joi.number().default(10),
  DB_SSL: Joi.boolean().default(false),
});
