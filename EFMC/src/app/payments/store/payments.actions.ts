import { createAction, props } from '@ngrx/store';
import { Payments, Summary } from '../payment.model';

export const LOAD_PAYMENTS = '[payment page] load payment';
export const LOAD_PAYMENTS_SUCCESS = '[payment page] load payment success';
export const LOAD_SUMMARYS = '[summary page] load summary';
export const LOAD_SUMMARYS_SUCCESS = '[summary page] load summary success';


export const loadPayment = createAction(LOAD_PAYMENTS);
export const loadPaymentSuccess = createAction(LOAD_PAYMENTS_SUCCESS, props<{ payments: Payments[] }>());

export const loadSummary = createAction(LOAD_SUMMARYS);
export const loadSummarySuccess = createAction(LOAD_SUMMARYS_SUCCESS, props<{ summary: Summary[] }>());
