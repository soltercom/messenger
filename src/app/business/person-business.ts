import { BusinessBase } from './business-base';
import { PersonRepository } from '../repository';
import { IPersonModel } from "../model";

export class PersonBusiness extends BusinessBase<IPersonModel> {

  constructor() {
    super(new PersonRepository());
  }

  getNewPIN(callback: (error: any, result: string) => void) {
    (<PersonRepository>this.repository)
      .getAllPINs((err: any, items: [{pin: string}]) => {
        if(err) return callback(err, '');

        let pins: string[] = items.map((item: {pin: string}) => item.pin);
        while (true) {
          let pin = (1001 + Math.ceil(8998 * Math.random())).toString();
          if (pins.every(item => item !== pin)) {
            callback(err, pin);
            break;
          }
        }
      });
  }

  login(pin: string, callback: (error: any, result: string) => void) {
    (<PersonRepository>this.repository).login(pin, callback);
  }
}