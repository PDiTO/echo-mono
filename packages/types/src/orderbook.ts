/**
 * Normalized order book types
 * These types represent order book data in a standardized format
 * regardless of the source exchange/platform
 */

/**
 * Represents a normalized order book
 */
export interface OrderBook {
  /** Market ID this order book belongs to */
  marketId: string;
  
  /** Outcome ID (for prediction markets with multiple outcomes) */
  outcomeId?: string;
  
  /** Buy orders (bids) sorted by price descending */
  bids: OrderBookEntry[];
  
  /** Sell orders (asks) sorted by price ascending */
  asks: OrderBookEntry[];
  
  /** Best bid price */
  bestBid?: number;
  
  /** Best ask price */
  bestAsk?: number;
  
  /** Mid-market price */
  midPrice?: number;
  
  /** Spread between best ask and best bid */
  spread?: number;
  
  /** When this order book snapshot was taken */
  timestamp: Date;
  
  /** Sequence number for order book updates */
  sequenceNumber?: number;
}

/**
 * Single entry in an order book (bid or ask)
 */
export interface OrderBookEntry {
  /** Price level */
  price: number;
  
  /** Total size available at this price level */
  size: number;
  
  /** Number of orders at this price level */
  orderCount?: number;
  
  /** Cumulative size up to this level */
  cumulativeSize?: number;
}

/**
 * Order book update (for streaming/websocket updates)
 */
export interface OrderBookUpdate {
  /** Market ID */
  marketId: string;
  
  /** Outcome ID (if applicable) */
  outcomeId?: string;
  
  /** Type of update */
  type: OrderBookUpdateType;
  
  /** Side of the book being updated */
  side: OrderSide;
  
  /** Price level being updated */
  price: number;
  
  /** New size at this level (0 means remove) */
  size: number;
  
  /** Update timestamp */
  timestamp: Date;
  
  /** Sequence number */
  sequenceNumber?: number;
}

/**
 * Type of order book update
 */
export enum OrderBookUpdateType {
  /** New price level added */
  ADD = 'ADD',
  /** Existing price level updated */
  UPDATE = 'UPDATE',
  /** Price level removed */
  REMOVE = 'REMOVE',
  /** Full snapshot (replace entire book) */
  SNAPSHOT = 'SNAPSHOT',
}

/**
 * Order side
 */
export enum OrderSide {
  /** Buy order */
  BID = 'BID',
  /** Sell order */
  ASK = 'ASK',
}

/**
 * Order book depth (aggregated view)
 */
export interface OrderBookDepth {
  /** Market ID */
  marketId: string;
  
  /** Aggregated bid levels */
  bids: DepthLevel[];
  
  /** Aggregated ask levels */
  asks: DepthLevel[];
  
  /** Price increment used for aggregation */
  priceIncrement: number;
  
  /** Timestamp */
  timestamp: Date;
}

/**
 * Aggregated depth level
 */
export interface DepthLevel {
  /** Price level (may be aggregated) */
  price: number;
  
  /** Total size at this level */
  size: number;
  
  /** Cumulative size */
  cumulativeSize: number;
  
  /** Percentage of total book depth */
  depthPercentage: number;
}
