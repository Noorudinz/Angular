import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BuildingService } from 'src/services/building.service';
import * as fromApp from  '../../store/app.reducer';
import * as Alert from '../../toster/alert';
import { Building } from '../building.model';
import { updateBuilding } from '../store/building.actions';



@Component({
  selector: 'app-building-edit',
  templateUrl: './building-edit.component.html',
  styleUrls: ['./building-edit.component.css']
})
export class BuildingEditComponent implements OnInit {

  @Input() building: any;
  callModal: string;
  private userSub: Subscription;
  buildingForm: FormGroup;
  userId: string;

  @Output() triggerBuildingList: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  constructor(private store: Store<fromApp.AppState>,
    private buildingService: BuildingService,
    private route: Router) { }

  ngOnInit(): void {

    this.userSub = this.store.select('auth')
      .subscribe(user => {
        this.userId = user.user.id;
      });

      this.initBuildingForm();
  }

  onClose(){
   this.buildingForm.reset();
  }

  public initBuildingForm()
  {
    let buildingId = 0;
    let buildingName ='';
    let buildingCode ='';
    let buildingIncharge ='';
    let floors = '';
    let erf ='';
    let arf ='';
    let wrf ='';
    let remarks ='';
    let userId = this.userId ;

    this.buildingForm = new FormGroup({
      'userId': new FormControl(userId),
      'buildingId': new FormControl(buildingId),
      'buildingName': new FormControl(buildingName, [Validators.required]),
      'buildingCode': new FormControl(buildingCode, [Validators.required]),
      'buildingIncharge': new FormControl(buildingIncharge, [Validators.required]),
      'floors': new FormControl(floors, [Validators.required]),
      'erf': new FormControl(erf, [Validators.required]),
      'arf': new FormControl(arf, [Validators.required]),
      'wrf': new FormControl(wrf, [Validators.required]),
      'remarks': new FormControl(remarks, [Validators.required]),
    });
  }

  onSubmit(){

    if(!this.buildingForm.valid){
      return
    }

    const building = {
      created_ByUserId: this.userId,
      updated_ByUserId: this.userId,
      buildingId: this.buildingForm.value.buildingId,
      BuildingName: this.buildingForm.value.buildingName,
      buildingCode: this.buildingForm.value.buildingCode,
      buildingIncharge: this.buildingForm.value.buildingIncharge,
      floors: this.buildingForm.value.floors.toString(),
      erf: this.buildingForm.value.erf,
      wrf: this.buildingForm.value.wrf,
      arf: this.buildingForm.value.arf,
      remarks: this.buildingForm.value.remarks,
      timeStamp: null
    }

    //this.store.dispatch(updateBuilding({ building }));

    this.buildingService.addOrUpdateBuilding(building).subscribe(data => {
      if(data.isUpdated){
        document.getElementById('closeEdit').click();
        Alert.tosterAlert(data.message, 'success');
        this.triggerBuildingList.emit();
      }
      else{
        Alert.tosterAlert(data.message, 'error');
      }
    },
    err => {
      console.log(err);
    });

    this.buildingForm.reset();

  }

}


