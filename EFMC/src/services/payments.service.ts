

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as env from 'src/environments/environment'
import { Payments, Summary } from 'src/app/payments/payment.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class PaymentsService {
  constructor(private http: HttpClient) {}


  // getBillByFlatNo(flatNo: string){
  //   return this.http.get(
  //     env.environment.baserURL +`Todo/InvoiceByFlatNo/`+ flatNo
  //   );
  // }

  getReceipts(){
    return this.http.get<Payments[]>(
      env.environment.baserURL +`Payments/GetReceiptList`
    );
  }

  createReceipt(receipt){
    return this.http.post<{ message: string, isUpdated: boolean }>(
     env.environment.baserURL + `Payments/AddReceipt`,
     receipt
     );
   }

   getReceiptDetail(flatNo: string){
    return this.http.get(
      env.environment.baserURL +`Payments/GetReceiptByReceiptNo/`+ flatNo
    );
  }

  getSummary(){
    return this.http.get(
      env.environment.baserURL +`Payments/GetLastSummaryDetail/`
    );
  }

  getSummaryDetail(flatNo: string){
    return this.http.get(
      env.environment.baserURL +`Payments/GetSummaryByFlatNo/`+ flatNo
    );
  }

  //--------ngrx/store---------------------

  getSummaryStore(){
    return this.http.get<Summary[]>(
      env.environment.baserURL +`Payments/GetLastSummaryDetail/`
    );
  }

  getReceiptDetailStore(flatNo: string): Observable<Payments>{
    return this.http.get<Payments>(
      env.environment.baserURL +`Payments/GetReceiptByReceiptNo/`+ flatNo
    );
  }

  getSummaryDetailStore(flatNo: string): Observable<Summary>{
    return this.http.get<Summary>(
      env.environment.baserURL +`Payments/GetSummaryByFlatNo/`+ flatNo
    );
  }

}
