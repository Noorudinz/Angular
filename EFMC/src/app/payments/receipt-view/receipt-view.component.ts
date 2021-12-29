import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PaymentsService } from 'src/services/payments.service';
import * as Alert from '../../toster/alert';
import { Payments } from '../payment.model';
import { AppState } from 'src/app/store/app.reducer';
import { getSummaryById } from '../store/payments.selector';

@Component({
  selector: 'app-receipt-view',
  templateUrl: './receipt-view.component.html',
  styleUrls: ['./receipt-view.component.css']
})
export class ReceiptViewComponent implements OnInit {

  public flatNo: string;
  public billNo: string;
  receiptDetails: Payments[];

  constructor(private route: ActivatedRoute,
    private routeNav: Router,
    private paymentsService: PaymentsService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.flatNo = this.route.snapshot.paramMap.get('flatNo');
    this.fetchReceiptDetails(this.flatNo);
    //console.log(this.store.select(getSummaryById));
  }

  private fetchReceiptDetails(flatNo: string){

    this.paymentsService.getReceiptDetail(flatNo).subscribe((receipts: Payments[]) => {
     if(receipts !== undefined) {
      this.receiptDetails = receipts;
     }
      else {
        this.routeNav.navigate(['/payments']);
        Alert.tosterAlert('Data not found !', 'warning')
      }
    });
  }

  onBack(){
    this.routeNav.navigate(['/payments/receipts']);
  }

}
