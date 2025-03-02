import { Injectable } from '@angular/core';
import {environment} from "../../../environment";
import {HttpClient} from "@angular/common/http";
import {Employee} from "../../entity/employee";
import {EmployeeStatus} from "../../entity/employeestatus";


const apiurl = environment.apiUrl + "/employeestatuses";
@Injectable({
  providedIn: 'root'
})
export class EmployeestatusService {

  constructor(private http: HttpClient) { }

  getAll(){
  return this.http.get<EmployeeStatus[]>(apiurl)
  }
}
