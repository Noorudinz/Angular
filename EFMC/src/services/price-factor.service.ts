import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dashboard } from 'src/app/dashboard/dashboard.model';
import { PriceFactor } from 'src/app/price-factor/price-factor.model';

@Injectable({
  providedIn: 'root',
})
export class PriceFactorService {
  constructor(private http: HttpClient) {}


  getPriceFactor(){
    return this.http.get<PriceFactor>(
      `https://localhost:44357/api/PriceFactor/GetPriceFactor`
    );
  }

  updatePriceFactor(priceFactor: PriceFactor){
    return this.http.post<{ message: string, isUpdated: boolean }>(
       `https://localhost:44357/api/PriceFactor/UpdatePriceFactor`,
       priceFactor
     );
   }

}
