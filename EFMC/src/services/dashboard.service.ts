import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dashboard } from 'src/app/dashboard/dashboard.model';
import * as env from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}


  getDashboardDetails(){
   return this.http.get<Dashboard>(
    env.environment.baserURL +`Dashboard/GetDashboardDetails`
    );
  }

  getDashboardBarChartDetails(){
    return this.http.get(
     env.environment.baserURL +`Dashboard/FetchDataForBarCharts`
     );
   }

   getDashboardPieChartDetails(){
    return this.http.get(
     env.environment.baserURL +`Dashboard/FetchDataForPieCharts`
     );
   }

}
