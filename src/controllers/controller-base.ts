import * as express from "express";
import * as mongoose from "mongoose";

import { BusinessBase } from "../app/business";
import { ErrorTypes, ErrorHandler } from './error/error-handler';

export abstract class ControllerBase<T extends mongoose.Document>  {

  constructor(protected itemBusiness: BusinessBase<T>) {}

  private convertItem(req: express.Request): T {
    return Object.assign({}, <T>req.body, {_id: req.body.id});
  }

  create(req: express.Request, res: express.Response): void {
    this.itemBusiness.create(this.convertItem(req))
      .then((result: any) => res.status(200).send(result))
      .catch((error: any) => ErrorHandler.handleError(res, error, ErrorTypes.CREATE));
  }

  update(req: express.Request, res: express.Response): void {
    this.itemBusiness.update(req.params._id, this.convertItem(req))
      .then((result: any) => res.status(200).send(result))
      .catch((error: any) => ErrorHandler.handleError(res, error, ErrorTypes.UPDATE));
  }

  delete(req: express.Request, res: express.Response): void {
    this.itemBusiness.delete(req.params._id)
      .then((result: any) => res.status(200).send())
      .catch((error: any) => ErrorHandler.handleError(res, error, ErrorTypes.DELETE));
  }

  retrieve(req: express.Request, res: express.Response): void {
    this.itemBusiness.retrieve()
      .then((result: any) => res.status(200).send(result))
      .catch((error: any) => ErrorHandler.handleError(res, error, ErrorTypes.RETRIEVE));
  }

  findById(req: express.Request, res: express.Response): void {
    this.itemBusiness.findById(req.params._id)
      .then((result: any) => res.status(200).send(result))
	    .catch((error: any) => ErrorHandler.handleError(res, error, ErrorTypes.FIND));
  }

}