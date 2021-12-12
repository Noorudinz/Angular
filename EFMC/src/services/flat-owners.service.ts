import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Building } from 'src/app/building-master/building.model';
import { FlatOwners } from 'src/app/flat-owners/flat-owners.model';


@Injectable({
  providedIn: 'root',
})
export class FlatOwnersService {
  constructor(private http: HttpClient) {}


  getFlatOwners(){
   return this.http.get<FlatOwners>(
      `https://localhost:44357/api/FlatOwner/GetFlatOwners`
    );
  }

  // getBuildings(): Observable<Building[]> {
  //   return this.http
  //     .get<Building[]>(`https://localhost:44357/api/Buildings/GetBuildings`)
  //     .pipe(
  //       map((data) => {
  //         const buildings: Building[] = [];
  //         for (let key in data) {
  //           buildings.push({ ...data[key] });
  //         }
  //         return buildings;
  //       })
  //     );
  // }

  // getBuildings(): Observable<ReadonlyArray<Building>> {
  //   return this.http.get<ReadonlyArray<Building>>
  //   (`https://localhost:44357/api/Buildings/GetBuildings`).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       console.error(error);
  //       return throwError(error);
  //     })
  //   );
  // }

  // addOrUpdateBuilding(building: Building){
  //  return this.http.post<{ message: string, isUpdated: boolean }>(
  //     `https://localhost:44357/api/Buildings/AddOrUpdateBuilding`,
  //     building
  //   );
  // }


  // deleteBuilding(id: number, code: string): Observable<{id: string, message: string, isDeleted: boolean}>  {
  //   return this.http.delete<{id: string, message: string, isDeleted: boolean}>(
  //     `https://localhost:44357/api/Buildings/DeleteBuilding/`+id +`/`+code
  //   );
  // }

}
