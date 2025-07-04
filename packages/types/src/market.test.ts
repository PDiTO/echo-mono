import { describe, it, expect } from 'vitest';
import { 
  Market, 
  MarketStatus, 
  MarketType, 
  MarketOutcome, 
  MarketResolution,
  MarketSource 
} from './market';

describe('Market Types', () => {
  it('should create a valid binary market', () => {
    const market: Market = {
      id: 'market-1',
      title: 'Will Bitcoin reach $100k by end of 2024?',
      description: 'This market resolves to YES if Bitcoin reaches $100,000 USD on any major exchange',
      status: MarketStatus.ACTIVE,
      type: MarketType.BINARY,
      createdAt: new Date('2024-01-01'),
      closesAt: new Date('2024-12-31'),
      outcomes: [
        { id: 'outcome-yes', name: 'Yes', price: 0.65, index: 0 },
        { id: 'outcome-no', name: 'No', price: 0.35, index: 1 }
      ],
      source: {
        platform: 'polymarket',
        originalId: 'poly-123',
        url: 'https://polymarket.com/market/123'
      }
    };

    expect(market.id).toBe('market-1');
    expect(market.type).toBe(MarketType.BINARY);
    expect(market.outcomes).toHaveLength(2);
    expect(market.outcomes[0].price + market.outcomes[1].price).toBe(1);
  });

  it('should create a categorical market', () => {
    const market: Market = {
      id: 'market-2',
      title: 'Who will win the 2024 US Presidential Election?',
      status: MarketStatus.ACTIVE,
      type: MarketType.CATEGORICAL,
      createdAt: new Date('2024-01-01'),
      outcomes: [
        { id: 'outcome-1', name: 'Candidate A', price: 0.45, index: 0 },
        { id: 'outcome-2', name: 'Candidate B', price: 0.35, index: 1 },
        { id: 'outcome-3', name: 'Other', price: 0.20, index: 2 }
      ],
      source: {
        platform: 'manifold',
        originalId: 'manifold-456'
      }
    };

    expect(market.type).toBe(MarketType.CATEGORICAL);
    expect(market.outcomes).toHaveLength(3);
  });

  it('should handle resolved markets', () => {
    const resolution: MarketResolution = {
      resolvedAt: new Date('2024-12-31'),
      outcomeId: 'outcome-yes',
      metadata: { finalPrice: 105000 }
    };

    const market: Market = {
      id: 'market-3',
      title: 'Resolved Market',
      status: MarketStatus.RESOLVED,
      type: MarketType.BINARY,
      createdAt: new Date('2024-01-01'),
      resolution,
      outcomes: [
        { id: 'outcome-yes', name: 'Yes', price: 1, index: 0 },
        { id: 'outcome-no', name: 'No', price: 0, index: 1 }
      ],
      source: {
        platform: 'polymarket',
        originalId: 'poly-789'
      }
    };

    expect(market.status).toBe(MarketStatus.RESOLVED);
    expect(market.resolution?.outcomeId).toBe('outcome-yes');
  });

  it('should validate market status enum values', () => {
    expect(MarketStatus.ACTIVE).toBe('ACTIVE');
    expect(MarketStatus.CLOSED).toBe('CLOSED');
    expect(MarketStatus.RESOLVED).toBe('RESOLVED');
    expect(MarketStatus.CANCELLED).toBe('CANCELLED');
  });

  it('should validate market type enum values', () => {
    expect(MarketType.BINARY).toBe('BINARY');
    expect(MarketType.CATEGORICAL).toBe('CATEGORICAL');
    expect(MarketType.SCALAR).toBe('SCALAR');
  });
});
