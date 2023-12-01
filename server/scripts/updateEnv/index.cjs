const { readFileSync, writeFileSync, appendFileSync } = require('fs');
const { join } = require('path');

// A helper function to update or append a key-value pair to the .env file
const updateEnv = (key, value) => {
  const filePath = join(__dirname, '../../.env');
  // Read the .env file content
  const envContent = readFileSync(filePath, 'utf8');
  // Check if the key exists in the .env file
  if (envContent.includes(key)) {
    // If yes, replace the existing value with the new value
    const updatedEnvContent = envContent.replace(
      new RegExp(`${key}=.*`, 'g'),
      `${key}=${value}`
    );
    // Write the updated content to the .env file
    writeFileSync(filePath, updatedEnvContent);
  } else {
    // If no, append the key-value pair to the .env file
    appendFileSync(filePath, `\n${key}=${value}\n`);
  }
  console.info('\u001b[46;1m %s \u001b[0m', `${key} updated in .env`);
};

exports.updateEnv = updateEnv;
