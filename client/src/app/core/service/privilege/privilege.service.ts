import {Injectable} from '@angular/core';
import {environment} from "../../../environment";
import {HttpClient} from "@angular/common/http";
import {Privilege} from "../../entity/privilege";

const apiUrl = environment.apiUrl + "/privileges";

@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {

  constructor(private http: HttpClient) {
  }

  getAll(query: string) {
    return this.http.get<Privilege[]>(apiUrl + query);
  }

  save(privilege: Privilege) {
    return this.http.post<Privilege>(apiUrl, privilege);
  }

  update(privilege: Privilege) {
    return this.http.put<Privilege>(apiUrl, privilege);
  }

  delete(id:number) {
    return this.http.delete(apiUrl + "/" + id);
  }
}
