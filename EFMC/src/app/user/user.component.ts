import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as fromApp from  '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import { Store } from '@ngrx/store';
import { Roles, UserAccount, UserRegister } from './user-account.model';
import { map, take } from 'rxjs/operators';
import * as UserActions from './store/user.actions';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { addUserRegister, addUserRegisterSuccess } from './store/user.actions';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
declare var swal: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  @ViewChild('closeUserModal') closeUserModal: ElementRef;

  private userSub: Subscription;
  private closeSub: Subscription;
  private storeSub: Subscription;
  isLoading = false;
  error: string = '';
  callModal: string;
  editMode = false;

  isAuthenticate = false;
  userListSubscription: Subscription;
  roleListSubscription: Subscription;
  userRegister: FormGroup;
  passmsg: string;

  userList: UserAccount[];
  roleList = [];
  roleEditedList = [];
  fetchUserData: any;

  constructor(private store: Store<fromApp.AppState>,
    private route: Router,
    private _actions$: Actions) {
  }

  ngOnInit(): void {

    this.editMode = false;
    this.store.dispatch(new AuthActions.AutoLogin());

    this.userSub = this.store.select('auth')
      .subscribe(user => {
        if(user.user !== null){
          for(var r in user.user._roles){
            if(user.user._roles[r] !== 'admin'){
             //this.isAuthenticate = true;
             this.route.navigate(['/dashboard']);
             TosterAlert('Access denied !', 'error');
            }
          }
        }
      });

      this.loadUsersList();

        this.storeSub = this.store.select('user')
        .subscribe(initialUserState => {
          if(initialUserState.userRegister !== null){
            //this.route.navigate(['/dashboard']);
          } else {
            this.isLoading = initialUserState.loading;
            this.error = initialUserState.userError;
          }
          if(this.error){
            var convertedString = this.error.toString();
            const formatString = convertedString.split(",").join("\n \n ");
            TosterAlert(formatString, 'error');
          }
       });
  }

  private loadUsersList(){

    this.isLoading = true;

    this.store.dispatch(new UserActions.FetchUsers());

    this.userListSubscription = this.store.select('user')
      .pipe(map(userState => userState.users))
      .subscribe(
        (users: UserAccount[]) => {
          this.userList = users;
        });


    this.store.dispatch(new UserActions.FetchRoles());

        this.roleListSubscription = this.store.select('role')
        .pipe(map(roleState => roleState.roles))
        .subscribe(
          (roles: Roles[]) => {
            this.roleList = roles; //Pass array to checkbox group
            this.initForm();
          });

    this.isLoading = false;
    this.store.dispatch(new UserActions.ClearUserError());
  }

  private initForm() {
    let userName = '';
    let userEmail = '';
    let userPassword = '';
    let userConfirmPassword = '';

    let roleCB = new FormArray(this.roleList.map(item => new FormGroup({
      id: new FormControl(item.roleId),
      text: new FormControl(item.roleName),
      checkbox: new FormControl(item.isChecked)
    })));

     let hiddenControl = new FormControl(this.mapItems(roleCB.value), Validators.required);
    // update checkbox group's value to hidden formcontrol
    roleCB.valueChanges.subscribe((v) => {
      hiddenControl.setValue(this.mapItems(v));
    });

    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.userRegister = new FormGroup({
      'userId': new FormControl(''),
      'userName': new FormControl(userName, [Validators.required, Validators.minLength(6)]),
      'userEmail': new FormControl(userEmail, [Validators.required, Validators.email, Validators.pattern(EMAIL_REGEX)]),
      'userPassword': new FormControl(userPassword, [Validators.required, Validators.minLength(6)]),
      'userConfirmPassword': new FormControl(userConfirmPassword,
        [Validators.required, Validators.minLength(6)]),
        items: roleCB,
        selectedItems: hiddenControl
    },
    {
      validators: (control) => {
        this.passmsg = "Password did not match.";
        if(control.value.userPassword !== ''
         && control.value.userConfirmPassword != '' &&
         control.value.userPassword !== null
         && control.value.userConfirmPassword != null){
          if(control.value.userPassword !== control.value.userConfirmPassword){
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


  mapItems(items) {
     let selectedItems = items
  .filter((item) => item.checkbox)
  .map((item) => item.text);
  return selectedItems.length ? selectedItems : null;
  }

  onSubmit(){

    if (!this.userRegister.valid) {
      return;
    }

   if(this.userRegister.controls.selectedItems.value.includes('admin')){
    TosterAlert('Admin role not allowed', 'error');
     return;
    }

    const userRegisters: UserRegister = {
      id: this.userRegister.value.userId,
      userName: this.userRegister.value.userName,
      email: this.userRegister.value.userEmail,
      password: this.userRegister.value.userConfirmPassword,
      roles: this.userRegister.value.selectedItems,
      roleList: null
    };

    this.store.dispatch(addUserRegister({ userRegisters }));

    this._actions$.pipe(ofType(addUserRegisterSuccess)).pipe(take(1))
    .subscribe((data: any) => {
      console.log('add user :'+ JSON.stringify(data));
      if(data.userRegister.isRegistered){
        this.closeUserModal.nativeElement.click();
        TosterAlert(data.userRegister.message, 'success');
        this.loadUsersList();
      }
    });

  }

  onUserAddOrEdit(id: string){

    this.editMode = true;
    if(id === '' || id === null || id === undefined){
      this.editMode = false;
      this.loadUsersList();
      this.userRegister.reset();
      this.callModal = '#modal-user';
      return;
    }

    let randomPassword = Math.random().toString(36).slice(-8);

     this.store.dispatch(UserActions.getUserByIdRequest({ id }));

     this._actions$.pipe(ofType(UserActions.getUserByIdResponse)).pipe(take(1))
     .subscribe((data: any) => {
        if(data !== null){
        const fetchUserData = {
          userId: data.userRegisters.id,
          userName: data.userRegisters.userName,
          userPassword: randomPassword,
          userConfirmPassword: randomPassword,
          userEmail: data.userRegisters.email,
          roles: data.userRegisters.roleList
        }
        this.roleList = fetchUserData.roles;
        this.initForm();
        this.userRegister.patchValue(fetchUserData);
     }
   });
   this.callModal = '#modal-user';
  }

  onDeletePopup(id: string){

  this.userListSubscription = this.store.select('user')
    .pipe(map(userState => userState.users))
    .subscribe(
      (users: UserAccount[]) => {
        const fetchUserById = users.find(f => f.id === id);
        if(fetchUserById !== undefined){
          this.fetchUserData = {
            userId: fetchUserById.id,
            userName: fetchUserById.userName,
            userEmail: fetchUserById.email
          }
        }
    });
  this.callModal = '#modal-userdelete'

  }


  onConfirmDelete(){
    const id = this.fetchUserData.userId;
    this.store.dispatch(UserActions.deleteUser({ id }));

    this._actions$.pipe(ofType(UserActions.deleteUserSuccess)).subscribe((data: any) => {
       if(data.isDeleted){
        this.loadUsersList();
        document.getElementById("closeBtn").click();
        TosterAlert(data.message, 'success');
      }
    });
  }


  ngOnDestroy(){
    this.userSub.unsubscribe();
    this.userListSubscription.unsubscribe();
    this.roleListSubscription.unsubscribe();
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}


//Alerts toster
function TosterAlert(message: string, type: string) {
  const Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000
  });
  Toast.fire({
    icon: type,
    title: message
});
}

