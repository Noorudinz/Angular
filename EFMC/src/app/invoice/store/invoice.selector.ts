import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InvoiceState } from './invoice.state';
export const INVOICES_STATE_NAME = 'invoices';

const getInvoicesState = createFeatureSelector<InvoiceState>(INVOICES_STATE_NAME);

export const getInvoices = createSelector(getInvoicesState, (state) => {
  return state.invoices;
});
