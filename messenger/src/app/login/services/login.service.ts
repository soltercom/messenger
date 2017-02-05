import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Client, Person } from '../../shared/model';
import { PersonHttpService } from '../../shared/http';
import { FactoryClient, FactoryPerson } from '../../shared/factory';

@Injectable()
export class LoginService {

  private _isLoggedIn = false;
  private _user: Person;
  private _redirectUrl: string = '';

  constructor(private personHttpService: PersonHttpService,
              private factoryClient: FactoryClient,
              private factoryPerson: FactoryPerson) {}

  get user()       { return this._user; }
  get isLoggedIn() { return this._isLoggedIn; }
  get isAdmin()    { return this._user.admin; }
  set redirectUrl(url: string) { this._redirectUrl = url; }
  get redirectUrl() { return this._redirectUrl; }

  login(pin: string): Observable<boolean> {
    return this.personHttpService.login({'pin': pin})
      .map(data => {
        this.factoryClient.create(data.client);
        data.client = data.client.id;
        return data;
      })
      .map(data => this.factoryPerson.create(data))
      .do((person: Person) => this._user = person)
      .do(() => this._isLoggedIn = true)
      .do(() => this.savePIN(pin))
      .mapTo(true);
  }

  private savePIN(pin: string) {
    window.localStorage.setItem('pin', pin);
    window.postMessage({'pin': pin}, "*");
  }

  loadPIN(): string {
    return window.localStorage.getItem('pin');
  }

  logout() {
    this._isLoggedIn  = false;
    this._user        = null;
    this._redirectUrl = '';
  }

}