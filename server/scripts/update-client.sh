#!/bin/bash 

curl  -X PATCH \
  "http://localhost:8000/api/v1/clients/token" \
  --header 'Accept: */*' \
  --header 'User-Agent: TrackGenesis Tokenizer (https://www.trackgenesis.com)' \
  --header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTNmNTBiMmVmM2JmMGRkNTkwMGFlNTIiLCJpYXQiOjE3MDA4MDk5OTJ9.MR8I7O2Q6jTAUuONdsEC5MZDJpFg7MkU4nlVEjXIyh8" \
  --header 'Content-Type: application/json' \
  --data-raw '{"walletAddress":"0x14E03e80855552CE764b92D1c1F1f88950997DfF","token":{"contractAddress":"0xe2653F6E5f04eB454A7c04629742c0c94e476a59","networkName":"mumbai","name":"Test Token EXT","symbol":"EXT","supply":"1000","icon":"https://raw.githubusercontent.com/trackgenesis/Assets/main/TokenMinter/polygon.png"}}'