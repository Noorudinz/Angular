import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { BuildingService } from 'src/services/building.service';
import { BuildingEditComponent } from '../building-edit/building-edit.component';
import { Building } from '../building.model';
import { loadBuilding } from '../store/building.actions';
import { getBuildings } from '../store/building.selector';
import * as Alert from '../../toster/alert';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-building-list',
  templateUrl: './building-list.component.html',
  styleUrls: ['./building-list.component.css']
})
export class BuildingListComponent implements OnInit, OnDestroy {
  @ViewChild('resetBuilding') resetBuldingAdd: BuildingEditComponent;

  buildingEdit: any;
  buildingDelete: any;
  addOrEdit = false;
  userId: string;
  callModal: string;

  private userSub: Subscription;
  buildings: Observable<Building[]>;
  constructor(private buildingService: BuildingService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
     //this.loadBuilding();
     this.userSub = this.store.select('auth')
     .subscribe(user => {
       this.userId = user.user.id;
     });

   this.loadBuilding();

  }

  public loadBuilding(){
    this.buildings = this.store.select(getBuildings);
    this.store.dispatch(loadBuilding());
  }

  editBuilding(id: number){

   if(id === 0 || id === null){
    Alert.tosterAlert('Invalid request !', 'error');
    return;
   }

    this.buildings.pipe(take(1)).subscribe(data => {
     const building = data.find(f => f.buildingId === id);

      if(building){
        const patchBuilding = {
          userId: this.userId,
          buildingId: building.buildingId,
          buildingName: building.buildingName,
          buildingCode: building.buildingCode,
          buildingIncharge: building.buildingIncharge,
          floors: building.floors,
          erf: building.erf,
          wrf: building.wrf,
          arf: building.arf,
          remarks: building.remarks,
          created_ByUserId: null,
          updated_ByUserId: null
        }

        this.callModal = "#modal-editbuilding";
        this.buildingEdit =  patchBuilding;
      }
   });

  }

  deleteBuilding(id: number){

    if(id === 0 || id === null){
     Alert.tosterAlert('Invalid request !', 'error');
     return;
    }

     this.buildings.subscribe(data => {
      const building = data.find(f => f.buildingId === id);

       if(building){
        const patchBuilding = {
          userId: this.userId,
          buildingId: building.buildingId,
          buildingName: building.buildingName,
          buildingCode: building.buildingCode,
          }

        this.callModal = '#modal-user';
        this.buildingDelete =  patchBuilding;
      }
    });

   }

  ngOnDestroy(): void {
    if(this.userSub){
      this.userSub.unsubscribe();
    }
  }
}



