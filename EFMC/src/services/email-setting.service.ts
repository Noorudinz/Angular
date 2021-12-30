import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email, EmailData } from 'src/app/email-setting/email.model';
import * as env from 'src/environments/environment'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmailSettingService {
  constructor(private http: HttpClient) {}


  getEmail(){
    return this.http.get<Email>(
      env.environment.baserURL +`Email/GetEmail`
    );
  }

  updateEmailSetting(email: Email){
    return this.http.post<{ message: string, isUpdated: boolean }>(
      env.environment.baserURL + `Email/UpdateEmailSetting`,
       email
     );
   }

    //ngrx/store services
   //--------------------

   getEmailSettingStore(){
    return this.http.get<EmailData[]>(
      env.environment.baserURL +`Email/GetEmail`
    );
  }

  updateEmailStore(email: Email) {
    return this.http.post<{ message: string, isUpdated: boolean }>(
      env.environment.baserURL + `Email/UpdateEmailSetting`,
       email
     );
  }

  getEmailByIdStore(Id: number): Observable<EmailData[]>{
    return this.http
    .get<EmailData[]>(env.environment.baserURL + `Email/GetEmailById/`+Id)
    .pipe(
      map((data) => {
        const emails: EmailData[] = [];
        for (let key in data) {
          emails.push({ ...data[key] });
        }
        return emails;
      })
    );
  }

}
