import { FastifyInstance } from 'fastify';
import { db } from '@repo/db';
import type { HealthCheckResponse } from '@repo/types';
import { createSuccessResponse } from '@repo/utils';

export async function healthRoutes(fastify: FastifyInstance) {
  fastify.get('/', async (request, reply) => {
    try {
      const dbHealth = await db.getHealth();
      
      const healthData: HealthCheckResponse = {
        status: dbHealth.status === 'connected' ? 'ok' : 'error',
        timestamp: new Date().toISOString(),
        services: {
          database: dbHealth.status,
        },
      };

      return createSuccessResponse(healthData);
    } catch (error) {
      const healthData: HealthCheckResponse = {
        status: 'error',
        timestamp: new Date().toISOString(),
        services: {
          database: 'disconnected',
        },
      };

      reply.status(500);
      return createSuccessResponse(healthData);
    }
  });
}
