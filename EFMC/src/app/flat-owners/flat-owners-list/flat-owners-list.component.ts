import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
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
  flatOwnersList: any;
  flats: FlatList[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.initDataTable();
    // this.flatOwnerService.getFlatOwners().subscribe(data => {
    //   if(data !== null){
    //     this.flatOwnersList = data;
    //     console.log(data);
    //   }
    // });
  }

  private initDataTable(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
    this.http.get<FlatList[]>('https://localhost:44357/api/FlatOwner/GetFlatOwners')
      .subscribe(data => {
        this.flats = (data as any).data;
        this.dtTrigger.next();
      });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}



