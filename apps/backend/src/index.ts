import Fastify from 'fastify';

const fastify = Fastify({
  logger: true,
});

// Add your routes here
fastify.get('/', async () => {
  return { message: 'Backend is running' };
});

// Start server
fastify.listen({ port: 3001, host: '0.0.0.0' }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info('🚀 Backend server is running on http://0.0.0.0:3001');
});
