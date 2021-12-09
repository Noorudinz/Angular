import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from 'src/services/user.service';
import * as fromApp from  '../store/app.reducer';
import { ChangePasswordRequest } from '../user/user-account.model';
import * as AuthActions from '../auth/store/auth.actions';
import * as Alert from '../toster/alert';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  changePasswordFrom: FormGroup;
  passmsg: string;

  private userSub: Subscription;
  isAuthenticate = false;
  userEmail: string;

  constructor(private store: Store<fromApp.AppState>,
    private userService: UserService ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    let userOldPassword = '';
    let userNewPassword = '';
    let userConfirmPassword = '';

    this.changePasswordFrom = new FormGroup({
      'userId': new FormControl(''),
      'userOldPassword': new FormControl(userOldPassword, [Validators.required, Validators.minLength(6)]),
      'userNewPassword': new FormControl(userNewPassword, [Validators.required, Validators.minLength(6)]),
      'userConfirmPassword': new FormControl(userConfirmPassword,
        [Validators.required, Validators.minLength(6)]),

    },
    {
      validators: (control) => {
        this.passmsg = "Password did not match.";
        if(control.value.userNewPassword !== ''
         && control.value.userConfirmPassword != ''
         && control.value.userNewPassword !== null
         && control.value.userConfirmPassword != null){

          if(control.value.userNewPassword !== control.value.userConfirmPassword){
            control.get("userConfirmPassword").setErrors({ notSame: true });
            this.passmsg = "Password did not match.";
          } else {
            this.passmsg = "Password matched";
          }

        }
        return null;
      }
    }
    );
  }

  onSubmit(){

    if (!this.changePasswordFrom.valid) {
      return;
    }

    this.userSub = this.store.select('auth')
    .pipe(
      map(authState => {
         return authState;
      }))
      .subscribe(user => {
        if(user.user !== null){

          const request: ChangePasswordRequest = {
            email: user.user.email,
            oldPassword: this.changePasswordFrom.value.userOldPassword,
            confirmPassword: this.changePasswordFrom.value.userConfirmPassword
          }

          this.userService.changePassword(request).subscribe(data => {
            if(data.isChanges){
              Alert.tosterAlert(data.message, 'success');
              this.store.dispatch(new AuthActions.Logout());
            } else {
              Alert.tosterAlert(data.message, 'error');
            }
          });

        }
      });
  }

  ngOnDestroy(){
    if(this.userSub){
      this.userSub.unsubscribe();
    }
  }

}
