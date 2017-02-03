import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpService } from './http.service';
import { IPersonJSON } from '../model';

@Injectable()
export class PersonHttpService extends HttpService<IPersonJSON> {

  constructor(protected http: Http) {
    super(http, 'people');
  }

  getNewPIN(): Observable<string> {
    return this.http.get(`${this.PATH}/getNewPIN`)
      .map(res => res.json());
  }

  login(data: {pin: string}): Observable<any> {
    return this.http.post(`${this.API_PATH}/login`, data, this.requestOptions)
	    .map(res => res.json());
  }

}