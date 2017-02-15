import * as express from "express";

import { ClientRoutes }  from "./client-routes";
import { PersonRoutes }  from "./person-routes";
import { ContactRoutes } from "./contact-routes";
import { MessageRoutes } from "./message-routes";
import { OrderRoutes }   from "./order-routes";

let app = express();

export class BaseRoutes {

  get routes() {
    app.use("/api/", new ClientRoutes().routes);
    app.use("/api/", new PersonRoutes().routes);
    app.use("/api/", new ContactRoutes().routes);
    app.use("/api/", new MessageRoutes().routes);
    app.use("/api/", new OrderRoutes().routes);
    return app;
  }
}