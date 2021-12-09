import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'adminLTE';
  isAuthenticate = false;
  isForgotPassword = false;
  private userSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(){
    this.store.dispatch(new AuthActions.AutoLogin());

      this.userSub = this.store.select('auth')
      .pipe(
        map(authState => {
          return authState.user;
        }))
        .subscribe(user => {
         this.isAuthenticate = !!user;
    });
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }


}
