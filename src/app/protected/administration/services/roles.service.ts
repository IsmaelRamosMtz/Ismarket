import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Roles } from '../../../auth/interfaces/Roles';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private _baseUrl: string = environment.baseUrl;

  constructor(
    private _http: HttpClient
  ) { }

  rolesList(){
    const url = `${this._baseUrl}/roles/list`;
    return this._http.get<Roles[]>(url);
  }

  rolesCreate(newRole: any){
    const url = `${this._baseUrl}/roles/create`;
    const body = newRole;
    return this._http.post<Roles>(url, body);
  }
}
