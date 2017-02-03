import { Component, Input } from '@angular/core';

import { NavLinkMetadata } from './';

@Component({
  selector: 'alt-nav-bar',
  template: `
  <div class="button-row">
    <div *ngFor="let nav of navLinks">
      <a *ngIf="!nav.active" md-raised-button
        [routerLink]="nav.link">{{nav.title}}</a>
      <a *ngIf="nav.active" md-raised-button
        color="primary">{{nav.title}}</a>
    </div>
  </div>
  `,
  styles: [`.button-row { 
    display: flex; 
  }`]
})
export class NavbarComponent {
  @Input() navLinks: NavLinkMetadata[];
}