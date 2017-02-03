import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './components';
import { LoginService, AuthGuard, AdminGuard } from './services';
import { PersonHttpService } from '../shared/http';
import { FactoryClient, FactoryPerson } from '../shared/factory';
import { RepositoryService } from '../shared/repository';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    [MaterialModule.forRoot()],
    LoginRoutingModule,
  ],
  exports: [],
  declarations: [
    LoginComponent
  ],
  providers: [
    LoginService,
    AuthGuard,
    AdminGuard,
    PersonHttpService,
    RepositoryService,
    FactoryClient,
    FactoryPerson
  ],
})
export class LoginModule { }
