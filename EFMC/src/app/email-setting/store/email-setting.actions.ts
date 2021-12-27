import { createAction, props } from '@ngrx/store';
import { EmailData } from '../email.model';


export const LOAD_EMAIL = '[email page] load email';
export const LOAD_EMAIL_SUCCESS = '[email page] load email success';


export const loadEmail = createAction(LOAD_EMAIL);
export const loadEmailSuccess = createAction(LOAD_EMAIL_SUCCESS, props<{ emails: EmailData[] }>());
