const fs = require('fs');
const { updateEnv } = require('./index.cjs');

// Read the keys.json file and parse it as an object
const keys = JSON.parse(fs.readFileSync('keys.json', 'utf8'));

// Get the first address and private key from the object
const firstAddress = Object.keys(keys.private_keys)[0];
const firstPrivateKey = keys.private_keys[firstAddress];

// Update or append the address and private key to the .env file with the specified keys
updateEnv('GANACHE_ACCOUNT_ADDRESS', firstAddress);
updateEnv('GANACHE_PRIVATE_KEY', firstPrivateKey);
