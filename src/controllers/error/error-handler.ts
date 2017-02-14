import * as express from "express";

export const ErrorTypes = {
  CREATE: 'Create Error',
  UPDATE: 'Update Error',
  DELETE: 'Delete Error',
  RETRIEVE: 'Retrieve Error',
  FIND: 'Find Error',
  REQUEST: 'Error in Request'
};

export class ErrorHandler {

  static handleError(res: express.Response, error: any, errorText?: string) {
    if (error) {
      console.error(error);
      res.status(404).send({"error": errorText || ""});
    }
  }

}
