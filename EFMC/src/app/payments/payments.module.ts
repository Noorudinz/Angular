import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { DataTablesModule } from "angular-datatables";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaymentsComponent } from "./payments.component";
import { PaymentsRoutingModule } from "./payments.routing.module";
import { ReceiptsComponent } from "./receipts/receipts.component";
import { SummaryComponent } from "./summary/summary.component";
import { ReceiptViewComponent } from "./receipt-view/receipt-view.component";
import { SummaryViewComponent } from "./summary-view/summary-view.component";



@NgModule({
  declarations: [
   PaymentsComponent,
   ReceiptsComponent,
   ReceiptViewComponent,
   SummaryComponent,
   SummaryViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}), //disappear warnings
    PaymentsRoutingModule,
    SharedModule,
    DataTablesModule,
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot()
    //StoreModule.forFeature(BUILDING_STATE_NAME, buildingsReducer),
    //EffectsModule.forFeature([BuildingsEffects])
  ]

})
export class PaymentsModule{

}
