import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PaymentsState, SummarysState } from './payments.state';
export const PAYMENT_STATE_NAME = 'payments';
export const SUMMARY_STATE_NAME = 'summarys'

const getPaymentsState = createFeatureSelector<PaymentsState>(PAYMENT_STATE_NAME);
const getSummarysState = createFeatureSelector<SummarysState>(SUMMARY_STATE_NAME);

export const getPayments = createSelector(getPaymentsState, (state) => {
  return state.payments;
});

export const getSummarys = createSelector(getSummarysState, (state) => {
  return state.summary;
});
