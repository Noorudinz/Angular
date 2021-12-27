import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Building } from 'src/app/building-master/building.model';
import { loadBuilding } from 'src/app/building-master/store/building.actions';
import { getBuildings } from 'src/app/building-master/store/building.selector';
import { AppState } from 'src/app/store/app.reducer';
import { FlatOwnersService } from 'src/services/flat-owners.service';
import * as Alert from '../../toster/alert';
import { FlatList, FlatOwners } from '../flat-owners.model';
import { addFlat } from '../store/flat-owner.actions';

@Component({
  selector: 'app-flat-owner-add',
  templateUrl: './flat-owner-add.component.html',
  styleUrls: ['./flat-owner-add.component.css']
})
export class FlatOwnerAddComponent implements OnInit {

  flatOwnerForm: FormGroup;
  buildingList:  Observable<Building[]>;

  constructor(private store: Store<AppState>,
    private flatOwnerService: FlatOwnersService,
    private route: Router) { }

  ngOnInit(): void {
    this.initFlatOwnerForm();
    this.loadBuilding();
  }

  private loadBuilding(){
    this.buildingList = this.store.select(getBuildings);
    this.store.dispatch(loadBuilding());
  }

  private initFlatOwnerForm(){
    let flatNo = '';
    let buildingType = 0;
    let floorNo = '';
    let area = '';
    let possesionDate = '';
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

    const addFlatOwner: FlatList = {
      flatNo: this.flatOwnerForm.value.flatNo,
      buildingId: this.flatOwnerForm.value.buildingType,
      floorNo: this.flatOwnerForm.value.floorNo.toString(),
      area: this.flatOwnerForm.value.area.toString(),
      possesionDate: this.flatOwnerForm.value.possesionDate,
      bedRooms: this.flatOwnerForm.value.bedRooms.toString(),
      carParks: this.flatOwnerForm.value.carParks.toString(),
      telNumber: this.flatOwnerForm.value.telNumber,
      carParkNos: this.flatOwnerForm.value.carParkNos,
      familyName: this.flatOwnerForm.value.familyName,
      firstName: this.flatOwnerForm.value.firstName,
      mobileNumber: this.flatOwnerForm.value.mobileNumber,
      email1: this.flatOwnerForm.value.email1,
      email2: this.flatOwnerForm.value.email2,
      carNo: this.flatOwnerForm.value.carNo,
      address: this.flatOwnerForm.value.address,
      flatId: 0,
      isdel: false,
      buildingType: ''
    }

   this.flatOwnerService.addFlatOwner(addFlatOwner).subscribe(data => {
     if(data.isUpdated){
       Alert.tosterAlert(data.message, 'success');
       this.route.navigate(['/flat-owners']);
     } else {
      Alert.tosterAlert(data.message, 'error');
     }
   });

  // this.store.dispatch(addFlat({ addFlatOwner }));

  }

  onClear(){
    this.flatOwnerForm.reset();
  }

}
