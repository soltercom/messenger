import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpService } from './http.service';
import { IContactJSON } from '../model';

@Injectable()
export class ContactHttpService extends HttpService<IContactJSON> {

  constructor(protected http: Http) {
    super(http, 'contacts');
  }

  getPersonContacts(id: string): Observable<any> {
    return this.http.get(`${this.PATH}/person/${id}`)
		  .map(res => res.json());
  }

}