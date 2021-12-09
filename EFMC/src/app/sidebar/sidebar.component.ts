import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from  '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  private userSub: Subscription;
  isAuthenticate = false;
  userName: string;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {

    this.store.dispatch(new AuthActions.AutoLogin());

    this.userSub = this.store.select('auth')
    .pipe(
      map(authState => {
         return authState;
      }))
      .subscribe(user => {
        if(user.user !== null){
          this.userName = user.user.name;
          for(let r in user.user._roles){
            if(user.user._roles[r] === 'admin'){
             this.isAuthenticate = true;
            }
           }
        }
      });
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

}
