import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import * as Alert from '../../toster/alert';
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';
import { DataTableDirective } from 'angular-datatables';
import { PaymentsService } from 'src/services/payments.service';
import { Store } from '@ngrx/store';
import * as fromApp from  '../../store/app.reducer';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  importBTUForm: FormGroup;
  receiptForm: FormGroup;

  maxDate: Date;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  private userSub: Subscription;
  private closeSub: Subscription;
  summaryList:  any;
  userName = '';
  isLoading = false;

  constructor(private paymentsService: PaymentsService,
    private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.userSub = this.store.select('auth')
    .subscribe(user => {
      if(user.user !== null){
        this.userName = user.user.name;
      }
    });

    this.initDataTable();
  }



  private initDataTable(){

    this.dtOptions = {
      pagingType: 'full_numbers',
      ordering: false,
      pageLength: 10,
      destroy: true,

    };

    this.loadSummaryData();
    this.isLoading = false;
  }

  private loadSummaryData(){
    this.closeSub = this.paymentsService.getSummary().subscribe(data => {
      if(data !== null){
        this.summaryList = data;
        this.dtTrigger.next();
      }
    });
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
    if(this.userSub){
      this.userSub.unsubscribe();
    }
  }


}
