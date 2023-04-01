const { PORT, npm_package_version: version } = process.env;

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'VacciLog Server',
    description:
      'Server is for name is vaccinations log, which is used to create get and add patient, vaccinator, vaccine, and patient vaccine dose. Uses blockchain to store data.\n\nSome useful links:\n- [The Github Repository](https://github.com/Justinjdaniel/Vacci-Log)',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/Justinjdaniel/Vacci-Log/blob/master/LICENSE',
    },
    contact: {
      email: 'justinjdaniel@email.com',
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
