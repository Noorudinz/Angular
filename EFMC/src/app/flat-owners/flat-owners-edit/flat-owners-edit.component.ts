import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setDate } from 'ngx-bootstrap/chronos/utils/date-setters';
import { Observable } from 'rxjs';
import { Building } from 'src/app/building-master/building.model';
import { loadBuilding } from 'src/app/building-master/store/building.actions';
import { getBuildings } from 'src/app/building-master/store/building.selector';
import { AppState } from 'src/app/store/app.reducer';
import { FlatOwnersService } from 'src/services/flat-owners.service';
import * as Alert from '../../toster/alert';
import { updateFlat } from '../store/flat-owner.actions';

@Component({
  selector: 'app-flat-owners-edit',
  templateUrl: './flat-owners-edit.component.html',
  styleUrls: ['./flat-owners-edit.component.css']
})
export class FlatOwnersEditComponent implements OnInit {

  flatOwnerForm: FormGroup;
  buildingList:  Observable<Building[]>;
  flatNo: any;
  flatOwnerDetails: any;

  constructor(private store: Store<AppState>,
    private flatOwnerService: FlatOwnersService,
    private route: Router,
    private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.initFlatOwnerForm();
    this.loadBuilding();
    this.flatNo = this.router.snapshot.paramMap.get('id');
    this.fetchFlatOwner(this.flatNo);
  }

  private fetchFlatOwner(flatNo: string){
    this.flatOwnerService.getFlatOwnersByFlatNo(flatNo).subscribe(data => {
      if(data['isUpdated']){
        this.flatOwnerDetails = {
          flatId: data['flatOwners'][0].flatOwner.flatId,
          flatNo: data['flatOwners'][0].flatOwner.flatNo,
          buildingType: data['flatOwners'][0].buildingType.buildingId,
          floorNo: data['flatOwners'][0].flatOwner.floorNo,
          area: data['flatOwners'][0].flatOwner.area,
          possesionDate: data['flatOwners'][0].flatOwner.possesionDate,
          bedRooms: data['flatOwners'][0].flatOwner.bedRooms,
          carParks: data['flatOwners'][0].flatOwner.carParks,
          familyName: data['flatOwners'][0].flatOwner.familyName,
          firstName: data['flatOwners'][0].flatOwner.firstName,
          mobileNumber: data['flatOwners'][0].flatOwner.mobileNumber,
          telNumber: data['flatOwners'][0].flatOwner.telNumber,
          email1: data['flatOwners'][0].flatOwner.email1,
          email2: data['flatOwners'][0].flatOwner.email2,
          address: data['flatOwners'][0].flatOwner.address,
          carNo: data['flatOwners'][0].flatOwner.carNo,
          carParkNos: data['flatOwners'][0].flatOwner.carParkNos
        }
        this.flatOwnerForm.patchValue(this.flatOwnerDetails);
      }
      else {
        this.route.navigate(['/flat-owners']);
        Alert.tosterAlert('Data not found !', 'warning')
      }
    });
  }

  private loadBuilding(){
    this.buildingList = this.store.select(getBuildings);
    this.store.dispatch(loadBuilding());
  }

  private initFlatOwnerForm(){
    let flatId = '';
    let flatNo = '';
    let buildingType = 0;
    let floorNo = '';
    let area = '';
    let possesionDate = new Date();
    let bedRooms = '';
    let carParks = '';
    let telNumber = '';
    let carParkNos = '';
    let familyName = '';
    let firstName = '';
    let mobileNumber = '';
    let email1 = '';
    let email2 = '';
    let carNo = '';
    let address = '';
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.flatOwnerForm = new FormGroup({
      'flatId': new FormControl(flatId),
      'flatNo': new FormControl(flatNo, [Validators.required]),
      'buildingType': new FormControl(buildingType, [Validators.required]),
      'floorNo': new FormControl(floorNo, [Validators.required]),
      'area': new FormControl(area, [Validators.required]),
      'possesionDate': new FormControl(possesionDate, [Validators.required]),
      'bedRooms': new FormControl(bedRooms, [Validators.required]),
      'carParks': new FormControl(carParks, [Validators.required]),
      'telNumber': new FormControl(telNumber, [Validators.required]),
      'carParkNos': new FormControl(carParkNos, [Validators.required]),
      'familyName': new FormControl(familyName, [Validators.required]),
      'firstName': new FormControl(firstName, [Validators.required]),
      'mobileNumber': new FormControl(mobileNumber, [Validators.required]),
      'email1': new FormControl(email1, [Validators.required, Validators.email, Validators.pattern(EMAIL_REGEX)]),
      'email2': new FormControl(email2, [Validators.required, Validators.email, Validators.pattern(EMAIL_REGEX)]),
      'carNo': new FormControl(carNo, [Validators.required]),
      'address': new FormControl(address, [Validators.required]),
    })
  }

  onSubmit(){
    if (!this.flatOwnerForm.valid) {
      return;
    }

    const flatsData = {
     flatId: this.flatOwnerForm.value.flatId,
     flatNo: this.flatOwnerForm.value.flatNo,
     buildingId: this.flatOwnerForm.value.buildingType,
     floorNo: this.flatOwnerForm.value.floorNo.toString(),
     area: this.flatOwnerForm.value.area.toString(),
     possessionDate: this.flatOwnerForm.value.possessionDate,
     bedRooms: this.flatOwnerForm.value.bedRooms.toString(),
     carParks: this.flatOwnerForm.value.carParks.toString(),
     telNumber: this.flatOwnerForm.value.telNumber,
     carParksNos: this.flatOwnerForm.value.carParksNos,
     familyName: this.flatOwnerForm.value.familyName,
     firstName: this.flatOwnerForm.value.firstName,
     mobileNumber: this.flatOwnerForm.value.mobileNumber,
     email1: this.flatOwnerForm.value.email1,
     email2: this.flatOwnerForm.value.email2,
     carNo: this.flatOwnerForm.value.carNo,
     address: this.flatOwnerForm.value.address,
     buildingType: null,
     carParkNos: null,
     isdel: false
    }

  //this.store.dispatch(updateFlat({ flatsData }));

   this.flatOwnerService.addFlatOwner(flatsData).subscribe(data => {
     if(data.isUpdated){
       Alert.tosterAlert(data.message, 'success');
       this.route.navigate(['/flat-owners']);
     } else {
      Alert.tosterAlert(data.message, 'error');
     }
   });

  }

  onClear(){
    this.flatOwnerForm.reset();
  }

}

