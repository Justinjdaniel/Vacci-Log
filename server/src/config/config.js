import { config } from 'dotenv';
import { number, object, string } from 'joi';
import { join } from 'path';

config({ path: join(__dirname, '../../.env') });

const envVarsSchema = object()
  .keys({
    NODE_ENV: string().valid('production', 'development', 'test').required(),
    PORT: number().default(3000),
    MONGODB_URL: string().required().description('Mongo DB url'),
    JWT_SECRET: string().required().description('JWT secret key'),
    ALCHEMY_API_KEY: string().description('alchemy api key'),
    CONTRACT_ADDRESS: string().description('deployed contract address'),
    ACCOUNT_ADDRESS: string().description('wallet account address'),
    PRIVATE_KEY: string().description('wallet account private key'),
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
