import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./user.component";

@NgModule({
  declarations: [
    UserComponent,
  ],
  imports: [RouterModule, ReactiveFormsModule, UserRoutingModule, SharedModule]

})
export class UserModule{

}
