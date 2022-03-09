import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, switchMapTo, take, tap } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { AuthService } from "../auth.service";
import { User } from "../user.model";
import CryptoJS from 'crypto-js';
import * as AuthActions from './auth.actions';


export interface AuthResponseData {
  idToken: string;
  name: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
  rolesName: string[];
}


const handleAuthentication = (expiresIn: number, name: string, email: string, userId: string, token: string, roles: string[]) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(name, email, userId, token, expirationDate, roles);

  if(user !== null){
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(user), environment.salt).toString();
    localStorage.setItem('userData', JSON.stringify(ciphertext));
  }

  return new AuthActions.AuthenticateSuccess({
    name: name,
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate,
    roles: roles,
    redirect: true
  });



};

const handleError = (errorRes: any) => {

  let errorMessage =  errorRes.error.errors; //'An unknown error occured!';

  if(errorMessage === undefined){
    return of(new AuthActions.AuthenticateFail('Service not available !!!'));
  }

  if(!errorRes.error || !errorRes.error.error){
     //console.log('errmsg: '+errorMessage);
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }

  switch (errorRes.error.error.message){
    case 'EMAIL_EXISTS':
      errorMessage = 'This email is already exist!';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email is not found!';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is invalid!';
      break;
  }
return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {

//  @Effect()
//  authSignup = this.actions$.pipe(
//    ofType(AuthActions.SIGNUP_START),
//    switchMap((signupAction: AuthActions.SignupStart) => {
//     return this.http.post<AuthResponseData>(
//       'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ environment.firebaseAPIKey ,
//       {
//         email: signupAction.payload.email,
//         password: signupAction.payload.password,
//         returnSecureToken: true
//       }).pipe(
//         tap(resData => {
//           this.authService.setLogoutTimer(+resData.expiresIn * 1000);
//         }),
//         map(resData => {
//            return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
//         }),
//         catchError(errorRes => {
//           return handleError(errorRes);
//       }),
//       );
//    })
//  );

@Effect()
authLogin = this.actions$.pipe(
  ofType(AuthActions.LOGIN_START),
  switchMap((authData: AuthActions.LoginStart) => {
    return this.http
   // .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ environment.firebaseAPIKey,
   .post<AuthResponseData>('https://localhost:44357/api/AuthManagement/Login',
   {
     email: authData.payload.email,
     password: authData.payload.password,
     returnSecureToken: true
   }).pipe(
     tap(resData => {
        this.authService.setLogoutTimer(+resData.expiresIn * 1000);
     }),
     map(resData => {
       return handleAuthentication(+resData.expiresIn, resData.name, resData.email, resData.localId, resData.idToken, resData.rolesName);

     }),
     catchError(errorRes => {
       return handleError(errorRes);
    }),
   );
  })
);

//  @Effect()
//  authLogin = this.actions$.pipe(
//    ofType(AuthActions.LOGIN_START),
//    switchMap((authData: AuthActions.LoginStart) => {
//      return this.http
//     //.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ environment.firebaseAPIKey,
//     .post<AuthResponseData>('https://localhost:44357/api/AuthManagement/Login',
//     {
//       email: authData.payload.email,
//       password: authData.payload.password,
//       returnSecureToken: true
//     }).pipe(
//       tap(resData => {
//         this.authService.setLogoutTimer(+resData.expiresIn * 1000);
//       }),
//       map(resData => {
//         return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
//       }),
//       catchError(errorRes => {
//         return handleError(errorRes);
//      }),
//     );
//    })
//  );

 @Effect({ dispatch: false })
 authRedirect = this.actions$.pipe(
   ofType(AuthActions.AUTHENTICATE_SUCCESS),
   tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
     if(authSuccessAction.payload.redirect){
      this.router.navigate(['/']);
     }
   })
 );

 @Effect({ dispatch: false })
 authLogout = this.actions$.pipe(ofType(AuthActions.LOGOUT),
   tap(() => {
     this.authService.clearLogoutTimer();
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
   })
 );

 @Effect()
 autoLogin = this.actions$.pipe(
   ofType(AuthActions.AUTO_LOGIN),
   map(() => {

    var ciphertext = JSON.parse(localStorage.getItem('userData'));

    if(ciphertext !== null){
      var bytes  = CryptoJS.AES.decrypt(ciphertext, environment.salt);
      var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }

    const userData: {
      name: string;
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
      _roles: string[];
    } = decryptedData;

    //console.log(userData);

    if(!userData){
      return { type: 'DUMMY' };
    }

    const loadedUser = new User(
    userData.name,
    userData.email,
    userData.id,
    userData._token,
    new Date(userData._tokenExpirationDate),
    userData._roles);

    if(loadedUser.token){
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.authService.setLogoutTimer(expirationDuration);
       return new AuthActions.AuthenticateSuccess({
        name: loadedUser.name,
        email: loadedUser.email,
        userId: loadedUser.id,
        token: loadedUser.token,
        expirationDate: new Date(userData._tokenExpirationDate),
        roles: loadedUser._roles,
        redirect: false
      })
    }

    return { type: 'DUMMY' };
   })
 );


  constructor(private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService) {
    }



}




