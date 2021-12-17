import {  Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import * as Alert from '../../toster/alert';
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';
import { InvoiceService } from 'src/services/invoice.service';
import { Bills } from '../invoice.model';
import { DataTableDirective } from 'angular-datatables';




@Component({
  selector: 'app-bill-generation',
  templateUrl: './bill-generation.component.html',
  styleUrls: ['./bill-generation.component.css']
})
export class BillGenerationComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  billGenerateForm: FormGroup;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  private userSub: Subscription;
  showGenerate = false;

  billList: Bills[] = [];
  isLoginMode = true;


  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.initImportForm();
    this.initDataTable();
  }


  private initImportForm(){
    let selectMonth = null;

    this.billGenerateForm = new FormGroup({
      'selectMonth': new FormControl(selectMonth, [Validators.required])
    });

  }

  private initDataTable(){

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      destroy: true,
    };

    this.loadData();
    //setTimeout(()=>this.showContent=true, 250);
    this.dtTrigger.next();
  }

  private loadData(){
    let dummyDate = new Date(1900,1,1);
    this.userSub = this.invoiceService.getInvoiceByPeriods(dummyDate.toISOString()).subscribe(data => {
      if(data !== null){
        this.billList = data;
        this.dtTrigger.next();
      }
    });
  }

  onOpenCalendar(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('month');
   }

   private addDays(date: Date){
    var result = new Date(date);
    result.setDate(result.getDate() + 1);
    return result;
   }

  onSubmit(){

    if(!this.billGenerateForm.valid){
      return
    }

    const findMonth = this.billGenerateForm.value.selectMonth;

    let selectedDate = this.addDays(findMonth);
   //console.log(selectedDate)
    this.userSub = this.invoiceService.getInvoiceByPeriods(selectedDate.toISOString())
    .subscribe(data => {
      if(data[0] !== undefined && data !== null){
        this.billList = data;
        Alert.tosterAlert('Bill already generated', 'warning');
        this.showGenerate = false;
      } else {
          this.showGenerate = true;
          this.billList = null;
      }

      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });

    });

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

  private convertToDate(dateString: string){
    //  Convert a "dd/MM/yyyy" string into a Date object
    let d = dateString.split("/");
    let dat = new Date(d[2] + '/' + d[1] + '/' + d[0]);
    return dat;
  }

  onGenerate(){
    var str = '01/'+ (<HTMLInputElement>document.getElementById("selectDate")).value;
    console.log(this.convertToDate(str));
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    if(this.userSub){
      this.userSub.unsubscribe();
    }
  }


}
