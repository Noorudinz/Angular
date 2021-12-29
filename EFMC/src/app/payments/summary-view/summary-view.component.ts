import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PaymentsService } from 'src/services/payments.service';
import * as Alert from '../../toster/alert';
import { Summary } from '../payment.model';
import { AppState } from 'src/app/store/app.reducer';
import { getSummaryById } from '../store/payments.selector';

@Component({
  selector: 'app-summary-view',
  templateUrl: './summary-view.component.html',
  styleUrls: ['./summary-view.component.css']
})
export class SummaryViewComponent implements OnInit {

  public flatNo: string;
  public amountDue: number;
  summaryDetails: Summary[];

  constructor(private route: ActivatedRoute,
    private routeNav: Router,
    private paymentsService: PaymentsService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.flatNo = this.route.snapshot.paramMap.get('flatNo');
    this.summaryDetailsList(this.flatNo);
    //console.log(this.store.select(getSummaryById));
  }

  private summaryDetailsList(flatNo: string){

    this.paymentsService.getSummaryDetail(flatNo).subscribe((summary: Summary[]) => {
     if(summary !== undefined) {
      this.summaryDetails = summary;
      this.amountDue = summary[0].amount;
     }
      else {
        this.routeNav.navigate(['/payments/summary']);
        Alert.tosterAlert('Data not found !', 'warning')
      }
    });
  }

  onBack(){
    this.routeNav.navigate(['/payments/summary']);
  }

}
