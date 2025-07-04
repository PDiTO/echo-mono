import { BP, CompositeId } from '.';

export interface Position {
  id: CompositeId;
  size: number;
  avgOpenBp: BP;
  realizedPnl: number;
  updatedAt: bigint;
}
