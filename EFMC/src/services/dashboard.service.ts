import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dashboard } from 'src/app/dashboard/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}


  getDashboardDetails(){
   return this.http.get<Dashboard>(
      `https://localhost:44357/api/Dashboard/GetDashboardDetails`
    );
  }

}
