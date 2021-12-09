import { ChangePasswordRequest, UserRegister, UserRegisterResponse } from '../app/user/user-account.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // getPosts(): Observable<Post[]> {
  //   return this.http
  //     .get<Post[]>(`https://noorangulartutorial-default-rtdb.firebaseio.com/posts.json`)
  //     .pipe(
  //       map((data) => {
  //         const posts: Post[] = [];
  //         for (let key in data) {
  //           posts.push({ ...data[key], id: key });
  //         }
  //         return posts;
  //       })
  //     );
  // }

  addUserRegister(userRegister: UserRegister): Observable<{isRegistered: boolean, message: string}> {
    return this.http.post<{isRegistered: boolean, message: string}>(
      `https://localhost:44357/api/AuthManagement/Register`,
      userRegister
    );
  }

  deleteUser(id: string): Observable<{id: string, message: string, isDeleted: boolean}>  {
    return this.http.delete<{id: string, message: string, isDeleted: boolean}>(
      `https://localhost:44357/api/AuthManagement/DeleteUser/`+id
    );
  }

  getUserById(userId: string){
    return this.http.get<UserRegister>(
      `https://localhost:44357/api/AuthManagement/GetUserById/`+userId
    );
  }

  changePassword(request: ChangePasswordRequest) {
    return this.http.post<{message: string, isChanges: boolean}>(
      `https://localhost:44357/api/AuthManagement/ChangePassword`,
       request
    );
  }

}
