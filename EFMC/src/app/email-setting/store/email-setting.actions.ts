import { createAction, props } from '@ngrx/store';
import { EmailData } from '../email.model';


export const LOAD_EMAIL = '[email page] load email';
export const LOAD_EMAIL_SUCCESS = '[email page] load email success';
export const UPDATE_EMAIL_ACTION = '[email page] update email';
export const UPDATE_EMAIL_SUCCESS = '[email page] update email success';
export const GET_EMAIL_ACTION = '[email page] get email';

export const loadEmail = createAction(LOAD_EMAIL);
export const loadEmailSuccess = createAction(LOAD_EMAIL_SUCCESS, props<{ emails: EmailData[] }>());
export const updateEmail = createAction(UPDATE_EMAIL_ACTION, props<{ email: EmailData }>());
export const updateEmailSuccess = createAction(UPDATE_EMAIL_SUCCESS, props<{ email: EmailData }>());
export const getEmailById = createAction(GET_EMAIL_ACTION, props<{ id: number }>());
