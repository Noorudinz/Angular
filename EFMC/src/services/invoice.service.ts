
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Building } from 'src/app/building-master/building.model';
import { map } from 'rxjs/operators';
import * as env from 'src/environments/environment'
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Bills } from 'src/app/invoice/invoice.model';


@Injectable({
  providedIn: 'root',
})

export class InvoiceService {
  constructor(private http: HttpClient) {}


  getBillByFlatNo(flatNo: string){
    return this.http.get(
      env.environment.baserURL +`Todo/InvoiceByFlatNo/`+ flatNo
    );
  }

  getBills(){
    return this.http.get(
      env.environment.baserURL +`Todo/InvoiceByFlatNo`
    );
  }

  getInvoiceByBillNo(billNo: string){
    return this.http.get(
      env.environment.baserURL +`Todo/InvoiceByBillNo/`+ billNo
    );
  }

  getInvoiceByPeriods(selectedDate: string){
    return this.http.get<Bills[]>(
      env.environment.baserURL +`Todo/InvoiceByPeriods/`+ selectedDate
    );
  }

  generateBill(selectedDate: string){
    return this.http.get<Bills[]>(
      env.environment.baserURL +`Todo/GenerateBill/`+ selectedDate
    );
  }

  getSendMailList(selectedDate: string){
    return this.http.get<Bills[]>(
      env.environment.baserURL +`Todo/GetMailListToSendByPeriods/`+ selectedDate
    );
  }

  sendGeneratedBills(selectedDate: string){
    return this.http.get<Bills[]>(
      env.environment.baserURL +`Todo/SendMailGeneratedBills/`+ selectedDate
    );
  }

}
