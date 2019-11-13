import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { MessagesComponent } from "./pages/messages/messages.component";
import { UserGuardService } from "./guards/user-guard.service";

const routes: Routes = [
  { path: "", component: LoginComponent },
  {
    path: "messages",
    component: MessagesComponent,
    canActivate: [UserGuardService]
  },
  { path: "**", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
