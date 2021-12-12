import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { FlatOwnersComponent } from "./flat-owners.component";
import { FlatOwnersListComponent } from "./flat-owners-list/flat-owners-list.component";
import { FlatOwnersRoutingModule } from "./flat-owners-routing.module";
import { DataTablesModule } from "angular-datatables";
import { FlatOwnerDetailComponent } from './flat-owner-detail/flat-owner-detail.component';


@NgModule({
  declarations: [
    FlatOwnersComponent,
    FlatOwnersListComponent,
    FlatOwnerDetailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}), //disappear warnings
    FlatOwnersRoutingModule,
    SharedModule,
    DataTablesModule
    //StoreModule.forFeature(BUILDING_STATE_NAME, buildingsReducer),
    //EffectsModule.forFeature([BuildingsEffects])
  ]

})
export class FlatOwnerModule{

}
