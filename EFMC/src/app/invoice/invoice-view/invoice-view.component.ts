import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { InvoiceService } from 'src/services/invoice.service';
import * as Alert from '../../toster/alert';
import { AppState } from 'src/app/store/app.reducer';


@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.css']
})
export class InvoiceViewComponent implements OnInit {

  public flatNo: string;
  public billNo: string;
  billDetails: any;

  constructor(private route: ActivatedRoute,
    private routeNav: Router,
    private invoiceService: InvoiceService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.billNo = this.route.snapshot.paramMap.get('billNo');
    this.fetchBillDetails(this.billNo);
    //console.log(this.store.select(geInvoiceById));
  }

  private fetchBillDetails(billNo: string){

    let isNumber =(/^\d+$/.test(this.billNo));
    if(!isNumber){
      this.routeNav.navigate(['/invoice']);
      Alert.tosterAlert('Data not found !', 'warning');
      return;
    }

    this.invoiceService.getInvoiceByBillNo(billNo).subscribe(data => {
     if(data[0] !== undefined)
     {
        this.billDetails = {
          flatNo: data[0].flatNo,
          firstName: data[0].firstName,
          address: data[0].address,
          mobileNumber: data[0].mobileNumber,
          email1: data[0].email1,
          created_date: data[0].created_date,
          due_date: data[0].due_date,
          cycle_from: data[0].cycle_from,
          cycle_to: data[0].cycle_to,
          btu_current: data[0].btu_current,
          btu_prev: data[0].btu_prev,
          btu_consum: data[0].btu_consum,
          btU_amount: data[0].btU_amount,
          water_current: data[0].water_current,
          water_prev: data[0].water_prev,
          water_consum: data[0].water_consum,
          water_amount: data[0].water_amount,
          elec_current: data[0].elec_current,
          elec_prev: data[0].elec_prev,
          elec_consum: data[0].elec_consum,
          electricity_amount: data[0].electricity_amount,
          current_bill: data[0].current_bill,
          service_charge: data[0].service_charge,
          other_charge: data[0].other_charge,
          amount: data[0].amount,
          previous_arrear: data[0].previous_arrear
        }
      }
      else {
        this.routeNav.navigate(['/invoice']);
        Alert.tosterAlert('Data not found !', 'warning')
      }
    });
  }

}
