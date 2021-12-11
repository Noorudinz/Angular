import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from 'src/app/email-setting/email.model';

@Injectable({
  providedIn: 'root',
})
export class EmailSettingService {
  constructor(private http: HttpClient) {}


  getEmail(){
    return this.http.get<Email>(
      `https://localhost:44357/api/Email/GetEmail`
    );
  }

  updateEmailSetting(email: Email){
    return this.http.post<{ message: string, isUpdated: boolean }>(
       `https://localhost:44357/api/Email/UpdateEmailSetting`,
       email
     );
   }

}
