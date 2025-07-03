import type { User } from '@repo/types';

// Mock database implementation - replace with your actual database setup
class Database {
  private users: User[] = [];

  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const user: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.users.push(user);
    return user;
  }

  async getUserById(id: string): Promise<User | null> {
    const user = this.users.find(u => u.id === id);
    return user || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = this.users.find(u => u.email === email);
    return user || null;
  }

  async getAllUsers(): Promise<User[]> {
    return [...this.users];
  }

  async updateUser(id: string, updates: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User | null> {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) return null;

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updates,
      updatedAt: new Date(),
    };

    return this.users[userIndex];
  }

  async deleteUser(id: string): Promise<boolean> {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) return false;

    this.users.splice(userIndex, 1);
    return true;
  }

  async getHealth(): Promise<{ status: 'connected' | 'disconnected' }> {
    // Mock health check - replace with actual database health check
    return { status: 'connected' };
  }
}

export const db = new Database();
export * from './schema';
