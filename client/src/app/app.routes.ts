import { Routes } from '@angular/router';
import {LoginComponent} from "./shared/login/login.component";

export const routes: Routes = [
  {path:"login" ,component:LoginComponent ,title:"Login"},
  {path:"" , redirectTo:"login" , pathMatch:"full"}
];
