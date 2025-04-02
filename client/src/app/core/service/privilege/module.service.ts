import { Injectable } from '@angular/core';
import {environment} from "../../../environment";
import {HttpClient} from "@angular/common/http";
import {Module} from "../../entity/module";

const apiUrl = environment.apiUrl + "/modules";

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<Module[]>(apiUrl);
  }
}
