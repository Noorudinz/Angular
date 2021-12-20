import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import * as Alert from '../../toster/alert';
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';
import { InvoiceService } from 'src/services/invoice.service';
import { event } from 'jquery';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit, OnDestroy {

  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  importBTUForm: FormGroup;

  maxDate: Date;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  private userSub: Subscription;
  private closeSub: Subscription;
  billList:  any; //Bills[] = [];
  isLoading = false;



  constructor(private invoiceService : InvoiceService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.initImportForm();
    this.initDataTable();
  }


  private initImportForm(){
    let importDate = null;

    this.importBTUForm = new FormGroup({
      'importDate': new FormControl(importDate, [Validators.required]),
      'importFile': new FormControl('', [Validators.required])
    });
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate());

  }

  private initDataTable(){

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      destroy: true,

    };

    this.loadBillData();
    this.isLoading = false;
  }

  private loadBillData(){
    this.userSub = this.invoiceService.getBills().subscribe(data => {
      if(data !== null){
        this.billList = data;
        this.dtTrigger.next();
      }
    });
  }

  onOpenCalendar(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
      this.getOnChangeMonthData(event.date);
    };
    container.setViewMode('month');
   }

   private addDays(date: Date){
    var result = new Date(date);
    result.setDate(result.getDate() + 1);
    return result;
   }

   getOnChangeMonthData(date: Date){

     this.invoiceService.getInvoiceByPeriods(date.toDateString())
     .subscribe(data => {
      if(data !== null){
        this.billList = data;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      }
     });
   }

  onSubmit(){

    if(!this.importBTUForm.valid){
      return
    }

    // try {
    //   this.isLoading = true;

    //   this.closeSub = this.importService.uploadBTU(fileBrowser)
    //   .pipe(takeLast(1))
    //   .subscribe((data: HttpResponse<any>) => {
    //     console.log(data);
    //    if(data.body?.isUpdated){
    //     Alert.tosterAlert(data.body?.message, 'success');
    //    } else {
    //     Alert.tosterAlert(data.body?.message, 'error');
    //    }
    //    this.initDataTable();
    //    window.location.reload();
    //   },
    //   (err: HttpErrorResponse)=>{ console.log(err.message) });
    // }
    // catch(error){
    //   console.log(error);
    // }

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
