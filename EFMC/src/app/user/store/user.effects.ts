import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, switchMap, take } from "rxjs/operators";
import { UserService } from "src/services/user.service";
import { Roles, UserAccount } from "../user-account.model";
import * as UserActions from './user.actions';
import { addUserRegisterSuccess } from "./user.actions";



const handleError = (errorRes: any) => {
  let errorMessage =  errorRes.error.errors; //'An unknown error occured!';

  if(errorMessage === undefined){
    return of(new UserActions.AddUserFail('Service not available !!!'));
  }

  if(!errorRes.error || !errorRes.error.error){
    return of(new UserActions.AddUserFail(errorMessage));
  }

return of(new UserActions.AddUserFail(errorMessage));
};

@Injectable()
export class UserEffects {

  addUserRegister$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.addUserRegister),
      mergeMap((action) => {
        return this.userService.addUserRegister(action.userRegisters).pipe(
          map((data) => {
            const userRegister = { ...action.userRegisters, isRegistered: data.isRegistered, message: data.message };
            //console.log('add user success'+  JSON.stringify(userRegister));
            return addUserRegisterSuccess({ userRegister });
          }),
           catchError(errorRes => {
            return handleError(errorRes);
         }),
        );
      })
    );
  });

  @Effect()
  fetchUsers$ = this.actions$.pipe(
    ofType(UserActions.FETCH_USERS),
    switchMap(() => {
      return this.http.get<UserAccount[]>(
        'https://localhost:44357/api/AuthManagement/GetUsers'
      );
    }),
    map(users => {
      return users.map(user => {
        return {
          ...user
        };
      });
    }),
    map(users => {
      return new UserActions.SetUsers(users);
    }),
    catchError(error => {
      return handleError(error);
    })
  );

  @Effect()
  fetchRoles = this.actions$.pipe(
    ofType(UserActions.FETCH_ROLES),
    switchMap(() => {
      const headers = { 'content-type': 'application/json'}
      return this.http.get<Roles[]>(
        'https://localhost:44357/api/AuthManagement/GetRoles',
        {'headers':headers}
      );
    }),
    map(roles => {
      return roles.map(role => {
        return {
          ...role
        };
      });
    }),
    map(roles => {
      return new UserActions.SetRoles(roles);
    })
  );

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.deleteUser),
      switchMap((action) => {
        return this.userService.deleteUser(action.id).pipe(
          map((data) => {
            return UserActions.deleteUserSuccess({ id: action.id, message: data.message, isDeleted: data.isDeleted });
          })
        );
      })
    );
  });

  getByUserId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.getUserByIdRequest),
      mergeMap((action) => {
        return this.userService.getUserById(action.id).pipe(
          map((data) => {
            // console.log(data);
            // return null;
            return UserActions.getUserByIdResponse({ userRegisters: data });
          })
        );
      })
    );
  });

  constructor(private actions$: Actions,
    private http: HttpClient,
    private userService: UserService) {}

}

