
import { Bills } from './../invoice.model';
import { createAction, props } from '@ngrx/store';

export const LOAD_INVOICE = '[invoice page] load invoice';
export const LOAD_INVOICE_SUCCESS = '[invoice page] load invoice success';


export const loadInvoices = createAction(LOAD_INVOICE);
export const loadInvoicesSuccess = createAction(LOAD_INVOICE_SUCCESS, props<{ invoices: Bills[] }>());
