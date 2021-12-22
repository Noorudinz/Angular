import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentsService } from 'src/services/payments.service';
import * as Alert from '../../toster/alert';
import { Summary } from '../payment.model';

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
    private paymentsService: PaymentsService) { }

  ngOnInit(): void {
    this.flatNo = this.route.snapshot.paramMap.get('flatNo');
    this.summaryDetailsList(this.flatNo);
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
