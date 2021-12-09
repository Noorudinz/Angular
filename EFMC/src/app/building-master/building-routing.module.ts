import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.gaurd";
import { BuildingListComponent } from "./building-list/building-list.component";
import { BuildingMasterComponent } from "./building-master.component";

const routes: Routes = [
  { path: '',
  component: BuildingMasterComponent,
  canActivate: [AuthGuard],
  children: [
      { path: '', component: BuildingListComponent },
     // { path: 'add', component: BuildingAddComponent },
    //  { path: ':id/edit', component: RecipeEditComponent }
 ]},

];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})

export class BuildingMasterRoutingModule{

}
