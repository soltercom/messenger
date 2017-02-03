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
    try {
      (this.itemBusiness as PersonBusiness).getNewPIN((error, result) => {
        ErrorHandler.handleError(res, error, ErrorTypes.FIND);
        res.status(200).send(result);
      });
    }
    catch (e)  {
      ErrorHandler.handleError(res, e, ErrorTypes.REQUEST);
    }
  }

  login(req: express.Request, res: express.Response): void {
    try {
      let {pin} = req.body;
      (this.itemBusiness as PersonBusiness).login(pin, (error, result) => {
        ErrorHandler.handleError(res, error, ErrorTypes.FIND);

        res.status(200).send(result);
      });
    }
    catch (e)  {
      ErrorHandler.handleError(res, e, ErrorTypes.REQUEST);
    }
  }

}