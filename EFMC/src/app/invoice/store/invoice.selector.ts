import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from 'src/app/store/router/custom-serializer';
import { getCurrentRoute } from 'src/app/store/router/router.selector';
import { InvoiceState } from './invoice.state';
export const INVOICES_STATE_NAME = 'invoices';

const getInvoicesState = createFeatureSelector<InvoiceState>(INVOICES_STATE_NAME);

export const getInvoices = createSelector(getInvoicesState, (state) => {
  return state.invoices;
});


export const geInvoiceById = createSelector(
  getInvoices,
  getCurrentRoute,
  (bills, route: RouterStateUrl) => {
     return bills ? bills.find((bill) => bill.billNo === route.params['billNo']) : null;
  }
);
