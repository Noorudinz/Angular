import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Building } from 'src/app/building-master/building.model';

@Injectable({
  providedIn: 'root',
})
export class BuildingService {
  constructor(private http: HttpClient) {}


  getBuildings(){
   return this.http.get<Building>(
      `https://localhost:44357/api/Buildings/GetBuildings`
    );
  }

  addOrUpdateBuilding(building: Building){
   return this.http.post<{ message: string, isUpdated: boolean }>(
      `https://localhost:44357/api/Buildings/AddOrUpdateBuilding`,
      building
    );
  }

}
