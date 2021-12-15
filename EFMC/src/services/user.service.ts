import { ChangePasswordRequest, UserRegister } from '../app/user/user-account.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as env from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  addUserRegister(userRegister: UserRegister): Observable<{isRegistered: boolean, message: string}> {
    return this.http.post<{isRegistered: boolean, message: string}>(
      env.environment.baserURL +`AuthManagement/Register`,
      userRegister
    );
  }

  deleteUser(id: string): Observable<{id: string, message: string, isDeleted: boolean}>  {
    return this.http.delete<{id: string, message: string, isDeleted: boolean}>(
      env.environment.baserURL +`AuthManagement/DeleteUser/`+id
    );
  }

  getUserById(userId: string){
    return this.http.get<UserRegister>(
      env.environment.baserURL +`AuthManagement/GetUserById/`+userId
    );
  }

  changePassword(request: ChangePasswordRequest) {
    return this.http.post<{message: string, isChanges: boolean}>(
      env.environment.baserURL +`AuthManagement/ChangePassword`,
       request
    );
  }

}
