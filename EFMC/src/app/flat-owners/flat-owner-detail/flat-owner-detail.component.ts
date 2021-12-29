import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FlatOwnersService } from 'src/services/flat-owners.service';
import * as Alert from '../../toster/alert';
import { AppState } from 'src/app/store/app.reducer';
import { getFlatById } from '../store/flat-owner.selector';
import { Observable } from 'rxjs';
import { data } from 'jquery';

@Component({
  selector: 'app-flat-owner-detail',
  templateUrl: './flat-owner-detail.component.html',
  styleUrls: ['./flat-owner-detail.component.css']
})
export class FlatOwnerDetailComponent implements OnInit {

  public flatNo: string;
  flatOwnerDetails: any;

  flatDet: Observable<any>;

  constructor(private route: ActivatedRoute,
    private flatOwnerService: FlatOwnersService,
    private routeNav: Router,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.flatNo = this.route.snapshot.paramMap.get('id');
    this.fetchFlatOwner(this.flatNo);
    console.log(this.store.select(getFlatById));
  }

  private fetchFlatOwner(flatNo: string){
    this.flatOwnerService.getFlatOwnersByFlatNo(flatNo).subscribe(data => {
      if(data['isUpdated']){
        this.flatOwnerDetails = {
          flatNo: data['flatOwners'][0].flatOwner.flatNo,
          buildingType: data['flatOwners'][0].buildingType.buildingName,
          floorNo: data['flatOwners'][0].flatOwner.floorNo,
          area: data['flatOwners'][0].flatOwner.area,
          possesionDate: data['flatOwners'][0].flatOwner.possesionDate,
          bedRooms: data['flatOwners'][0].flatOwner.bedRooms,
          familyName: data['flatOwners'][0].flatOwner.familyName,
          firstName: data['flatOwners'][0].flatOwner.firstName,
          mobileNumber: data['flatOwners'][0].flatOwner.mobileNumber,
          telNumber: data['flatOwners'][0].flatOwner.telNumber,
          email1: data['flatOwners'][0].flatOwner.email1,
          email2: data['flatOwners'][0].flatOwner.email2,
          address: data['flatOwners'][0].flatOwner.address,
          carNo: data['flatOwners'][0].flatOwner.carNo,
          carParkNos: data['flatOwners'][0].flatOwner.carParkNos,
          createdDate: data['flatOwners'][0].flatOwner.created_date,
          status: data['flatOwners'][0].flatOwner.isdel === false? 'Active' : 'InActive',
          updatedDate: data['flatOwners'][0].flatOwner.updated_date === null? 'N/A' : data['flatOwners'][0].flatOwner.updated_date
        }
      }
      else {
        this.routeNav.navigate(['/flat-owners']);
        Alert.tosterAlert('Data not found !', 'warning')
      }
    });
  }

}
