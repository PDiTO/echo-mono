// Common types shared across the monorepo

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Health check types
export interface HealthCheckResponse {
  status: 'ok' | 'error';
  timestamp: string;
  services: {
    database: 'connected' | 'disconnected';
    cache?: 'connected' | 'disconnected';
  };
}

// Re-export user roles
export * from './user-roles';
