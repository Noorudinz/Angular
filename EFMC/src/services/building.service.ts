import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Building } from 'src/app/building-master/building.model';
import { map } from 'rxjs/operators';
import * as env from 'src/environments/environment'


@Injectable({
  providedIn: 'root',
})
export class BuildingService {
  constructor(private http: HttpClient) {}


  // getBuildings(){
  //  return this.http.get<Building>(
  //     `https://localhost:44357/api/Buildings/GetBuildings`
  //   );
  // }

  getBuildings(): Observable<Building[]> {
    return this.http
      .get<Building[]>(env.environment.baserURL + `Buildings/GetBuildings`)
      .pipe(
        map((data) => {
          const buildings: Building[] = [];
          for (let key in data) {
            buildings.push({ ...data[key] });
          }
          return buildings;
        })
      );
  }

  // getBuildings(): Observable<ReadonlyArray<Building>> {
  //   return this.http.get<ReadonlyArray<Building>>
  //   (`https://localhost:44357/api/Buildings/GetBuildings`).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       console.error(error);
  //       return throwError(error);
  //     })
  //   );
  // }

  addOrUpdateBuilding(building: Building){
   return this.http.post<{ message: string, isUpdated: boolean }>(
    env.environment.baserURL + `Buildings/AddOrUpdateBuilding`,
      building
    );
  }


  deleteBuilding(id: number, code: string): Observable<{id: string, message: string, isDeleted: boolean}>  {
    return this.http.delete<{id: string, message: string, isDeleted: boolean}>(
      env.environment.baserURL + `Buildings/DeleteBuilding/`+id +`/`+code
    );
  }

  //-----ngrx store--------------------------

  addBuilding(building: Building): Observable<{ message: string, isUpdated: boolean }> {
    return this.http.post<{ message: string, isUpdated: boolean }>(
      env.environment.baserURL + `Buildings/AddOrUpdateBuilding`,
      building
    );
  }

}
