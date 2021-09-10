import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.state';
import { loginSuccessSelector } from '../store/auth.selector';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AfterLoginService implements CanActivate {

  constructor(private tokenService: TokenService,
    private store: Store<AppState>,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let flag = this.tokenService.loggedIn();
      if(flag){
        return flag ;
      } else {
        this.router.navigate(['/admin/auth/login']);
        return;
      }
  }
}
