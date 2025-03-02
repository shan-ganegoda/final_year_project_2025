import { Injectable } from '@angular/core';
import {environment} from "../../../environment";
import {HttpClient} from "@angular/common/http";
import {EmployeeType} from "../../entity/employeetype";


const apiurl = environment.apiUrl+"/employeetypes";
@Injectable({
  providedIn: 'root'
})
export class EmployeetypeService {

  constructor(private http: HttpClient) { }
  getAll(){
    return this.http.get<EmployeeType[]>(apiurl)
  }
}
