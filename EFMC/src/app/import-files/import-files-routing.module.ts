import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.gaurd";
import { ImportBtuComponent } from "./import-btu/import-btu.component";
import { ImportElectricityComponent } from "./import-electricity/import-electricity.component";
import { ImportFilesComponent } from "./import-files.component";
import { ImportWaterComponent } from "./import-water/import-water.component";

// const routes: Routes = [
//   { path: '',
//   component: FlatOwnersComponent,
//   canActivate: [AuthGuard],
//   children: [
//       { path: '', component: FlatOwnersListComponent },
//       { path: 'add', component: FlatOwnerAddComponent },
//       { path: 'details/:id', component: FlatOwnerDetailComponent },
//       { path: 'edit/:id', component: FlatOwnersEditComponent}
//  ]},

// ];


const routes: Routes = [
  { path: '',
  component: ImportFilesComponent,
  canActivate: [AuthGuard],
  children: [
    { path: '', component: ImportBtuComponent },
    { path: 'import-btu', component: ImportBtuComponent },
    { path: 'import-water', component: ImportWaterComponent },
    { path: 'import-electricity', component: ImportElectricityComponent }
  ]},
];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})

export class ImportFilesRoutingModule{

}
