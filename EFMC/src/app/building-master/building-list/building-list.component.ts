import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.reducer';
import { BuildingService } from 'src/services/building.service';
import { Building } from '../building.model';
import { loadBuilding, loadBuildingSuccess } from '../store/building.actions';
import { getBuildings } from '../store/building.selector';

@Component({
  selector: 'app-building-list',
  templateUrl: './building-list.component.html',
  styleUrls: ['./building-list.component.css']
})
export class BuildingListComponent implements OnInit {
  buildingList: any;
  addOrEdit = false;
  buildings: Observable<Building[]>;
  constructor(private buildingService: BuildingService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
     //this.loadBuilding();
     this.buildings = this.store.select(getBuildings);
     console.log(this.buildings);
     this.store.dispatch(loadBuilding());
  }

 private loadBuilding(){
    this.buildingService.getBuildings().subscribe(data => {
      this.buildingList = data;
    });
  }

  addBuilding(){
  this.addOrEdit = !this.addOrEdit;
  }
}



