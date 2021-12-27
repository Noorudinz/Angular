import { Bills } from '../invoice.model';

export interface InvoiceState {
  invoices: Bills[];
}

export const initialState: InvoiceState = {
  invoices: null,
};
