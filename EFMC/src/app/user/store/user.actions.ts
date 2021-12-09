import { Action, createAction, props } from "@ngrx/store";
import { Roles, UserAccount, UserRegister, UserRegisterResponse } from "../user-account.model";


export const FETCH_USERS = '[User] Fetch User';
export const FETCH_ROLES = '[Roles] Fetch Role'
export const ADD_USER = '[User] Add User';
export const ADD_USER_SUCCESS = '[User] Add User Success'
export const ADD_USER_FAIL = '[User] Add User Fail'
export const DELETE_USER = '[User] Delete User';
export const DELETE_USER_SUCCESS = '[User] Delete User Success';
export const SET_USER = '[User] Set User';
export const SET_ROLE = '[Roles] Set Role';
export const STORE_USER = '[User] Store User'
export const CLEAR_USER_ERROR = '[User] Clear User Error'
export const GET_USER_BY_ID_REQUEST = '[User] Get User By Id Request'
export const GET_USER_BY_ID_RESPONSE = '[User] Get User By Id Response'

export const addUserRegister = createAction(ADD_USER, props<{ userRegisters: UserRegister }>());
export const addUserRegisterSuccess = createAction(ADD_USER_SUCCESS, props<{ userRegister: UserRegisterResponse }>());
export const deleteUser = createAction(DELETE_USER, props<{ id: string }>());
export const deleteUserSuccess = createAction(DELETE_USER_SUCCESS, props<{ id: string, message: string, isDeleted: boolean }>());
export const getUserByIdRequest = createAction(GET_USER_BY_ID_REQUEST, props<{ id: string }>());
export const getUserByIdResponse = createAction(GET_USER_BY_ID_RESPONSE, props<{ userRegisters: UserRegister }>());

export class ClearUserError implements Action {
  readonly type = CLEAR_USER_ERROR;
}

export class SetUsers implements Action {
  readonly type = SET_USER;

  constructor(public payload: UserAccount[]) {}
}

export class FetchUsers implements Action {
  readonly type = FETCH_USERS;
}

export class SetRoles implements Action {
  readonly type = SET_ROLE;

  constructor(public payload: Roles[]) {}
}

export class FetchRoles implements Action {
  readonly type = FETCH_ROLES;
}

export class AddUser implements Action {
  readonly type = ADD_USER;
  constructor(public payload: UserRegister) { }
}

export class AddUserFail implements Action {
  readonly type = ADD_USER_FAIL;

  constructor(public payload: string) {}
}

export class DeleteUser implements Action {
  readonly type = DELETE_USER;

  constructor(public payload: number) {}
}

export class StoreUser implements Action {
  readonly type =  STORE_USER;
  constructor(public payload: UserRegister) {}

}

export type UserAccountActions =
  | FetchUsers
  | AddUser
  | AddUserFail
  | DeleteUser
  | SetUsers
  | FetchRoles
  | SetRoles
  | ClearUserError;
