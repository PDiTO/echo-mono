import { CompositeId } from '.';

export type BP = number;

export interface OrderBook {
  id: CompositeId;
  bids: Map<BP, number>;
  asks: Map<BP, number>;
  sequence: bigint;
}

export type OrderBookSide = 'bid' | 'ask';

export interface OrderBookUpdate {
  id: CompositeId;
  side: OrderBookSide;
  price: BP;
  size: number;
}
