import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ){

  }

  canActivate(): Observable<boolean> | boolean | UrlTree {
    console.log('canActivate');
    return this.authService.revalidateToken()
    .pipe(
      tap(valid => {
        if(!valid){
          this.router.navigateByUrl('/auth/login');
        }
      })
    );
  }
  canLoad(): Observable<boolean> | boolean | UrlTree {
    console.log('canLoad');
    return this.authService.revalidateToken()
    .pipe(
      tap(valid => {
        if( !valid ){
          this.router.navigateByUrl('/auth/login')
        }
      })
    )
  }
}
