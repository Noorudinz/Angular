import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import * as Alert from '../../toster/alert';
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';
import { DataTableDirective } from 'angular-datatables';
import { PaymentsService } from 'src/services/payments.service';
import { Store } from '@ngrx/store';
import * as fromApp from  '../../store/app.reducer';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.css']
})
export class ReceiptsComponent implements OnInit {

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
  receiptList:  any;
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

    this.initReceiptForm();
    this.initDataTable();
  }

  private initReceiptForm(){
    let flatNo = '';
    let paymentMode = 'Cash';
    let amountReceived = 0;
    let narration = '';

    this.receiptForm = new FormGroup({
    'flatNo': new FormControl(flatNo, [Validators.required]),
    'paymentMode': new FormControl(paymentMode, [Validators.required]),
    'chequeNo': new FormControl(''),
    'chequeDate': new FormControl(''),
    'bank': new FormControl(''),
    'amountReceived': new FormControl(amountReceived, [Validators.required]),
    'narration': new FormControl(narration, [Validators.required])
    });
  }

  private initDataTable(){

    this.dtOptions = {
      pagingType: 'full_numbers',
      ordering: false,
      pageLength: 10,
      destroy: true,

    };

    this.loadReceiptsData();
    this.isLoading = false;
  }

  private loadReceiptsData(){
    this.closeSub = this.paymentsService.getReceipts().subscribe(data => {
      if(data !== null){
        this.receiptList = data;
        this.dtTrigger.next();
      }
    });
  }


  onSubmit(){

    if(!this.receiptForm.valid){
      return
    }

    const date = new Date(this.receiptForm.value.chequeDate);

    const receipt = {
      receiptNo:  0,
      billNo:  0,
      flatNo:  this.receiptForm.value.flatNo,
      paymentMode:  this.receiptForm.value.paymentMode,
      chequeNo:  this.receiptForm.value.chequeNo,
      chequeDate:  date.toLocaleDateString("en-US"),
      bank:  this.receiptForm.value.bank,
      amountReceived: this.receiptForm.value.amountReceived,
      receivedBy: this.userName,
      narration:  this.receiptForm.value.narration
    }

    this.paymentsService.createReceipt(receipt).subscribe(data => {
      if(data.isUpdated){
        document.getElementById('close').click();
        Alert.tosterAlert(data.message, 'success');
        this.closeSub = this.paymentsService.getReceipts().subscribe(data => {
          if(data !== null){
            this.receiptList = data;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next();
            });
          }
        });
      } else {
        Alert.tosterAlert(data.message, 'error');
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
