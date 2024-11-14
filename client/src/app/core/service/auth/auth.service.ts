import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environment";
import {tap} from "rxjs";
import {TokenService} from "./token.service";
import {StorageService} from "./storage.service";

const API_URL = environment.apiUrl + '/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
              private http:HttpClient,
              private ts:TokenService,
              private ss:StorageService
  ) { }

  login(username: string, password: string) {
    return this.http.post(API_URL + '/login',{username,password})
      .pipe(
        tap((res:any) => {
          this.ts.setToken(res.Access_Token);
          this.ss.saveUser(res.authUser.user);
          this.ss.saveUserAuthorities(res.authUser.authorities);
          console.log(res.authUser.authorities);
        })
      )

  }

  refreshToken(){
    return this.http.get(API_URL + '/refresh');
  }
}
