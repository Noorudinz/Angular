import { Payments, Summary } from '../payment.model';

export interface PaymentsState {
  payments: Payments[];
}

export const initialPaymentsState: PaymentsState = {
  payments: null,
};

export interface SummarysState {
  summary: Summary[];
}

export const initialSummarysState: SummarysState = {
  summary: null,
};
