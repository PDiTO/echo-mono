import { CompositeId } from '.';

export interface Market {
  id: CompositeId;
  title: string;
  outcomes: Outcome[];

  orderBookMode: 'shared' | 'separate';
  status: 'active' | 'paused' | 'resolved' | 'cancelled';
  endTime?: Date;

  tickSizeBps: number;
  minOrderSize: number;
  maxOrderSize?: number;

  makerFeeBps: number;
  takerFeeBps: number;
}

export interface Outcome {
  label: string;
  instrumentId: string;
}
