import { EmailsState } from './email-setting.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
export const EMAIL_STATE_NAME = 'emails';

const getEmailsState = createFeatureSelector<EmailsState>(EMAIL_STATE_NAME);

export const getEmails = createSelector(getEmailsState, (state) => {
  return state.emails;
});
