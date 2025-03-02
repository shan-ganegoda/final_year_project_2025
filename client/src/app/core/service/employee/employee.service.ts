import { Injectable } from '@angular/core';
import {environment} from "../../../environment";
import {HttpClient} from "@angular/common/http";
import {Employee} from "../../entity/employee";


const apiurl =environment.apiUrl+"/employees";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }
  getAll(query:string){
    console.log(apiurl+query);
    return this.http.get<Employee[]>(apiurl+query)
  }

  save(employee:Employee){
    return this.http.post<Employee>(apiurl,employee)
  }

  update(employee:Employee){
    return this.http.put<Employee>(apiurl,employee)
  }

  delete(id:number){
    return this.http.delete<Employee>(apiurl+"/"+id)
  }
}
