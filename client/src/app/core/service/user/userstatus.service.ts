import { Injectable } from '@angular/core';
import {environment} from "../../../environment";
import {HttpClient} from "@angular/common/http";
import {UserStatus} from "../../entity/userstatus";

const apiurl = environment.apiUrl + "/userstatuses"

@Injectable({
  providedIn: 'root'
})
export class UserstatusService {

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<UserStatus[]>(apiurl);
  }
}
