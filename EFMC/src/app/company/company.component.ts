import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CompanyService } from 'src/services/company.service';
import { Company } from './company.model';
import * as fromApp from  '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as Alert from '../toster/alert';
import { ajax } from 'rxjs/ajax';
import { map, mergeMap } from 'rxjs/operators';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit, OnDestroy {

  private userSub: Subscription
  companyForm: FormGroup;

  company: Company;
  fetchCompany: any;
  editMode = false;
  passmsg: string;
  UserId: string;


  constructor(private companyService: CompanyService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {

    let src1$ = new Observable(obs => {
      setTimeout(() => {
        obs.next(1);
      }, 1000)
    });

    let src2$ = new Observable(obs => {
      setTimeout(() => {
        obs.next(2);
      }, 5000)
    });

    combineLatest([src1$, src1$]).subscribe(data => {
      console.log(data);
    });

    this.GetCompanyDetails();
    this.initForm();
    this.editMode = false;
    this.store.dispatch(new AuthActions.AutoLogin());

    this.userSub = this.store.select('auth')
      .subscribe(user => {
        this.UserId = user.user.id;
        if(user.user !== null){
          for(var r in user.user._roles){
            if(user.user._roles[r] === 'admin'){
              this.editMode = true;
            }
          }
        }
      });
  }

  private GetCompanyDetails(){
    this.companyService.getCompany().subscribe(data => {
      if(data !== null){
        this.fetchCompany = {
          OrgCode: data.org_Code,
          OrgName: data.org_Name,
          OrgAddress: data.org_Address,
          OrgEmail: data.org_Email,
          OrgPhone: data.org_Phone,
          Remarks: data.org_Remarks,
          Website: data.org_Website,
          Zipnumber: data.org_Zip
        }

        if(this.editMode){
          const showFormData = {
            orgId: data.orgId,
            org_Code: data.org_Code,
            org_Name: data.org_Name,
            org_Address: data.org_Address,
            org_Email: data.org_Email,
            org_Phone: data.org_Phone,
            org_Remarks: data.org_Remarks,
            org_Website: data.org_Website,
            org_Zip: data.org_Zip
          }
          this.companyForm.patchValue(showFormData);
        }


      }
    });
  }

  private initForm() {
    let orgId ='';
    let org_Code ='';
    let org_Name ='';
    let org_Address ='';
    let org_Zip ='';
    let org_Phone ='';
    let org_Email ='';
    let org_Website ='';
    let org_Remarks ='';
    let userId ='';

    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.companyForm = new FormGroup({
      'userId': new FormControl(userId),
      'orgId': new FormControl(orgId),
      'org_Code': new FormControl(org_Code, [Validators.required]),
      'org_Name': new FormControl(org_Name, [Validators.required]),
      'org_Address': new FormControl(org_Address, [Validators.required]),
      'org_Zip': new FormControl(org_Zip, [Validators.required]),
      'org_Phone': new FormControl(org_Phone, [Validators.required]),
      'org_Email': new FormControl(org_Email, [Validators.required, Validators.email, Validators.pattern(EMAIL_REGEX)]),
      'org_Website': new FormControl(org_Website, [Validators.required]),
      'org_Remarks': new FormControl(org_Remarks, [Validators.required]),
    });

  }



  onUpdate(){

    if (!this.companyForm.valid) {
      return;
    }

    const companyFormUpdate: Company = {
      orgId: this.companyForm.value.orgId,
      org_Code: this.companyForm.value.org_Code,
      org_Name: this.companyForm.value.org_Name,
      org_Address: this.companyForm.value.org_Address,
      org_Email: this.companyForm.value.org_Email,
      org_Phone: this.companyForm.value.org_Phone,
      org_Remarks: this.companyForm.value.org_Remarks,
      org_Website: this.companyForm.value.org_Website,
      org_Zip: this.companyForm.value.org_Zip,
      org_Logo: null,
      updated_ByUserId: this.UserId
    };

    this.companyService.updateCompany(companyFormUpdate).subscribe(data => {
      if(data.isUpdated){
        Alert.tosterAlert(data.message, 'success');
        document.getElementById("closeBtn").click();
        this.GetCompanyDetails();
      } else {
        Alert.tosterAlert(data.message, 'error');
      }
    })
  }

  ngOnDestroy(){
    if(this.userSub){
      this.userSub.unsubscribe();
    }
  }

}
