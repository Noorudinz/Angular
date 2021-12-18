import {  Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import * as Alert from '../../toster/alert';
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';
import { InvoiceService } from 'src/services/invoice.service';
import { Bills } from '../invoice.model';
import { DataTableDirective } from 'angular-datatables';
import { DateValidator } from 'src/app/shared/date.validator';




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
  isLoading = false;


  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.initImportForm();
    this.initDataTable();
  }


  private initImportForm(){
    let selectMonth = null;

    this.billGenerateForm = new FormGroup({
      'selectMonth': new FormControl(selectMonth,
        Validators.compose([Validators.required, DateValidator.dateVaidator]))
    });

  }

  private initDataTable(){

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      destroy: true,
    };

    let dummyDate = new Date(1900,1,1);
    this.loadData(dummyDate);
    //setTimeout(()=>this.showContent=true, 250);
    this.dtTrigger.next();
    this.isLoading = false;
  }

  private loadData(loadDate: Date){
     //dummy date
    this.userSub = this.invoiceService.getInvoiceByPeriods(loadDate.toISOString()).subscribe(data => {
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
    //this.isLoading = true;
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

  }

  onGenerate(){

    var getDateString = (<HTMLInputElement>document.getElementById("selectDate")).value;

    if(!DateValidator.dateFormat(getDateString)){
      Alert.tosterAlert('Empty or invalid date format', 'error');
      return;
    }

    const generateDate = DateValidator.convertToDate(getDateString);

    this.isLoading = true;
    this.userSub = this.invoiceService.generateBill(generateDate.toDateString())
    .subscribe(data => {
      if(data[0] !== undefined && data !== null){
        this.billList = data;
        Alert.tosterAlert('Bills prepared successfully!', 'success');
        this.showGenerate = false;
        this.isLoading = false;

        this.userSub = this.invoiceService.getInvoiceByPeriods(generateDate.toISOString())
        .subscribe(data => {
          if(data !== null){
            this.billList = data;
            //this.dtTrigger.next();
          }
        });
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
