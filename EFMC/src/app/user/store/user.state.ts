import { UserRegister } from '../user-account.model';

export interface UserRegisterState {
  userRegisters: UserRegister[];
}

export const initialUserState: UserRegisterState = {
  userRegisters: null,
};
