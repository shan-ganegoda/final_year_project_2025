import { Injectable } from '@angular/core';
import {User} from "../../entity/user";
import {TokenService} from "./token.service";

const USER_KEY = "auth-user";
const AUTHORITIES_KEY = "user-authorities"

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private ts:TokenService) { }

  logout(){
    sessionStorage.clear();
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(AUTHORITIES_KEY);
    this.ts.removeToken();
  }

  isLoggedIn(){
    return !!localStorage.getItem(USER_KEY);
  }

  saveUser(user:User){
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY,JSON.stringify(user));
    //console.log(user);
  }

  getUser():User{
    const user = localStorage.getItem(USER_KEY);


    if(user){
      return JSON.parse(user);
    }

    return <User>({});
  }

  saveUserAuthorities(authorities:any){
    localStorage.removeItem(AUTHORITIES_KEY);
    localStorage.setItem(AUTHORITIES_KEY,JSON.stringify(authorities));
  }

  getUserAuthorities(): string[]{
    const authorities = localStorage.getItem(AUTHORITIES_KEY);

    if(authorities){
      return JSON.parse(authorities);
    }

    return [];

  }
}
