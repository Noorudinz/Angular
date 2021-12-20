import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { sample } from "rxjs/operators";
import { AuthGuard } from "../auth/auth.gaurd";
import { BillGenerationComponent } from "./bill-generation/bill-generation.component";
import { InvoiceListComponent } from "./invoice-list/invoice-list.component";
import { InvoiceViewComponent } from "./invoice-view/invoice-view.component";
import { InvoiceComponent } from "./invoice.component";
import { SampleComponent } from "./sample/sample.component";
import { SendMailComponent } from "./send-mail/send-mail.component";

const routes: Routes = [
  { path: '',
  component: InvoiceComponent,
  canActivate: [AuthGuard],
  children: [
    { path: '', component: InvoiceListComponent },
    { path: 'invoice-list', component: InvoiceListComponent },
    { path: 'invoice-list/view/:billNo', component: InvoiceViewComponent },
    { path: 'bill-generate', component: BillGenerationComponent },
    { path: 'sample', component: SampleComponent},
    { path: 'send-mail', component: SendMailComponent}
 ]},

];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})

export class InvoiceRoutingModule{

}
