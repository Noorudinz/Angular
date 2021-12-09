import { createReducer, on } from '@ngrx/store';
import { Roles, UserAccount, UserRegister } from '../user-account.model';
import * as UserActions from './user.actions';
import { initialUserState } from './user.state';

export interface State {
  users: UserAccount[];
  userRegister: UserRegister[];
  roles: Roles[];
  userError: string;
  loading: boolean;
}

const initialState: State = {
  users: [],
  userRegister: [],
  roles: [],
  userError: null!,
  loading: false
};

export function userReducer(
  state = initialState,
  action: UserActions.UserAccountActions
) {
  switch (action.type) {

    case UserActions.CLEAR_USER_ERROR:
      return {
        ...state,
        userError: null
      };

    case UserActions.SET_USER:
      return {
        ...state,
        users: [...action.payload]
      };

    case UserActions.SET_ROLE:
    return {
      ...state,
      roles: [...action.payload]
    };

    case UserActions.ADD_USER_FAIL:
      return {
        ...state,
        userRegister: null,
        userError: action.payload,
        loading: false
      };


    default:
      return state;

  }
}

export function roleReducer(
  state = initialState,
  action: UserActions.UserAccountActions
) {
  switch (action.type) {

   case UserActions.SET_ROLE:
    return {
      ...state,
      roles: [...action.payload]
    };

    default:
      return state;

  }
}

const _userRegisterReducer = createReducer(initialUserState,
  on(UserActions.addUserRegisterSuccess, (state, action) => {
    let userRegister = { ...action.userRegister };
    //console.log('reducer :'+state);
    return {
      ...state,
      users: [...state.userRegisters, userRegister],
    };
  }),

  on(UserActions.deleteUserSuccess, (state, { id, message, isDeleted }) => {
    const updatedUser = state.userRegisters.filter((user) => {
      return user.id !== id;
    });

    return {
      ...state,
      users: updatedUser,
    };
  }),


  on(UserActions.getUserByIdResponse, (state, action) => {
    let userRegister = { ...action.userRegisters };
    console.log('reducer :'+state);
    return {
      ...state,
      users: [...state.userRegisters, userRegister],
    };
  })

  );

  export function userRegisterReducer(state, action) {
    return _userRegisterReducer(state, action);
  }

