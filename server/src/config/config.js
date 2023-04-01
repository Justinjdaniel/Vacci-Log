import { config } from 'dotenv';
import 'dotenv/config';
import joi from 'joi';
import { join } from 'path';
import __dirname from '../../dirname.js';

config({ path: join(__dirname, '../../.env') });

const envVarsSchema = joi
  .object({
    NODE_ENV: joi
      .string()
      .valid('production', 'development', 'test')
      .required(),
    PORT: joi.number().default(3000),
    MONGODB_URL: joi.string().required().description('Mongo DB url'),
    MONGODB_USERNAME: joi.string().required().description('Mongo DB user'),
    MONGODB_PASSWORD: joi
      .string()
      .required()
      .description('Mongo DB user password'),
    JWT_SECRET: joi.string().required().description('JWT secret key'),
    ALCHEMY_API_KEY: joi.string().description('alchemy api key'),
    CONTRACT_ADDRESS: joi.string().description('deployed contract address'),
    ACCOUNT_ADDRESS: joi.string().description('wallet account address'),
    PRIVATE_KEY: joi.string().description('wallet account private key'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.validate(process.env, {
  errors: { label: 'key' },
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const env = envVars.NODE_ENV;
export const port = envVars.PORT;
export const mongooseConfig = {
  url: `${envVars.MONGODB_URL.replace(
    '<username>',
    envVars.MONGODB_USERNAME
  ).replace('<password>', envVars.MONGODB_PASSWORD)}${envVars.NODE_ENV ?? ''}`,
};
export const jwt = {
  secret: envVars.JWT_SECRET,
};
export const alchemyKey = envVars.ALCHEMY_API_KEY;
export const contractAddress = envVars.CONTRACT_ADDRESS;
export const wallet = {
  address: envVars.ACCOUNT_ADDRESS,
  key: envVars.PRIVATE_KEY,
};
