import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Building } from 'src/app/building-master/building.model';
import { catchError, map, retry } from 'rxjs/operators';
import { collectExternalReferences } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class ImportService {

  constructor(private http: HttpClient) {}

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


  uploadBTU(fileBrowser: any){

    let fileToUpload = <File>fileBrowser.files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    return this.http.post<{ message: string, isUpdated: boolean }>(
      `https://localhost:44357/api/Imports/UploadBTU`,
      formData, {reportProgress: true, observe: 'events'}
    );

  }

}
