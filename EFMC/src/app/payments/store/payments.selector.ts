import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from 'src/app/store/router/custom-serializer';
import { getCurrentRoute } from 'src/app/store/router/router.selector';
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

export const getPaymentById = createSelector(
  getPayments,
  getCurrentRoute,
  (receipts, route: RouterStateUrl) => {
     return receipts ? receipts.find((receipt) => receipt.flatNo === route.params['flatNo']) : null;
  }
);

export const getSummaryById = createSelector(
  getSummarys,
  getCurrentRoute,
  (summarys, route: RouterStateUrl) => {
     return summarys ? summarys.find((summary) => summary.flatNo === route.params['flatNo']) : null;
  }
);
