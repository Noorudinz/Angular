import { createReducer, on } from '@ngrx/store';
import { loadPaymentSuccess, loadSummarySuccess } from './payments.actions';
import { initialPaymentsState, initialSummarysState } from './payments.state';

const _paymentsReducer = createReducer(initialPaymentsState,

  on(loadPaymentSuccess, (state, action) => {
      return {
        ...state,
        payments: action.payments,
      };
    })
  );

const _summarysReducer = createReducer(initialSummarysState,

  on(loadSummarySuccess, (state, action) => {
      return {
        ...state,
        summary: action.summary,
      };
    })
  );

export function paymentsReducer(state, action) {
  return _paymentsReducer(state, action);
}

export function summaryReducer(state, action) {
  return _summarysReducer(state, action);
}
