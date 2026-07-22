import * as Joi from 'joi';

export const storageSchema = Joi.object({
  STORAGE_PROVIDER: Joi.string().valid('s3', 'local').default('local'),
  S3_BUCKET: Joi.string().allow('').optional(),
  S3_REGION: Joi.string().allow('').default('ap-south-1'),
  S3_ACCESS_KEY_ID: Joi.string().allow('').optional(),
  S3_SECRET_ACCESS_KEY: Joi.string().allow('').optional(),
  STORAGE_LOCAL_PATH: Joi.string().default('./uploads'),
});
