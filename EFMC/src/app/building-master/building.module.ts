import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

import { BuildingListComponent } from "./building-list/building-list.component";
import { BuildingMasterRoutingModule } from "./building-routing.module";
import { BuildingMasterComponent } from "./building-master.component";
import { BuildingEditComponent } from './building-edit/building-edit.component';
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { BUILDING_STATE_NAME } from "./store/building.selector";
import { buildingsReducer } from "./store/building.reducer";
import { EffectsModule } from "@ngrx/effects";
import { BuildingsEffects } from "./store/building.effects";
import { BuildingAddComponent } from "./building-add/building-add.component";
import { BuildingDeleteComponent } from './building-delete/building-delete.component';

@NgModule({
  declarations: [
    BuildingMasterComponent,
    BuildingListComponent,
    BuildingEditComponent,
    BuildingAddComponent,
    BuildingDeleteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}), //disappear warnings
    BuildingMasterRoutingModule,
    SharedModule,
    StoreModule.forFeature(BUILDING_STATE_NAME, buildingsReducer),
    EffectsModule.forFeature([BuildingsEffects])
  ]

})
export class BuildingModule{

}
