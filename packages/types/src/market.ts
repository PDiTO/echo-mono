/**
 * Normalized market data types
 * These types represent market data in a standardized format
 * regardless of the source (Polymarket, etc.)
 */

/**
 * Represents a normalized market
 */
export interface Market {
  /** Unique identifier for the market */
  id: string;
  
  /** Human-readable title of the market */
  title: string;
  
  /** Detailed description of the market */
  description?: string;
  
  /** Market status */
  status: MarketStatus;
  
  /** Market type */
  type: MarketType;
  
  /** When the market was created */
  createdAt: Date;
  
  /** When the market will close for trading */
  closesAt?: Date;
  
  /** When the market will resolve */
  resolvesAt?: Date;
  
  /** Resolution of the market (if resolved) */
  resolution?: MarketResolution;
  
  /** Available outcomes for this market */
  outcomes: MarketOutcome[];
  
  /** Market metadata from original source */
  metadata?: Record<string, unknown>;
  
  /** Source of this market data */
  source: MarketSource;
}

/**
 * Market status enum
 */
export enum MarketStatus {
  /** Market is open for trading */
  ACTIVE = 'ACTIVE',
  /** Market is closed for trading but not resolved */
  CLOSED = 'CLOSED',
  /** Market has been resolved */
  RESOLVED = 'RESOLVED',
  /** Market has been cancelled */
  CANCELLED = 'CANCELLED',
}

/**
 * Market type enum
 */
export enum MarketType {
  /** Binary yes/no market */
  BINARY = 'BINARY',
  /** Multiple choice market */
  CATEGORICAL = 'CATEGORICAL',
  /** Scalar/range market */
  SCALAR = 'SCALAR',
}

/**
 * Represents a possible outcome in a market
 */
export interface MarketOutcome {
  /** Unique identifier for this outcome */
  id: string;
  
  /** Display name for this outcome */
  name: string;
  
  /** Current price/probability (0-1) */
  price: number;
  
  /** Index of this outcome (0-based) */
  index: number;
}

/**
 * Market resolution data
 */
export interface MarketResolution {
  /** When the market was resolved */
  resolvedAt: Date;
  
  /** Winning outcome ID */
  outcomeId: string;
  
  /** Additional resolution data */
  metadata?: Record<string, unknown>;
}

/**
 * Source of market data
 */
export interface MarketSource {
  /** Platform name (e.g., 'polymarket', 'manifold') */
  platform: string;
  
  /** Original market ID on the source platform */
  originalId: string;
  
  /** URL to the market on the source platform */
  url?: string;
}
