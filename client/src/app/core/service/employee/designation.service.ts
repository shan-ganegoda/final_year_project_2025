import { Injectable } from '@angular/core';
import {environment} from "../../../environment";
import {HttpClient} from "@angular/common/http";
import {Designation} from "../../entity/designation";


const apiurl= environment.apiUrl + "/designations";

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  constructor(private http: HttpClient ) { }
  getAll(){
  return this.http.get<Designation[]>(apiurl)

  }
}
