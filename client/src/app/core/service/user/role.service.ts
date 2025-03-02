import { Injectable } from '@angular/core';
import {environment} from "../../../environment";
import {HttpClient} from "@angular/common/http";
import {Role} from "../../entity/role";

const apiurl = environment.apiUrl + "/roles"

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<Role[]>(apiurl);
  }
}
