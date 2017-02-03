import { Injectable }     from '@angular/core';
import { CanActivate, Router,
  ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LoginService } from './login.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private loginService: LoginService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.loginService.isAdmin) return true;

    this.loginService.redirectUrl = state.url;

    this.router.navigate(['/login']);
    return false;
  }
}