import { BusinessBase } from './business-base';
import { PersonRepository } from '../repository';
import { IPersonModel } from "../model";

export class PersonBusiness extends BusinessBase<IPersonModel> {

  constructor() {
    super(new PersonRepository());
  }

  getNewPIN() {
    return (<PersonRepository>this.repository)
      .getAllPINs().then((res: any) => {
        let pins: string[] = res.map((item: any) => item.pin);
        while (true) {
          let pin = (1001 + Math.ceil(8998 * Math.random())).toString();
          if (pins.every(item => item !== pin)) {
            return pin;
          }
        }
      });
  }

  login(pin: string) {
    return (<PersonRepository>this.repository).login(pin);
  }
}