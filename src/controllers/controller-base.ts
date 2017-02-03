import * as express from "express";
import * as mongoose from "mongoose";

import { BusinessBase } from "../app/business";
import { ErrorTypes, ErrorHandler } from './error/error-handler';

export abstract class ControllerBase<T extends mongoose.Document>  {

  constructor(protected itemBusiness: BusinessBase<T>) {}

  create(req: express.Request, res: express.Response): void {
    try {
      let item: T = <T>req.body;
      item._id = req.body.id;
      this.itemBusiness.create(item, (error, result) => {
        ErrorHandler.handleError(res, error, ErrorTypes.CREATE);
        res.status(200).send(result);
      });
    }
    catch (e)  {
      ErrorHandler.handleError(res, e, ErrorTypes.REQUEST);
    }
  }

  update(req: express.Request, res: express.Response): void {
    try {
      let item: T = <T>req.body;
      item._id = req.body.id;
      let _id: string = req.params._id;
      this.itemBusiness.update(_id, item, (error, result) => {
        ErrorHandler.handleError(res, error, ErrorTypes.UPDATE);
        res.status(200).send(result);
      });
    }
    catch (e)  {
      ErrorHandler.handleError(res, e, ErrorTypes.REQUEST);
    }
  }

  delete(req: express.Request, res: express.Response): void {
    try {
      let _id: string = req.params._id;
      this.itemBusiness.delete(_id, (error, result) => {
        ErrorHandler.handleError(res, error, ErrorTypes.DELETE);
        res.status(200).send();
      });
    }
    catch (e)  {
      ErrorHandler.handleError(res, e, ErrorTypes.REQUEST);
    }
  }

  retrieve(req: express.Request, res: express.Response): void {
    try {
      this.itemBusiness.retrieve((error, result) => {
        ErrorHandler.handleError(res, error, ErrorTypes.RETRIEVE);
        res.status(200).send(result);
      });
    }
    catch (e)  {
      ErrorHandler.handleError(res, e, ErrorTypes.REQUEST);
    }
  }

  findById(req: express.Request, res: express.Response): void {
    try {
      let _id: string = req.params._id;
      this.itemBusiness.findById(_id, (error, result) => {
        ErrorHandler.handleError(res, error, ErrorTypes.FIND);
        res.status(200).send(result);
      });
    }
    catch (e)  {
      ErrorHandler.handleError(res, e, ErrorTypes.REQUEST);
    }
  }

}