import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class MomentService {

  constructor() {
    moment.locale('ru');
  }

  getDate(date: string): string {
    return moment(date).format('DD MMM, HH:mm');
  }

}