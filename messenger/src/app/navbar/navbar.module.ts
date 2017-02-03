import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { SharedModule } from '../shared';
import { NavbarComponent } from './components/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    [MaterialModule.forRoot()],
    SharedModule
  ],
  exports: [
    NavbarComponent
  ],
  declarations: [
    NavbarComponent
  ],
  providers: [
  ]
})
export class NavbarModule { }