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
import { FlatOwnerAddComponent } from './flat-owner-add/flat-owner-add.component';
import { FlatOwnersEditComponent } from './flat-owners-edit/flat-owners-edit.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FLATS_STATE_NAME } from "./store/flat-owner.selector";
import { flatsReducer } from "./store/flat-owner.reducer";
import { FlatsEffects } from "./store/flat-owner.effects";


@NgModule({
  declarations: [
    FlatOwnersComponent,
    FlatOwnersListComponent,
    FlatOwnerDetailComponent,
    FlatOwnerAddComponent,
    FlatOwnersEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}), //disappear warnings
    FlatOwnersRoutingModule,
    SharedModule,
    DataTablesModule,
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot(),
    StoreModule.forFeature(FLATS_STATE_NAME, flatsReducer),
    EffectsModule.forFeature([FlatsEffects])
  ]

})
export class FlatOwnerModule{

}
