import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { HttpService } from './http.service';
import { IClientJSON } from '../model';

@Injectable()
export class ClientHttpService extends HttpService<IClientJSON> {

  constructor(protected http: Http) {
    super(http, 'clients');
  }

}