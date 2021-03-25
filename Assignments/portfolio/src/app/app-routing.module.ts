import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { DisplayComponent } from './display/display.component';

import { LoginComponent } from './login/login.component';
import { PageComponent } from './page/page.component';


const routes: Routes = [
  {path:"\display", component:DisplayComponent},
  {path:"\login", component:LoginComponent},
  {path:"\page", component:PageComponent},
  
  {path:"",redirectTo:"\login",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
