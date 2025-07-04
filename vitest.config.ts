import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Include tests from all packages using co-located pattern
    include: ['packages/*/src/**/*.test.ts', 'apps/*/src/**/*.test.ts'],
    
    // Global setup
    globals: true,
    environment: 'node',
    
    // TypeScript configuration
    typecheck: {
      tsconfig: './tsconfig.base.json'
    },
    
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['packages/*/src/**/*.ts', 'apps/*/src/**/*.ts'],
      exclude: ['**/*.test.ts', '**/*.d.ts', '**/node_modules/**']
    },
  }
})
