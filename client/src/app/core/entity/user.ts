import {Employee} from "./employee";
import {Role} from "./role";
import {UserStatus} from "./userstatus";

export interface User {
  id?:number;
  username:string;
  password:string;
  employee:Employee;
  docreated?:string;
  dolastupdated?:string;
  userstatus:UserStatus;
  role:Role;
  description:string;
}
