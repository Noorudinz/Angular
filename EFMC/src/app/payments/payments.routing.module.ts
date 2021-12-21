import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.gaurd";
import { PaymentsComponent } from "./payments.component";
import { ReceiptViewComponent } from "./receipt-view/receipt-view.component";
import { ReceiptsComponent } from "./receipts/receipts.component";
import { SummaryComponent } from "./summary/summary.component";


const routes: Routes = [
  { path: '',
  component: PaymentsComponent,
  canActivate: [AuthGuard],
  children: [
     { path: '', component: ReceiptsComponent },
     { path: 'receipts', component: ReceiptsComponent },
     { path: 'receipts/view/:flatNo', component: ReceiptViewComponent },
     { path: 'summary', component: SummaryComponent },
    // { path: 'sample', component: SampleComponent},
    // { path: 'send-mail', component: SendMailComponent}
 ]},

];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})

export class PaymentsRoutingModule{

}
