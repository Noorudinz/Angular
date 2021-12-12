import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.gaurd";
import { FlatOwnerAddComponent } from "./flat-owner-add/flat-owner-add.component";
import { FlatOwnerDetailComponent } from "./flat-owner-detail/flat-owner-detail.component";
import { FlatOwnersListComponent } from "./flat-owners-list/flat-owners-list.component";
import { FlatOwnersComponent } from "./flat-owners.component";

const routes: Routes = [
  { path: '',
  component: FlatOwnersComponent,
  canActivate: [AuthGuard],
  children: [
      { path: '', component: FlatOwnersListComponent },
      { path: 'add', component: FlatOwnerAddComponent },
      { path: 'details/:id', component: FlatOwnerDetailComponent },
    //  { path: ':id/edit', component: RecipeEditComponent }
 ]},

];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})

export class FlatOwnersRoutingModule{

}
