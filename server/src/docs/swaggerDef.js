const { PORT, npm_package_version: version } = process.env;

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'VacciLog Server',
    description:
      'The server is a smart contract implemented in Solidity called "VaccinationLog". It tracks and logs the vaccination status of patients, allowing the addition and retrieval of data about patients, vaccines, vaccinators, and vaccination doses. It stores the data in mappings, validates the data, and emits events for each addition.\n\nSome useful links:\n- [The Github Repository](https://github.com/Justinjdaniel/Vacci-Log)\n- [Remix IDE](https://remix.ethereum.org)',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/Justinjdaniel/Vacci-Log/blob/master/LICENSE',
    },
    contact: {
      email: 'justinjdaniel@email.com',
    },
    externalDocs: {
      description: 'Github Repository',
      url: 'https://github.com/Justinjdaniel/Vacci-Log',
    },
    termsOfService:
      'https://github.com/Justinjdaniel/Vacci-Log/blob/master/TERMS.md',
  },
  servers: [
    {
      url: `http://localhost:${PORT}/api/v1`,
      description: 'Local server',
    },
  ],
};

export default swaggerDef;
