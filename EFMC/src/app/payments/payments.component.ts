import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from  '../store/app.reducer';
import * as Alert from '../toster/alert';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit, OnDestroy {

  private userSub: Subscription;
  constructor(private store: Store<fromApp.AppState>,
    private route: Router) { }

  ngOnInit(): void {
    this.userSub = this.store.select('auth')
    .subscribe(user => {
      if(user.user !== null){
        for(var r in user.user._roles){
          if(user.user._roles[r] !== 'admin'
          && user.user._roles[r] !== 'user'
          && user.user._roles[r] !== 'accountant'){
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
