import { BP } from '@repo/types';

export const BP_UNIT = 0.0001;

export const toBp = (price: number): BP => Math.round(price / BP_UNIT);
export const toPx = (bp: BP): number => bp * BP_UNIT;
export const bpStr = (bp: BP, dp: 2 | 3 = 2) => toPx(bp).toFixed(dp);
