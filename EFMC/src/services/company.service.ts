import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from 'src/app/company/company.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {}


  getCompany(){
   return this.http.get<Company>(
      `https://localhost:44357/api/Company/GetCompany`
    );
  }

  updateCompany(company: Company){
   return this.http.post<{ message: string, isUpdated: boolean }>(
      `https://localhost:44357/api/Company/UpdateCompany`,
      company
    );
  }

}
