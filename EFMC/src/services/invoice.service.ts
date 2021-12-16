
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Building } from 'src/app/building-master/building.model';
import { map } from 'rxjs/operators';
import * as env from 'src/environments/environment'


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

}
