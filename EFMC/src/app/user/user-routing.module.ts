import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.gaurd";
import { UserComponent } from "./user.component";

const routes: Routes = [
  { path: '',
  component: UserComponent,
  canActivate: [AuthGuard],
  children: [
      { path: '', component: UserComponent },
    //  { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
    //  { path: ':id/edit', component: RecipeEditComponent }
 ]},

];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class UserRoutingModule{

}
