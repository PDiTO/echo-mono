import { FastifyInstance } from 'fastify';
import { db } from '@repo/db';
import type { User } from '@repo/types';
import { 
  createSuccessResponse, 
  createErrorResponse, 
  isValidEmail, 
  isValidId 
} from '@repo/utils';

export async function userRoutes(fastify: FastifyInstance) {
  // Get all users
  fastify.get('/', async () => {
    try {
      const users = await db.getAllUsers();
      return createSuccessResponse(users);
    } catch (error) {
      return createErrorResponse('Failed to fetch users');
    }
  });

  // Get user by ID
  fastify.get<{ Params: { id: string } }>('/:id', async (request, reply) => {
    const { id } = request.params;

    if (!isValidId(id)) {
      reply.status(400);
      return createErrorResponse('Invalid user ID');
    }

    try {
      const user = await db.getUserById(id);
      if (!user) {
        reply.status(404);
        return createErrorResponse('User not found');
      }
      return createSuccessResponse(user);
    } catch (error) {
      reply.status(500);
      return createErrorResponse('Failed to fetch user');
    }
  });

  // Create new user
  fastify.post<{ Body: { name: string; email: string } }>('/', async (request, reply) => {
    const { name, email } = request.body;

    if (!name || !email) {
      reply.status(400);
      return createErrorResponse('Name and email are required');
    }

    if (!isValidEmail(email)) {
      reply.status(400);
      return createErrorResponse('Invalid email format');
    }

    try {
      // Check if user already exists
      const existingUser = await db.getUserByEmail(email);
      if (existingUser) {
        reply.status(409);
        return createErrorResponse('User with this email already exists');
      }

      const user = await db.createUser({ name, email });
      reply.status(201);
      return createSuccessResponse(user, 'User created successfully');
    } catch (error) {
      reply.status(500);
      return createErrorResponse('Failed to create user');
    }
  });

  // Update user
  fastify.put<{ 
    Params: { id: string }; 
    Body: { name?: string; email?: string } 
  }>('/:id', async (request, reply) => {
    const { id } = request.params;
    const { name, email } = request.body;

    if (!isValidId(id)) {
      reply.status(400);
      return createErrorResponse('Invalid user ID');
    }

    if (email && !isValidEmail(email)) {
      reply.status(400);
      return createErrorResponse('Invalid email format');
    }

    try {
      const user = await db.updateUser(id, { name, email });
      if (!user) {
        reply.status(404);
        return createErrorResponse('User not found');
      }
      return createSuccessResponse(user, 'User updated successfully');
    } catch (error) {
      reply.status(500);
      return createErrorResponse('Failed to update user');
    }
  });

  // Delete user
  fastify.delete<{ Params: { id: string } }>('/:id', async (request, reply) => {
    const { id } = request.params;

    if (!isValidId(id)) {
      reply.status(400);
      return createErrorResponse('Invalid user ID');
    }

    try {
      const deleted = await db.deleteUser(id);
      if (!deleted) {
        reply.status(404);
        return createErrorResponse('User not found');
      }
      return createSuccessResponse(null, 'User deleted successfully');
    } catch (error) {
      reply.status(500);
      return createErrorResponse('Failed to delete user');
    }
  });
}
