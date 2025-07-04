# @echo-ts/types

Shared TypeScript types for the Echo trading system. This package contains normalized data types that are used across all applications and packages.

## Overview

These types provide a standardized interface for market data regardless of the source platform (Polymarket, Manifold, etc.). Adapters are responsible for converting platform-specific data into these normalized formats.

## Core Types

### Market

The `Market` interface represents a prediction market or betting market in a normalized format:

```typescript
import { Market, MarketStatus, MarketType } from '@echo-ts/types';

const market: Market = {
  id: 'unique-market-id',
  title: 'Will Bitcoin reach $100k by end of 2024?',
  status: MarketStatus.ACTIVE,
  type: MarketType.BINARY,
  createdAt: new Date(),
  outcomes: [
    { id: 'yes', name: 'Yes', price: 0.65, index: 0 },
    { id: 'no', name: 'No', price: 0.35, index: 1 }
  ],
  source: {
    platform: 'polymarket',
    originalId: 'original-platform-id'
  }
};
```

### OrderBook

The `OrderBook` interface represents market depth data:

```typescript
import { OrderBook } from '@echo-ts/types';

const orderBook: OrderBook = {
  marketId: 'market-id',
  bids: [
    { price: 0.64, size: 100 },
    { price: 0.63, size: 200 }
  ],
  asks: [
    { price: 0.65, size: 150 },
    { price: 0.66, size: 300 }
  ],
  timestamp: new Date()
};
```

## Type Categories

### Market Types
- `Market` - Complete market information
- `MarketStatus` - ACTIVE, CLOSED, RESOLVED, CANCELLED
- `MarketType` - BINARY, CATEGORICAL, SCALAR
- `MarketOutcome` - Individual outcome within a market
- `MarketResolution` - Resolution information for settled markets
- `MarketSource` - Source platform information

### OrderBook Types
- `OrderBook` - Full order book snapshot
- `OrderBookEntry` - Individual price level
- `OrderBookUpdate` - Real-time update messages
- `OrderBookDepth` - Aggregated depth view
- `OrderSide` - BID or ASK
- `OrderBookUpdateType` - ADD, UPDATE, REMOVE, SNAPSHOT

## Usage

### In Adapters
Adapters convert platform-specific data to these normalized types:

```typescript
// In packages/adapters/src/polymarket/
import { Market } from '@echo-ts/types';

export function normalizePolymarketMarket(polyData: any): Market {
  return {
    id: `poly-${polyData.id}`,
    title: polyData.question,
    // ... map other fields
  };
}
```

### In Trading Engine
The trading engine consumes normalized data:

```typescript
// In packages/trading-engine/
import { Market, OrderBook } from '@echo-ts/types';

export class TradingEngine {
  processMarket(market: Market) {
    // Work with normalized market data
  }
  
  updateOrderBook(book: OrderBook) {
    // Process normalized order book
  }
}
```

### In Frontend
The frontend displays normalized data:

```typescript
// In apps/frontend/
import { Market } from '@echo-ts/types';

export function MarketCard({ market }: { market: Market }) {
  return (
    <div>
      <h2>{market.title}</h2>
      <p>Status: {market.status}</p>
      {/* ... */}
    </div>
  );
}
```

## Design Principles

1. **Platform Agnostic**: Types work for any prediction market platform
2. **Complete Information**: Include all data needed by consumers
3. **Type Safety**: Strong typing with TypeScript
4. **Extensible**: Use optional fields and metadata for platform-specific data
5. **Normalized**: Consistent naming and structure across all types

## Adding New Types

When adding new types:
1. Create a new file in `src/` (e.g., `src/position.ts`)
2. Export from `src/index.ts`
3. Add comprehensive tests in `src/[type].test.ts`
4. Document the types with JSDoc comments
5. Update this README
