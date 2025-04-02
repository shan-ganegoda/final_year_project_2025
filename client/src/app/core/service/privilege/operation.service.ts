import { Injectable } from '@angular/core';
import {environment} from "../../../environment";
import {HttpClient} from "@angular/common/http";
import {Operation} from "../../entity/operation";

const apiUrl = environment.apiUrl + "/operations";

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<Operation[]>(apiUrl);
  }
}
