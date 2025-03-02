import {Gender} from "./gender";
import {EmployeeType} from "./employeetype";
import {Designation} from "./designation";
import {EmployeeStatus} from "./employeestatus";

export interface Employee {
  id?: number;
  firstname:string;
  lastname:string;
  number:string;
  photo:string;
  mobile:string;
  land:string;
  nic:string;
  email:string;
  gender:Gender;
  designation:Designation;
  dob:string;
  employeetype:EmployeeType;
  doassigned:string;
  employeestatus:EmployeeStatus;
  description:string;
}
