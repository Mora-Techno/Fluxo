import swagger from '@elysiajs/swagger';

const swaggerPlugin = swagger({
  path: '/docs',
  documentation: {
    info: {
      title: 'Fluxo Backend API',
      version: '1.0.0',
      description: 'API documentation for Fluxo backend service',
    },
    tags: [{ name: 'Auth', description: 'Authentication endpoints' }],

    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'x-internal-api-key',
        },
      },
    },
    security: [{ ApiKeyAuth: [] }],
  },
});

export default swaggerPlugin;
