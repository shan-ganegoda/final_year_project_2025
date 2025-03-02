import { Injectable } from '@angular/core';
import {environment} from "../../../environment";
import {HttpClient} from "@angular/common/http";
import {Gender} from "../../entity/gender";


const apiurl = environment.apiUrl+ "/genders";
@Injectable({
  providedIn: 'root'
})
export class GenderService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Gender[]>(apiurl)
  }
}
