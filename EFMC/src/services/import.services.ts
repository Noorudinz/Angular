import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Building } from 'src/app/building-master/building.model';
import { catchError, map, retry } from 'rxjs/operators';
import { collectExternalReferences } from '@angular/compiler';
import { BTU, Electricity, Water } from 'src/app/import-files/import-files.model';

@Injectable({
  providedIn: 'root',
})
export class ImportService {

  constructor(private http: HttpClient) {}

  getBTUList(){
    return this.http.get<BTU[]>(
       `https://localhost:44357/api/Imports/GetBTUList`
     );
   }

   getWaterList(){
    return this.http.get<Water[]>(
       `https://localhost:44357/api/Imports/GetWaterList`
     );
   }

   getElectricityList(){
    return this.http.get<Electricity[]>(
       `https://localhost:44357/api/Imports/GetElectricityList`
     );
   }

  uploadBTU(fileBrowser: any){

    let fileToUpload = <File>fileBrowser.files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    return this.http.post<{ message: string, isUpdated: boolean }>(
      `https://localhost:44357/api/Imports/UploadBTU`,
      formData, {reportProgress: true, observe: 'events'}
    );
  }

  uploadWater(fileBrowser: any){

    let fileToUpload = <File>fileBrowser.files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    return this.http.post<{ message: string, isUpdated: boolean }>(
      `https://localhost:44357/api/Imports/UploadWater`,
      formData, {reportProgress: true, observe: 'events'}
    );
  }

  uploadElectricity(fileBrowser: any){

    let fileToUpload = <File>fileBrowser.files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    return this.http.post<{ message: string, isUpdated: boolean }>(
      `https://localhost:44357/api/Imports/UploadElectricity`,
      formData, {reportProgress: true, observe: 'events'}
    );
  }

}
