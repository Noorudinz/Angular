import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.gaurd";
import { BillGenerationComponent } from "./bill-generation/bill-generation.component";
import { InvoiceListComponent } from "./invoice-list/invoice-list.component";
import { InvoiceViewComponent } from "./invoice-view/invoice-view.component";
import { InvoiceComponent } from "./invoice.component";

const routes: Routes = [
  { path: '',
  component: InvoiceComponent,
  canActivate: [AuthGuard],
  children: [
    { path: '', component: InvoiceListComponent },
    { path: 'view/:billNo', component: InvoiceViewComponent },
    { path: 'bill-generate', component: BillGenerationComponent },
    // { path: 'edit/:id', component: FlatOwnersEditComponent}
 ]},

];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})

export class InvoiceRoutingModule{

}
