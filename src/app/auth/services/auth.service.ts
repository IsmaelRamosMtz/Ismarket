import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { of, pipe, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Users } from '../interfaces/Users';
import { Router } from '@angular/router';
import { AuthResponse } from '../interfaces/AuthResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _baseUrl: string = environment.baseUrl;
  private _userInfo!: Users;

  constructor(private _http: HttpClient, private _router: Router) {}

  userLogin(email: string, pass: string) {
    const url = `${this._baseUrl}/auth/login`;
    const body = { email, pass };

    return this._http.post<AuthResponse>(url, body).pipe(
      tap((resp) => {
        if (resp.ok === true) {
          localStorage.setItem('token', resp.token!);
        }
      }),
      // Transformarmos la respuesta a un true o false dependiendo de las credenciales que se ingreses
      map((resp) => resp.ok), // se convierte a boolean
      catchError((err) => of(err.error.msg)) // se transforma a tipo any
    );
  }

  revalidateToken():Observable<boolean> {
    const url = `${ this._baseUrl }/auth/renew`;

    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '');
    
    return this._http.get<AuthResponse>(url, { headers } )
        .pipe(
          tap( resp => {
            // console.log('respuesta de servicio validar token', resp);
            if(resp.ok == true){
              // Guardamos token en LS
              localStorage.setItem('token', resp.token!)
              this._userInfo = {
                name: resp.name!,
                email: resp.email!
              }
            }
          }),
          map( resp => {
            // devuelve un true
            return resp.ok
          }),
          catchError(err => of(false))
        )
  }

  logout() {
    this._router.navigateByUrl('/auth/login');
    localStorage.clear();
  }
}
