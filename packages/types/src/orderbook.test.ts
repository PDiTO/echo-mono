import { describe, it, expect } from 'vitest';
import {
  OrderBook,
  OrderBookEntry,
  OrderBookUpdate,
  OrderBookUpdateType,
  OrderSide,
  OrderBookDepth,
  DepthLevel
} from './orderbook';

describe('OrderBook Types', () => {
  it('should create a valid order book', () => {
    const book: OrderBook = {
      marketId: 'market-1',
      bids: [
        { price: 100, size: 5 },
        { price: 99, size: 10 }
      ],
      asks: [
        { price: 101, size: 1 },
        { price: 102, size: 2 }
      ],
      timestamp: new Date('2025-07-01'),
    };

    expect(book.marketId).toBe('market-1');
    expect(book.bids).toHaveLength(2);
    expect(book.asks).toHaveLength(2);
  });

  it('should handle order book updates', () => {
    const update: OrderBookUpdate = {
      marketId: 'market-1',
      type: OrderBookUpdateType.ADD,
      side: OrderSide.BID,
      price: 101,
      size: 15,
      timestamp: new Date('2025-07-01'),
    };

    expect(update.type).toBe(OrderBookUpdateType.ADD);
    expect(update.side).toBe(OrderSide.BID);
  });

  it('should validate order book update types', () => {
    expect(OrderBookUpdateType.ADD).toBe('ADD');
    expect(OrderBookUpdateType.UPDATE).toBe('UPDATE');
    expect(OrderBookUpdateType.REMOVE).toBe('REMOVE');
    expect(OrderBookUpdateType.SNAPSHOT).toBe('SNAPSHOT');
  });

  it('should validate order sides', () => {
    expect(OrderSide.BID).toBe('BID');
    expect(OrderSide.ASK).toBe('ASK');
  });
});

