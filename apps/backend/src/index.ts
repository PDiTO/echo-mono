import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { userRoutes } from './routes/users';
import { healthRoutes } from './routes/health';
import { getEnvVar } from '@repo/utils';

const fastify = Fastify({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  },
});

// Register plugins
async function registerPlugins() {
  await fastify.register(helmet);
  await fastify.register(cors, {
    origin: true, // Allow all origins in development
  });
}

// Register routes
async function registerRoutes() {
  await fastify.register(healthRoutes, { prefix: '/health' });
  await fastify.register(userRoutes, { prefix: '/api/users' });
}

// Start server
async function start() {
  try {
    await registerPlugins();
    await registerRoutes();

    const host = getEnvVar('HOST', '0.0.0.0');
    const port = parseInt(getEnvVar('PORT', '3001'), 10);

    await fastify.listen({ host, port });
    fastify.log.info(`🚀 Backend server is running on http://${host}:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

// Handle graceful shutdown
const gracefulShutdown = async () => {
  fastify.log.info('Shutting down server...');
  await fastify.close();
  process.exit(0);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

start();
