import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { FlatOwnersService } from 'src/services/flat-owners.service';
import { FlatList } from '../flat-owners.model';
import * as Alert from '../../toster/alert';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { getFlats } from '../store/flat-owner.selector';
import { loadFlats } from '../store/flat-owner.actions';


@Component({
  selector: 'app-flat-owners-list',
  templateUrl: './flat-owners-list.component.html',
  styleUrls: ['./flat-owners-list.component.css']
})
export class FlatOwnersListComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  //dtOptions: any = {};
  private userSub: Subscription;
  flatOwnersList: any;
  flats: FlatList[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  flatOwnerDetails: any;

  flatList: Observable<FlatList[]>;

  constructor(private flatOwnerService: FlatOwnersService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.initDataTable();
    this.store.select(getFlats);
    this.store.dispatch(loadFlats());
  }

  private initDataTable(){

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      // processing: true,
      // dom: 'Bfrtip',
      // buttons: ['print', 'excel']
    };

    // this.flatList = this.store.select(getFlats);
    // this.store.dispatch(loadFlats());
    // this.dtTrigger.next();

    this.userSub = this.flatOwnerService.getFlatOwners().subscribe(data => {
      if(data !== null){
        this.flats = (data as any).data;
        this.dtTrigger.next();
      }
    });

  }

  onDelete(flatNo: string){
  this.flatOwnerService.getFlatOwnersByFlatNo(flatNo).subscribe(data => {
    if(data['isUpdated']){
      this.flatOwnerDetails ={
        flatNo: data['flatOwners'][0].flatOwner.flatNo,
        firstName: data['flatOwners'][0].flatOwner.firstName
      }
     }
    });
  }

  onDeleteConfirm(){
    let flatNo = this.flatOwnerDetails.flatNo;
    this.flatOwnerService.deleteFlatOwner(flatNo).subscribe(data => {
      document.getElementById('closeBtn').click();
      if(data.isDeleted){
       Alert.tosterAlert(data.message, 'success');
      } else {
       Alert.tosterAlert(data.message, 'error');
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



