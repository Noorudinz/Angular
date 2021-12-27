import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { PriceFactorService } from '../../services/price-factor.service';
import * as Alert from '../toster/alert';
import * as fromApp from  '../store/app.reducer';
import { Router } from '@angular/router';
import { getFactors } from './store/price-factor.selector';
import { loadFactor } from './store/price-factor.actions';

@Component({
  selector: 'app-price-factor',
  templateUrl: './price-factor.component.html',
  styleUrls: ['./price-factor.component.css']
})
export class PriceFactorComponent implements OnInit, OnDestroy {

  private userSub: Subscription;
  priceFactor: any;
  priceFactorForm: FormGroup;

  constructor(private priceFactorService: PriceFactorService,
    private store: Store<fromApp.AppState>,
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

    this.loadPriceFactor();
    this.initPriceFactorForm();

    this.store.select(getFactors);
    this.store.dispatch(loadFactor());
  }

  private loadPriceFactor() {
    this.priceFactorService.getPriceFactor().subscribe( data => {
      if(data){
        this.priceFactor = data;
      }
    });
  }

  private initPriceFactorForm(){
    let priceID = 1;
    let btuFactor = 0;
    let electricityFactor = 0;
    let waterFactor = 0;
    let serviceCharge = 0;
    let otherCharges = 0;

    this.priceFactorForm = new FormGroup({
      'priceID': new FormControl(priceID),
      'btuFactor': new FormControl(btuFactor, [Validators.required]),
      'electricityFactor': new FormControl(electricityFactor, [Validators.required]),
      'waterFactor': new FormControl(waterFactor, [Validators.required]),
      'serviceCharge': new FormControl(serviceCharge, [Validators.required]),
      'otherCharges': new FormControl(otherCharges, [Validators.required])
    });
  }

  onEditPriceFactor(){
    this.priceFactorService.getPriceFactor()
    .subscribe(data => {
      if(data !== null){
        this.priceFactorForm.patchValue(data[0]);
      }
    });
  }

  onSubmit(){

    if(!this.priceFactorForm.valid){
      return
    }

     const updatePriceFactor = {
      priceID: 1,
      btuFactor: this.priceFactorForm.value.btuFactor,
      electricityFactor: this.priceFactorForm.value.electricityFactor,
      waterFactor: this.priceFactorForm.value.waterFactor,
      serviceCharge: this.priceFactorForm.value.serviceCharge,
      otherCharges: this.priceFactorForm.value.otherCharges,
      created_date: null,
      updated_date: null,
     }

     this.priceFactorService.updatePriceFactor(updatePriceFactor)
     .subscribe(data => {
       if(data.isUpdated){
         document.getElementById('closeBtn').click();
         Alert.tosterAlert(data.message, 'success');
         this.loadPriceFactor();
       } else {
        Alert.tosterAlert(data.message, 'error');
       }
     });
  }

  ngOnDestroy(): void {
    if(this.userSub){
      this.userSub.unsubscribe();
    }
}

}


