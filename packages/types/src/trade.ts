import { BP, CompositeId } from '.';

export interface Trade {
  id: CompositeId;
  venueTradeId: string;
  venueOrderId: string;
  side: 'buy' | 'sell';
  bp: BP;
  size: number;
  feeBp?: BP;
  liquidity?: 'maker' | 'taker';
  ts: bigint;
}
