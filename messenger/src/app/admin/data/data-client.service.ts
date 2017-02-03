import { Injectable } from '@angular/core';

import { InfoService } from '../../shared';
import { DataService } from './data.service';
import { ClientHttpService } from '../../shared/http';
import { FactoryClient } from '../../shared/factory';
import { IClientJSON, Client, IClient } from '../../shared/model';

@Injectable()
export class ClientService extends DataService<Client, IClientJSON> {

  protected loaded: boolean;

  constructor(protected clientHttpService: ClientHttpService,
              protected factoryClient: FactoryClient,
              protected infoService: InfoService) {
    super(clientHttpService, factoryClient, infoService);
    this.loaded = false;
  }

}