import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Clientes',
      version: '1.0.0',
      description: 'Documentación de la API de Clientes con Swagger',
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Servidor de desarrollo',
      },
    ],
  },
  apis: ['./src/controllers/*.ts', './src/swagger/*.yml'],  // Ajusta las rutas según tu estructura
};

const specs = swaggerJsdoc(options);

export default specs;
