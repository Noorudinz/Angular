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
import { InvoiceComponent } from "./invoice.component";
import { InvoiceRoutingModule } from "./invoice.routing.module";
import { InvoiceListComponent } from "./invoice-list/invoice-list.component";
import { InvoiceViewComponent } from "./invoice-view/invoice-view.component";
import { BillGenerationComponent } from "./bill-generation/bill-generation.component";
import { SendMailComponent } from "./send-mail/send-mail.component";
import { InvoiceEffects } from "./store/invoice.effects";
import { INVOICES_STATE_NAME } from "./store/invoice.selector";
import { invoicesReducer } from "./store/invoice.reducer";


@NgModule({
  declarations: [
   InvoiceComponent,
   InvoiceListComponent,
   InvoiceViewComponent,
   BillGenerationComponent,
   SendMailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}), //disappear warnings
    InvoiceRoutingModule,
    SharedModule,
    DataTablesModule,
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot(),
    StoreModule.forFeature(INVOICES_STATE_NAME, invoicesReducer),
    EffectsModule.forFeature([InvoiceEffects])
  ]

})
export class InvoiceModule{

}
