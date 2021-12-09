export class UserAccount {
  public id: string;
  public userName: string;
  public email: string;
  public roles: string;

  constructor(id: string, userName: string, email: string, roles: string){
    this.id = id;
    this.userName = userName;
    this.email = email;
    this.roles = roles;
  }
}

export class Roles {
  public id: string;
  public roleName: string;
  public selected: boolean;

  constructor(id: string, roleName: string, selected: boolean) {
    this.id = id;
    this.roleName = roleName;
    this.selected = selected;
  }
}

export class UserRegister {
  public id: string;
  public userName: string;
  public email: string;
  public password: string;
  public roles: Roles[];
  roleList: any;

  constructor(id: string, userName: string, email: string, password: string, roles: Roles[]){
    this.id = id;
    this.userName = userName;
    this.email = email;
    this.password = this.password
    this.roles = roles;
  }
}

export class UserRegisterResponse {
  public id: string;
  public userName: string;
  public email: string;
  public password: string;
  public roles: Roles[];
  public message: string;
  public isRegistered: boolean;
}

export class ChangePasswordRequest {
  public email: string;
  public oldPassword: string;
  public confirmPassword: string;
}
