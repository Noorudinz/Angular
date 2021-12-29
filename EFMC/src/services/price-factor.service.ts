
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PriceFactor } from 'src/app/price-factor/price-factor.model';
import * as env from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class PriceFactorService {
  constructor(private http: HttpClient) {}


  getPriceFactor(){
    return this.http.get<PriceFactor>(
      env.environment.baserURL +`PriceFactor/GetPriceFactor`
    );
  }

  updatePriceFactor(priceFactor: PriceFactor){
    return this.http.post<{ message: string, isUpdated: boolean }>(
      env.environment.baserURL +`PriceFactor/UpdatePriceFactor`,
       priceFactor
     );
   }

   //ngrx/store services
   //--------------------

   getPriceFactorStore(){
    return this.http.get<PriceFactor[]>(
      env.environment.baserURL +`PriceFactor/GetPriceFactor`
    );
  }
  updatePriceFactorStore(priceFactor: PriceFactor){
    return this.http.post<{ message: string, isUpdated: boolean }>(
      env.environment.baserURL +`PriceFactor/UpdatePriceFactor`,
       priceFactor
     );
   }

}
