import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as path from "path";

import { DataAccess } from './app/data-access';
import { BaseRoutes } from './config';
import { SocketServer } from './socket/socket-server';

let app = express();

new DataAccess();
app.use(cors());
app.use(bodyParser.json());
app.use(new BaseRoutes().routes);
app.use('/', express.static(path.join(__dirname, 'public')));
app.use((req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

let server = app.listen(3000, () => {
  console.log('Messenger-server listening on port 3000!');
});

SocketServer.bootstrap(server);
