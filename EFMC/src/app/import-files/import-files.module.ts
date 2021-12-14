import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { DataTablesModule } from "angular-datatables";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ImportFilesRoutingModule } from "./import-files-routing.module";
import { ImportFilesComponent } from "./import-files.component";
import { ImportBtuComponent } from "./import-btu/import-btu.component";
import { ImportWaterComponent } from "./import-water/import-water.component";
import { ImportElectricityComponent } from "./import-electricity/import-electricity.component";



@NgModule({
  declarations: [
    ImportFilesComponent,
    ImportBtuComponent,
    ImportWaterComponent,
    ImportElectricityComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}), //disappear warnings
    ImportFilesRoutingModule,
    SharedModule,
    DataTablesModule,
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot()
    //StoreModule.forFeature(BUILDING_STATE_NAME, buildingsReducer),
    //EffectsModule.forFeature([BuildingsEffects])
  ],

})
export class ImportFilesModule{

}
