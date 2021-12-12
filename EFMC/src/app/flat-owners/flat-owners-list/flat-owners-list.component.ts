import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { FlatOwnersService } from 'src/services/flat-owners.service';
import { FlatList } from '../flat-owners.model';
declare var $;

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}


@Component({
  selector: 'app-flat-owners-list',
  templateUrl: './flat-owners-list.component.html',
  styleUrls: ['./flat-owners-list.component.css']
})
export class FlatOwnersListComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  private userSub: Subscription;
  flatOwnersList: any;
  flats: FlatList[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  isLoading = false;

  constructor(private flatOwnerService: FlatOwnersService) { }

  ngOnInit(): void {
    this.initDataTable();
  }

  private initDataTable(){

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.userSub = this.flatOwnerService.getFlatOwners().subscribe(data => {
      if(data !== null){
        this.flats = (data as any).data;
        this.dtTrigger.next();
      }
    });

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    if(this.userSub){
      this.userSub.unsubscribe();
    }
  }

}



