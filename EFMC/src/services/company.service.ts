import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from 'src/app/company/company.model';
import * as env from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {}


  getCompany(){
   return this.http.get<Company>(
    env.environment.baserURL +`Company/GetCompany`
    );
  }

  updateCompany(company: Company){
   return this.http.post<{ message: string, isUpdated: boolean }>(
    env.environment.baserURL +`Company/UpdateCompany`,
      company
    );
  }

}
