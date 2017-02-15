import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from '../../shared';
import { LoginService } from '../../login';
import { EXT_WEBSTORE_URL } from '../../shared';

@Component({
  selector: 'alt-navbar',
  template: `
    <md-toolbar color="primary">
      <button md-icon-button mdTooltip="На главную" [mdTooltipPosition]="'below'"
        (click)="home()"><md-icon>apps</md-icon></button>
      <span>Альтерком</span>
      <button md-icon-button *ngIf="isAdminLoggedIn"
        mdTooltip="Администрирование" [mdTooltipPosition]="'below'"
        (click)="admin()"><md-icon>settings</md-icon></button>
      <button md-icon-button (click)="openWebstore()"
        mdTooltip="Расширение для Google Chrome" [mdTooltipPosition]="'below'">
        <md-icon>spellcheck</md-icon></button>  
      <button md-icon-button (click)="openOrders()"
        mdTooltip="Заявки" [mdTooltipPosition]="'below'">
        <md-icon>assignment</md-icon></button>  
      <span style="flex: 1 1 auto;"></span>
      <span *ngIf="isLoggedIn">{{user}} </span>
      <button *ngIf="isLoggedIn" md-icon-button (click)="logout()"
        mdTooltip="Выход" [mdTooltipPosition]="'below'">
        <md-icon>exit_to_app</md-icon>
      </button>
    </md-toolbar>        
  `
})
export class NavbarComponent {

  menuItems: MenuItem[] = [
    new MenuItem('home', 'home', 'Альтерком', false)
  ];

  constructor(private router: Router,
              private loginService: LoginService) {}

  private get isLoggedIn(): boolean {
    return this.loginService.isLoggedIn;
  }

  private get isAdminLoggedIn(): boolean {
    return this.isLoggedIn && this.loginService.isAdmin;
  }

  private get user(): string {
    return `${this.loginService.user.name} (${this.loginService.user.client.name})`;
  }

  admin() {
    this.router.navigate(['/admin']);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login'], { queryParams: { logout: true }});
  }

  home() {
    this.router.navigate(['/']);
  }

  openWebstore() {
    window.open(EXT_WEBSTORE_URL);
  }

  openOrders() {
    this.router.navigate(['/orders']);
  }

}