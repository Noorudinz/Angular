import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { EmailSettingService } from 'src/services/email-setting.service';
import * as Alert from '../toster/alert';
import * as fromApp from  '../store/app.reducer';
import { Router } from '@angular/router';
import { getEmails } from './store/email-setting.selector';
import { getEmailById, loadEmail, updateEmail } from './store/email-setting.actions';
import { Email } from './email.model';

@Component({
  selector: 'app-email-setting',
  templateUrl: './email-setting.component.html',
  styleUrls: ['./email-setting.component.css']
})
export class EmailSettingComponent implements OnInit, OnDestroy {

  private userSub: Subscription;
  emailSettingForm: FormGroup;
  emailSetting: any;

  constructor(private emailService: EmailSettingService,
    private store: Store<fromApp.AppState>,
    private route: Router) { }

  ngOnInit(): void {
    this.userSub = this.store.select('auth')
    .subscribe(user => {

      if(user.user !== null){
        for(var r in user.user._roles){
          if(user.user._roles[r] !== 'admin'){
           this.route.navigate(['/dashboard']);
           Alert.tosterAlert('Access denied !', 'error');
          }
        }
      }
    });

   this.loadEmail();
   this.initEmailForm();

   this.store.select(getEmails);
   this.store.dispatch(loadEmail());
  }

  private loadEmail(){
    this.emailService.getEmail().subscribe( data => {
      if(data){
        this.emailSetting = data;
      }
    });
  }

  private initEmailForm(){
    let id = 1;
    let emailAddress = '';
    let password = '';
    let host = '';
    let port = '';
    let cc = '';

    this.emailSettingForm = new FormGroup({
      'id': new FormControl(id),
      'emailAddress': new FormControl(emailAddress, [Validators.required, Validators.email]),
      'password': new FormControl(password, [Validators.required]),
      'host': new FormControl(host, [Validators.required]),
      'port': new FormControl(port, [Validators.required]),
      'cc': new FormControl(cc, [Validators.required, Validators.email])
    });
  }

  onEditEmail(){

    this.emailService.getEmail()
    .subscribe(data => {
      if(data !== null){
        this.emailSettingForm.patchValue(data);
      }
    });

    let id = 1;
    this.store.dispatch(getEmailById({ id }));
  }

  onSubmit(){

    if(!this.emailSettingForm.valid){
      return
    }

     const email = {
      id: 1,
      emailAddress: this.emailSettingForm.value.emailAddress,
      password: this.emailSettingForm.value.password,
      host: this.emailSettingForm.value.host,
      port: this.emailSettingForm.value.port,
      cc: this.emailSettingForm.value.cc,
      updated_Date: null,
     }

     this.emailService.updateEmailSetting(email)
     .subscribe(data => {
       if(data.isUpdated){
         document.getElementById('closeBtn').click();
         Alert.tosterAlert(data.message, 'success');
         this.loadEmail();
       } else {
        Alert.tosterAlert(data.message, 'error');
       }
     });

    // const email: Email = {
    //   id: 1,
    //   emailAddress: this.emailSettingForm.value.emailAddress,
    //   password: this.emailSettingForm.value.password,
    //   host: this.emailSettingForm.value.host,
    //   port: this.emailSettingForm.value.port,
    //   cc: this.emailSettingForm.value.cc,
    //   updated_Date: null,
    //  }

    //this.store.dispatch(updateEmail({ email }));
  }

  ngOnDestroy(): void {
      if(this.userSub){
        this.userSub.unsubscribe();
      }
  }

}
