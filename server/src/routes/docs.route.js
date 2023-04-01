import { Router } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import swaggerDefinition from '../docs/swaggerDef.js';

const router = Router();

const specs = swaggerJsDoc({
  swaggerDefinition,
  apis: [
    'src/models/docs/*.yml',
    'src/docs/*.yml',
    'src/routes/docs/*.yml',
    'src/routes/*.js',
  ],
});

router.use(
  '/',
  serve,
  setup(specs, {
    // explorer: true,
    // customCssUrl: 'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-monokai.css',
  })
);

export default router;
