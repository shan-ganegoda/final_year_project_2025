import { Routes } from '@angular/router';
import {LoginComponent} from "./shared/login/login.component";
import {MainwindowComponent} from "./shared/mainwindow/mainwindow.component";
import {HomeComponent} from "./pages/home/home.component";
import {authenticationGuard} from "./core/interceptor/authentication.guard";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {EmployeeComponent} from "./modules/employee/employee/employee.component";
import {UserComponent} from "./modules/user/user.component";
import {PrivilegeComponent} from "./modules/privilege/privilege.component";

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

      {path:"employee", component: EmployeeComponent, title:"Employee"},
      {path:"user", component: UserComponent, title:"User"},
      {path:"privilege", component: PrivilegeComponent, title:"Privilege"},
    ]
  }
];
