import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PriceFactorService } from 'src/services/price-factor.service';
import * as Alert from '../toster/alert';

@Component({
  selector: 'app-price-factor',
  templateUrl: './price-factor.component.html',
  styleUrls: ['./price-factor.component.css']
})
export class PriceFactorComponent implements OnInit {

  priceFactor: any;
  priceFactorForm: FormGroup;

  constructor(private priceFactorService: PriceFactorService) { }

  ngOnInit(): void {
    this.loadPriceFactor();
    this.initPriceFactorForm();
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

}


