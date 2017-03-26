/// <reference path="./../typings/index.d.ts" />

import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
// Simulate DELETE and PUT (Express 4)
import methodOverride from 'method-override';

import userRouters from './account/_user.router'

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
     // Parse application/json
    this.express.use(bodyParser.json());
    // Parse application/x-www-form-urlencoded
    this.express.use(bodyParser.urlencoded({ extended: false }));
    // Parse application/vnd.api+json as json
    this.express.use(bodyParser.json({ type: 'application/vnd.api+json' }));
    // Read cookies (needed for authentication)
    //this.express.use(cookieParser());
    // // Override with the X-HTTP-Method-Override header in the request. Simulate DELETE/PUT
    // this.express.use(methodOverride('X-HTTP-Method-Override'));
    // Set the static files location /public/img will be /img for users
    this.express.use(express.static(__dirname + '/dist'));

  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();
    // placeholder route handler
    router.get('/', (req, res, next) => {
      res.json({
        message: 'Hello World!'
      });
    });
    this.express.use('/', router);
    this.express.use('/api/users', userRouters);
  }

}

export default new App().express;
