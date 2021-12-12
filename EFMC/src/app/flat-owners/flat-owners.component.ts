import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Alert from '../toster/alert';
import * as fromApp from  '../store/app.reducer';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-flat-owners',
  templateUrl: './flat-owners.component.html'
})
export class FlatOwnersComponent implements OnInit, OnDestroy {

  private userSub: Subscription;
  constructor( private store: Store<fromApp.AppState>,
    private route: Router) { }

  ngOnInit(): void {
    this.userSub = this.store.select('auth')
    .subscribe(user => {
      if(user.user !== null){
        for(var r in user.user._roles){
          if(user.user._roles[r] !== 'admin'){
           this.route.navigate(['/dashboard']);
           Alert.tosterAlert('Access denied !', 'error');
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    if(this.userSub){
     this.userSub.unsubscribe();
    }
  }
}
