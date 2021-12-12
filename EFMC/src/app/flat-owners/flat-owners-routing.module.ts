import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.gaurd";
import { FlatOwnersListComponent } from "./flat-owners-list/flat-owners-list.component";
import { FlatOwnersComponent } from "./flat-owners.component";

const routes: Routes = [
  { path: '',
  component: FlatOwnersComponent,
  canActivate: [AuthGuard],
  children: [
      { path: '', component: FlatOwnersListComponent },
     // { path: 'add', component: BuildingAddComponent },
    //  { path: ':id/edit', component: RecipeEditComponent }
 ]},

];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})

export class FlatOwnersRoutingModule{

}
