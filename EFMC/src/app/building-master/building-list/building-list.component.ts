import { Component, OnInit } from '@angular/core';
import { BuildingService } from 'src/services/building.service';

@Component({
  selector: 'app-building-list',
  templateUrl: './building-list.component.html',
  styleUrls: ['./building-list.component.css']
})
export class BuildingListComponent implements OnInit {

  buildingList: any;
  addOrEdit = false;
  constructor(private buildingService: BuildingService) { }

  ngOnInit(): void {
    this.loadBuilding();
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


