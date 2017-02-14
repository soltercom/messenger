import * as express from "express";

import { ControllerBase } from "./controller-base";
import { IPersonModel }   from "../app/model";
import { PersonBusiness } from "../app/business";
import { ErrorTypes, ErrorHandler } from './error/error-handler';

export class PersonController extends ControllerBase<IPersonModel> {

  constructor() {
    super(new PersonBusiness());
  }

  getNewPIN(req: express.Request, res: express.Response): void {
    (this.itemBusiness as PersonBusiness)
      .getNewPIN()
      .then((result: any) => res.status(200).send(result))
      .catch((error: any) => ErrorHandler.handleError(res, error, ErrorTypes.FIND));
  }

  login(req: express.Request, res: express.Response): void {
    (this.itemBusiness as PersonBusiness)
      .login(req.body.pin)
      .then((result: any) => res.status(200).send(result))
	    .catch((error: any) => ErrorHandler.handleError(res, error, ErrorTypes.FIND));
  }

}