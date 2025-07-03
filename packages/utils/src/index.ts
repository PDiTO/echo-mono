import type { ApiResponse, PaginationParams } from '@repo/types';

// API Response utilities
export function createSuccessResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
  };
}

export function createErrorResponse(error: string): ApiResponse {
  return {
    success: false,
    error,
  };
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidId(id: string): boolean {
  return typeof id === 'string' && id.length > 0;
}

// Pagination utilities
export function calculatePagination(total: number, params: PaginationParams) {
  const totalPages = Math.ceil(total / params.limit);
  
  return {
    page: params.page,
    limit: params.limit,
    total,
    totalPages,
    hasNext: params.page < totalPages,
    hasPrev: params.page > 1,
  };
}

// String utilities
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// Date utilities
export function formatDate(date: Date, format: 'iso' | 'readable' = 'iso'): string {
  if (format === 'readable') {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  return date.toISOString();
}

// Environment utilities
export function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Environment variable ${key} is required but not set`);
  }
  return value;
}

export function isDevelopment(): boolean {
  return getEnvVar('NODE_ENV', 'development') === 'development';
}

export function isProduction(): boolean {
  return getEnvVar('NODE_ENV', 'development') === 'production';
}
