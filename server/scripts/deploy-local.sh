#!/bin/bash

# Assign scripts to variables
start="node ./bin/server"
dev="nodemon start"
ganache="npx ganache --wallet.accountKeysPath keys.json"
post_ganache="node ./scripts/updateEnv/ganache.cjs"
compile="npx hardhat compile"
deploy="npx hardhat run ./scripts/deploy.cjs --network localhost"

# Run scripts using variables
concurrently "$ganache" "sleep 4 && $post_ganache && $compile && $deploy && $dev"