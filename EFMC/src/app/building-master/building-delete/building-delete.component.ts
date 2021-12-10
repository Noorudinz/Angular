import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { BuildingService } from 'src/services/building.service';
import * as fromApp from  '../../store/app.reducer';
import * as Alert from '../../toster/alert';

@Component({
  selector: 'app-building-delete',
  templateUrl: './building-delete.component.html',
  styleUrls: ['./building-delete.component.css']
})
export class BuildingDeleteComponent implements OnInit {

  @Input() building: any;
  @Output() triggerBuildingList: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  constructor(private store: Store<fromApp.AppState>,
    private buildingService: BuildingService,) { }

  ngOnInit(): void {
  }

  onDeleteConfirm(){
    let id = this.building.buildingId;
    let code = this.building.buildingCode;
    this.buildingService.deleteBuilding(id, code).subscribe(data => {
      if(data.isDeleted){
        document.getElementById('closeBtn').click();
        Alert.tosterAlert(data.message, 'success');
        this.triggerBuildingList.emit();
      } else {
        Alert.tosterAlert(data.message, 'error');
      }
    });
  }

}
