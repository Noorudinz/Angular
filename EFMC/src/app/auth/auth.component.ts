import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import * as fromApp from '../store/app.reducer';
import { AuthService } from './auth.service';
import * as AuthActions from './store/auth.actions';
import * as Alert from '../toster/alert';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = '';
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

  private closeSub: Subscription;
  private storeSub: Subscription;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>,
    private route: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      if(authState.user !== null){
        this.route.navigate(['/dashboard']);
      } else {
        this.isLoading = authState.loading;
        this.error = authState.authError;
      }
      if(this.error){
        this.showErrorAlert(this.error);
        //console.log(this.error);
      }
   });
  }

  onHandleError(){
    this.store.dispatch(new AuthActions.ClearError());
  }

  onSubmit(form: NgForm){

    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.store.dispatch(
      new AuthActions.LoginStart({ email: email, password: password }));

    form.reset();
  }

  private showErrorAlert(message: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmitForgot(forgotPasswordForm: NgForm){

    if(!forgotPasswordForm.valid){
      return;
    }

    const email = forgotPasswordForm.value.forgotEmail;
    this.authService.checkEmail(email)
    .subscribe(data => {
      if(data.isSend){
        Alert.tosterAlert(data.message, 'success');
        this.isLoginMode = !this.isLoginMode;
      } else {
        Alert.tosterAlert(data.message, 'error');
      }
    });

  }


  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

}

