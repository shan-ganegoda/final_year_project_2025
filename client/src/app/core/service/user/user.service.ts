import { Injectable } from '@angular/core';
import {environment} from "../../../environment";
import {HttpClient} from "@angular/common/http";
import {User} from "../../entity/user";

const apiurl = environment.apiUrl + "/users"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getAll(query:string){
    return this.http.get<User[]>(apiurl + query);
  }

  save(user:User){
    return this.http.post<User>(apiurl,user);
  }

  update(user:User){
    return this.http.put<User>(apiurl,user);
  }

  delete(id:number){
    return this.http.delete(apiurl +  "/" + id);
  }
}
