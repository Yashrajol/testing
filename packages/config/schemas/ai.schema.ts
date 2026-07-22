import * as Joi from 'joi';

export const aiSchema = Joi.object({
  OPENAI_API_KEY: Joi.string().allow('').optional(),
  ANTHROPIC_API_KEY: Joi.string().allow('').optional(),
  GEMINI_API_KEY: Joi.string().allow('').optional(),
  AI_DEFAULT_MODEL: Joi.string().default('gpt-4o'),
});

export const redisSchema = Joi.object({
  REDIS_HOST: Joi.string().default('localhost'),
  REDIS_PORT: Joi.number().port().default(6379),
  REDIS_PASSWORD: Joi.string().allow('').optional(),
  REDIS_DB: Joi.number().default(0),
});

export const rabbitmqSchema = Joi.object({
  RABBITMQ_URL: Joi.string().default('amqp://localhost:5672'),
  RABBITMQ_QUEUE: Joi.string().default('vedhkrit_queue'),
});
