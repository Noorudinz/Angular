import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlatOwnersService } from 'src/services/flat-owners.service';

@Component({
  selector: 'app-flat-owner-detail',
  templateUrl: './flat-owner-detail.component.html',
  styleUrls: ['./flat-owner-detail.component.css']
})
export class FlatOwnerDetailComponent implements OnInit {

  public flatNo: string;
  flatOwnerDetails: any;

  constructor(private route: ActivatedRoute,
    private flatOwnerService: FlatOwnersService) { }

  ngOnInit(): void {
    this.flatNo = this.route.snapshot.paramMap.get('id');
    this.fetchFlatOwner(this.flatNo);
  }

  private fetchFlatOwner(flatNo: string){
    this.flatOwnerService.getFlatOwnersByFlatNo(flatNo).subscribe(data => {
      if(data !== null){
        this.flatOwnerDetails = {
          flatNo: data[0].flatOwner.flatNo,
          buildingType: data[0].buildingType.buildingName,
          floorNo: data[0].flatOwner.floorNo,
          area: data[0].flatOwner.area,
          possesionDate: data[0].flatOwner.possesionDate,
          bedRooms: data[0].flatOwner.bedRooms,
          familyName: data[0].flatOwner.familyName,
          firstName: data[0].flatOwner.firstName,
          mobileNumber: data[0].flatOwner.mobileNumber,
          telNumber: data[0].flatOwner.telNumber,
          email1: data[0].flatOwner.email1,
          email2: data[0].flatOwner.email2,
          address: data[0].flatOwner.address,
          carNo: data[0].flatOwner.carNo,
          carParkNos: data[0].flatOwner.carParkNos,
          createdDate: data[0].flatOwner.created_date,
          status: data[0].flatOwner.isdel === false? 'Active' : 'InActive',
          updatedDate: data[0].flatOwner.updated_date === null? 'N/A' : data[0].flatOwner.updated_date
        }
      }

      console.log(data[0].flatOwner.flatNo);
    });
  }

}
