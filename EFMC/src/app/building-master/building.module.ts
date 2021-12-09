import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

import { BuildingListComponent } from "./building-list/building-list.component";
import { BuildingMasterRoutingModule } from "./building-routing.module";
import { BuildingMasterComponent } from "./building-master.component";
import { BuildingAddComponent } from './building-add/building-add.component';

@NgModule({
  declarations: [
    BuildingMasterComponent,
    BuildingListComponent,
    BuildingAddComponent
  ],
  imports: [RouterModule, ReactiveFormsModule, BuildingMasterRoutingModule, SharedModule]

})
export class BuildingModule{

}
