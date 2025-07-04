# Testing Guide

This monorepo uses [Vitest](https://vitest.dev/) for testing with a co-located test structure.

## Test Structure

Tests are placed alongside source files using the `.test.ts` extension:

```
packages/
├── adapters/
│   └── src/
│       ├── base/
│       │   ├── adapter.ts
│       │   └── adapter.test.ts      # Test for adapter.ts
│       └── polymarket/
│           ├── client.ts
│           └── client.test.ts       # Test for client.ts
```

## Running Tests

### All Tests
```bash
pnpm test                    # Run all tests
pnpm test --run             # Run tests once (no watch mode)
```

### Package-Specific Tests
```bash
pnpm test:adapters          # Test adapters package only
pnpm test:trading           # Test trading-engine package only
pnpm test:types             # Test types package only
pnpm test:database          # Test database package only
```

### Development Commands
```bash
pnpm test:watch             # Run tests in watch mode
pnpm test:ui                # Open Vitest UI in browser
pnpm test:coverage          # Run tests with coverage report
```

## Test Configuration

- **Config**: `vitest.config.ts` (root level)
- **Globals**: Vitest globals are enabled (`describe`, `it`, `expect`)
- **Environment**: Node.js
- **Coverage**: v8 provider with HTML/text reports

## Writing Tests

### Basic Test Example
```typescript
import { describe, it, expect } from 'vitest'
import { MyFunction } from './my-function'

describe('MyFunction', () => {
  it('should return expected result', () => {
    const result = MyFunction('input')
    expect(result).toBe('expected')
  })
})
```

### Async Test Example
```typescript
import { describe, it, expect } from 'vitest'
import { AsyncFunction } from './async-function'

describe('AsyncFunction', () => {
  it('should handle async operations', async () => {
    const result = await AsyncFunction()
    expect(result).toBeDefined()
  })
})
```

### Mock Example
```typescript
import { describe, it, expect, vi } from 'vitest'
import { FunctionWithDeps } from './function-with-deps'

describe('FunctionWithDeps', () => {
  it('should work with mocks', () => {
    const mockDep = vi.fn().mockReturnValue('mocked')
    const result = FunctionWithDeps(mockDep)
    
    expect(mockDep).toHaveBeenCalled()
    expect(result).toBe('mocked')
  })
})
```

## Best Practices

1. **Co-locate tests** with source files
2. **Use descriptive test names** that explain what is being tested
3. **Group related tests** with `describe` blocks
4. **Test both happy paths and edge cases**
5. **Keep tests focused** - one concept per test
6. **Use mocks** for external dependencies
7. **Test interfaces** and public APIs, not implementation details
