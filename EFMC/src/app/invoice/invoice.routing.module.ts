import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.gaurd";
import { InvoiceListComponent } from "./invoice-list/invoice-list.component";
import { InvoiceComponent } from "./invoice.component";

const routes: Routes = [
  { path: '',
  component: InvoiceComponent,
  canActivate: [AuthGuard],
  children: [
      { path: '', component: InvoiceListComponent },
      // { path: 'add', component: FlatOwnerAddComponent },
      // { path: 'details/:id', component: FlatOwnerDetailComponent },
      // { path: 'edit/:id', component: FlatOwnersEditComponent}
 ]},

];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})

export class InvoiceRoutingModule{

}
