import { Routes } from '@angular/router';
import {LoginComponent} from "./shared/login/login.component";
import {MainwindowComponent} from "./shared/mainwindow/mainwindow.component";
import {HomeComponent} from "./pages/home/home.component";
import {authenticationGuard} from "./core/interceptor/authentication.guard";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";

export const routes: Routes = [
  {path:"login" ,component:LoginComponent ,title:"Login"},
  {path:"" , redirectTo:"login" , pathMatch:"full"},
  {
    path: "main",
    component: MainwindowComponent,
    canActivate:[authenticationGuard],
    children:[
      {path:"home", component:HomeComponent,title:"Home"},
      {path:"dashboard", component:DashboardComponent,title:"Dashboard"},
    ]
  }
];
