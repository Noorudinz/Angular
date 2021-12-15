
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BTU, Electricity, Water } from 'src/app/import-files/import-files.model';
import * as env from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ImportService {

  constructor(private http: HttpClient) {}

  getBTUList(){
    return this.http.get<BTU[]>(
      env.environment.baserURL +`Imports/GetBTUList`
     );
   }

   getWaterList(){
    return this.http.get<Water[]>(
      env.environment.baserURL +`Imports/GetWaterList`
     );
   }

   getElectricityList(){
    return this.http.get<Electricity[]>(
      env.environment.baserURL +`Imports/GetElectricityList`
     );
   }

  uploadBTU(fileBrowser: any){

    let fileToUpload = <File>fileBrowser.files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    return this.http.post<{ message: string, isUpdated: boolean }>(
      env.environment.baserURL +`Imports/UploadBTU`,
      formData, {reportProgress: true, observe: 'events'}
    );
  }

  uploadWater(fileBrowser: any){

    let fileToUpload = <File>fileBrowser.files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    return this.http.post<{ message: string, isUpdated: boolean }>(
      env.environment.baserURL +`Imports/UploadWater`,
      formData, {reportProgress: true, observe: 'events'}
    );
  }

  uploadElectricity(fileBrowser: any){

    let fileToUpload = <File>fileBrowser.files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    return this.http.post<{ message: string, isUpdated: boolean }>(
      env.environment.baserURL +`Imports/UploadElectricity`,
      formData, {reportProgress: true, observe: 'events'}
    );
  }

}
