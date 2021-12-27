import { EmailData } from '../email.model';

export interface EmailsState {
  emails: EmailData[];
}

export const initialState: EmailsState = {
  emails: null,
};
