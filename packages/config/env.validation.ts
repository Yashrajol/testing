import * as Joi from 'joi';
import { appSchema } from './schemas/app.schema';
import { authSchema } from './schemas/auth.schema';
import { databaseSchema } from './schemas/database.schema';
import { mailSchema } from './schemas/mail.schema';
import { storageSchema } from './schemas/storage.schema';
import { aiSchema, redisSchema, rabbitmqSchema } from './schemas/ai.schema';

export const environmentValidationSchema = appSchema
  .concat(authSchema)
  .concat(databaseSchema)
  .concat(mailSchema)
  .concat(storageSchema)
  .concat(aiSchema)
  .concat(redisSchema)
  .concat(rabbitmqSchema);

export function validateEnvironment(config: Record<string, unknown>): Record<string, any> {
  const { error, value } = environmentValidationSchema.validate(config, {
    allowUnknown: true,
    abortEarly: false,
  });

  if (error) {
    const errorDetails = error.details.map((d) => d.message).join('; ');
    throw new Error(`❌ Environment Validation Error: ${errorDetails}`);
  }

  return value;
}
