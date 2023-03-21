// import packageJson from '../../package.json' assert { type: 'json' };
const { PORT, npm_package_version: version } = process.env;

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'VacciLog Server',
    description:
      'All the APIs related to the vacci-log server are available here.\n\nSome useful links:\n- [The Github Repository](https://github.com/Justinjdaniel/Vacci-Log)',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/Justinjdaniel/Vacci-Log/blob/master/LICENSE',
    },
    contact: {
      email: 'justinjdaniel@email.com',
    },
  },
  servers: [
    {
      url: `http://localhost:${PORT}/api/v1`,
    },
  ],
};

export default swaggerDef;
