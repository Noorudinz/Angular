import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as env from 'src/environments/environment'
import { FlatList, FlatOwners } from 'src/app/flat-owners/flat-owners.model';


@Injectable({
  providedIn: 'root',
})
export class FlatOwnersService {
  constructor(private http: HttpClient) {}


  getFlatOwners(){
   return this.http.get<FlatList[]>(
    env.environment.baserURL +`FlatOwner/GetFlatOwners`
    );
  }

  getFlatOwnersByFlatNo(flatNo: string){
    return this.http.get(
      env.environment.baserURL +`FlatOwner/GetFlatOwnerByFlatNo/`+ flatNo
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

  addFlatOwner(flatOwner){
   return this.http.post<{ message: string, isUpdated: boolean }>(
    env.environment.baserURL +`FlatOwner/AddFlatOwner`,
      flatOwner
    );
  }


  deleteFlatOwner(flatNo: string): Observable<{id: string, message: string, isDeleted: boolean}>  {
    return this.http.delete<{id: string, message: string, isDeleted: boolean}>(
      `https://localhost:44357/api/FlatOwner/DeleteFlat/`+flatNo
    );
  }

  //------ngrx/store--------------------
  addFlatStore(flat: FlatList): Observable<{ message: string, isUpdated: boolean }> {
    return this.http.post<{ message: string, isUpdated: boolean }>(
      env.environment.baserURL + `Buildings/AddOrUpdateBuilding`,
      flat
    );
  }

  getFlatById(id: string): Observable<FlatList> {
    return this.http.get<FlatList>(
      env.environment.baserURL +`FlatOwner/GetFlatOwnerByFlatNo/`+ id
    );
  }

  updateFlatStore(flat: FlatOwners): Observable<{ message: string, isUpdated: boolean }> {
    return this.http.post<{ message: string, isUpdated: boolean }>(
      env.environment.baserURL + `FlatOwner/AddFlatOwner`,
      flat
    );
  }


}
