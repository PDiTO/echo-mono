import { BP, CompositeId } from '.';

export type OrderSide = 'bid' | 'ask';
export type OrderType = 'limit' | 'market';
export type OrderTIF = 'gtc' | 'gtd' | 'fok';

export interface OrderRequest {
  id: CompositeId;
  side: OrderSide;
  type?: OrderType;
  bp: BP;
  size: number;
  tif?: OrderTIF;
  postOnly?: boolean;
  clientOrderId?: string;
}

export interface Order {
  id: CompositeId;
  venueOrderId: string;
  side: OrderSide;
  type: OrderType;
  bp: BP;
  size: number;
  filled: number;
  avgFillBp?: number;
  status: 'pending' | 'open' | 'partially_filled' | 'filled' | 'cancelled' | 'rejected' | 'expired';
  tif?: OrderTIF;
  createdAt: bigint;
  updatedAt: bigint;
}
