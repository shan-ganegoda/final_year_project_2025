import {Role} from "./role";
import {Operation} from "./operation";
import {Module} from "./module";

export interface Privilege{
  id?:number;
  operation: Operation;
  module: Module;
  role: Role;
}
