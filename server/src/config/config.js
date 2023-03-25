import { config } from 'dotenv';
import joi from 'joi';
import { join } from 'path';
import __dirname from '../../dirname.js';

config({ path: join(__dirname, '../../.env') });

const envVarsSchema = joi
  .object()
  .keys({
    NODE_ENV: joi
      .string()
      .valid('production', 'development', 'test')
      .required(),
    PORT: joi.number().default(3000),
    MONGODB_URL: joi.string().required().description('Mongo DB url'),
    JWT_SECRET: joi.string().required().description('JWT secret key'),
    ALCHEMY_API_KEY: joi.string().description('alchemy api key'),
    CONTRACT_ADDRESS: joi.string().description('deployed contract address'),
    ACCOUNT_ADDRESS: joi.string().description('wallet account address'),
    PRIVATE_KEY: joi.string().description('wallet account private key'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const env = envVars.NODE_ENV;
export const port = envVars.PORT;
export const mongoose = {
  url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
  options: {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
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
