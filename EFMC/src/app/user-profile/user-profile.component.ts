import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from  '../store/app.reducer';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  private userSub: Subscription;

  fetchUser: any;
  rolesList: string

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.userSub = this.store.select('auth')
      .subscribe(user => {
        if(user.user !== null){
          this.fetchUser = {
            name: user.user.name,
            email: user.user.email,
            rolesList: user.user._roles.join(" / ")
          }
        }
      });
  }

  ngOnDestroy(){
    if(this.userSub){
      this.userSub.unsubscribe();
    }
  }

}
